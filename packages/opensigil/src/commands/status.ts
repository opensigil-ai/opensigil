import * as fs from 'fs';
import chalk from 'chalk';
import { getDaemonPid, OPENSIGIL_DIR, EVENTS_LOG } from '../utils/config';
import { readEvents } from '../utils/logger';

export async function statusCommand(): Promise<void> {
  const pid = getDaemonPid();
  const heartbeatFile = `${OPENSIGIL_DIR}/heartbeat`;

  console.log('');
  console.log(chalk.hex('#F97316').bold('  OpenSigil Status'));
  console.log(chalk.gray('  ─────────────────────────────────────'));
  console.log('');

  if (!pid) {
    console.log(`  ${chalk.gray('Daemon:')}    ${chalk.red('● stopped')}`);
    console.log('');
    console.log(chalk.gray(`  Run ${chalk.white('opensigil start')} to begin monitoring`));
    console.log('');
    return;
  }

  // Read heartbeat
  let heartbeat: { pid: number; uptime: number; timestamp: string; trackedCount: number } | null = null;
  try {
    if (fs.existsSync(heartbeatFile)) {
      heartbeat = JSON.parse(fs.readFileSync(heartbeatFile, 'utf-8'));
    }
  } catch { /* ignore */ }

  console.log(`  ${chalk.gray('Daemon:')}    ${chalk.green('● running')} ${chalk.gray(`(PID ${pid})`)}`);

  if (heartbeat) {
    const uptime = Math.floor(heartbeat.uptime);
    const hours = Math.floor(uptime / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const secs = uptime % 60;
    const uptimeStr = hours > 0 
      ? `${hours}h ${mins}m ${secs}s`
      : mins > 0
        ? `${mins}m ${secs}s`
        : `${secs}s`;

    console.log(`  ${chalk.gray('Uptime:')}    ${chalk.white(uptimeStr)}`);
    console.log(`  ${chalk.gray('Tracking:')}  ${chalk.white(heartbeat.trackedCount)} agent process${heartbeat.trackedCount !== 1 ? 'es' : ''}`);
  }

  // Recent events summary
  const events = readEvents(50);
  const agentStarts = events.filter(e => e.type === 'process_start');
  const violations = events.filter(e => e.type === 'policy_violation');

  console.log('');
  console.log(chalk.gray('  ─────────────────────────────────────'));
  console.log('');
  console.log(`  ${chalk.gray('Agent Sessions:')}  ${chalk.white(agentStarts.length)}`);
  console.log(`  ${chalk.gray('Policy Alerts:')}   ${violations.length > 0 ? chalk.red(violations.length) : chalk.white('0')}`);
  console.log(`  ${chalk.gray('Log File:')}        ${chalk.white(OPENSIGIL_DIR + '/activity.log')}`);
  console.log('');

  // Show actively running agents
  const activeAgents = new Set<string>();
  const startedPids = new Set<number>();
  const stoppedPids = new Set<number>();

  for (const e of events) {
    if (e.type === 'process_start' && e.pid) startedPids.add(e.pid);
    if (e.type === 'process_stop' && e.pid) stoppedPids.add(e.pid);
  }

  for (const e of events) {
    if (e.type === 'process_start' && e.pid && !stoppedPids.has(e.pid)) {
      activeAgents.add(e.agent);
    }
  }

  if (activeAgents.size > 0) {
    console.log(`  ${chalk.hex('#F97316')('Active Agents:')}`);
    for (const agent of activeAgents) {
      console.log(`    ${chalk.green('●')} ${chalk.white(agent)}`);
    }
    console.log('');
  }
}
