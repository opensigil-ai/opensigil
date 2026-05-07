import * as fs from 'fs';
import { loadConfig, writeDaemonPid, clearDaemonPid, DAEMON_PID_FILE, OPENSIGIL_DIR } from '../utils/config';
import { appendEvent, AgentEvent } from '../utils/logger';

interface TrackedProcess {
  pid: number;
  name: string;
  agent: string;
  cmdline: string;
  startedAt: string;
}

const trackedProcesses = new Map<number, TrackedProcess>();

async function getProcessList(): Promise<Array<{ pid: number; name: string; cmd?: string }>> {
  try {
    const { default: psList } = await import('ps-list');
    return await psList();
  } catch {
    // Fallback: parse /proc on Linux
    return getProcList();
  }
}

function getProcList(): Array<{ pid: number; name: string; cmd?: string }> {
  const results: Array<{ pid: number; name: string; cmd?: string }> = [];
  try {
    const procDir = '/proc';
    if (!fs.existsSync(procDir)) return results;
    
    const entries = fs.readdirSync(procDir);
    for (const entry of entries) {
      const pid = parseInt(entry, 10);
      if (isNaN(pid)) continue;
      try {
        const cmdlinePath = `/proc/${pid}/cmdline`;
        if (fs.existsSync(cmdlinePath)) {
          const cmdline = fs.readFileSync(cmdlinePath, 'utf-8').replace(/\0/g, ' ').trim();
          if (cmdline) {
            const name = cmdline.split(' ')[0].split('/').pop() || '';
            results.push({ pid, name, cmd: cmdline });
          }
        }
      } catch { /* skip */ }
    }
  } catch { /* ignore */ }
  return results;
}

function matchesAgentPattern(proc: { pid: number; name: string; cmd?: string }, patterns: string[]): string | null {
  const text = `${proc.name} ${proc.cmd || ''}`.toLowerCase();
  for (const pattern of patterns) {
    if (text.includes(pattern.toLowerCase())) {
      return pattern;
    }
  }
  return null;
}

export async function runDaemon(): Promise<void> {
  const config = loadConfig();
  writeDaemonPid(process.pid);

  // Handle graceful shutdown
  const shutdown = () => {
    clearDaemonPid();
    appendEvent({
      timestamp: new Date().toISOString(),
      type: 'info',
      agent: 'opensigil-daemon',
      details: 'OpenSigil daemon stopped',
    });
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
  process.on('SIGHUP', shutdown);

  appendEvent({
    timestamp: new Date().toISOString(),
    type: 'info',
    agent: 'opensigil-daemon',
    details: `OpenSigil daemon started (PID ${process.pid})`,
    metadata: { pid: process.pid, watchInterval: config.watchInterval },
  });

  // Write a "heartbeat" file for status checks
  const heartbeatFile = `${OPENSIGIL_DIR}/heartbeat`;
  
  const writeHeartbeat = () => {
    try {
      fs.writeFileSync(heartbeatFile, JSON.stringify({
        pid: process.pid,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        trackedCount: trackedProcesses.size,
      }));
    } catch { /* ignore */ }
  };

  async function tick(): Promise<void> {
    writeHeartbeat();
    const procs = await getProcessList();
    const currentPids = new Set<number>();

    for (const proc of procs) {
      const matchedPattern = matchesAgentPattern(proc, config.agents.patterns);
      if (!matchedPattern) continue;

      currentPids.add(proc.pid);
      const agentLabel = config.agents.labels[matchedPattern] || matchedPattern;

      if (!trackedProcesses.has(proc.pid)) {
        // New agent process detected
        const tracked: TrackedProcess = {
          pid: proc.pid,
          name: proc.name,
          agent: agentLabel,
          cmdline: proc.cmd || proc.name,
          startedAt: new Date().toISOString(),
        };
        trackedProcesses.set(proc.pid, tracked);

        appendEvent({
          timestamp: new Date().toISOString(),
          type: 'process_start',
          agent: agentLabel,
          pid: proc.pid,
          details: `Agent process started: ${agentLabel} (PID ${proc.pid})`,
          metadata: { cmdline: proc.cmd, name: proc.name },
        });
      }
    }

    // Check for processes that stopped
    for (const [pid, tracked] of trackedProcesses) {
      if (!currentPids.has(pid)) {
        trackedProcesses.delete(pid);
        appendEvent({
          timestamp: new Date().toISOString(),
          type: 'process_stop',
          agent: tracked.agent,
          pid,
          details: `Agent process stopped: ${tracked.agent} (PID ${pid})`,
          metadata: { startedAt: tracked.startedAt },
        });
      }
    }
  }

  // Run immediately then on interval
  await tick();
  setInterval(tick, config.watchInterval);

  // Keep alive
  process.stdin.resume();
}
