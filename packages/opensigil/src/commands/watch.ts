import * as fs from 'fs';
import chalk from 'chalk';
import { EVENTS_LOG, getDaemonPid } from '../utils/config';
import { readEvents } from '../utils/logger';
import type { AgentEvent } from '../utils/logger';

const TYPE_COLORS: Record<string, chalk.Chalk> = {
  process_start: chalk.green,
  process_stop: chalk.gray,
  tool_call: chalk.cyan,
  policy_violation: chalk.red,
  info: chalk.blue,
};

const TYPE_ICONS: Record<string, string> = {
  process_start: '▶',
  process_stop: '■',
  tool_call: '⚡',
  policy_violation: '🛡',
  info: 'ℹ',
};

function renderEvent(event: AgentEvent): void {
  const ts = new Date(event.timestamp).toLocaleTimeString();
  const icon = TYPE_ICONS[event.type] || '·';
  const colorFn = TYPE_COLORS[event.type] || chalk.white;
  const agentLabel = chalk.gray('[' + event.agent + ']');
  
  process.stdout.write(
    `  ${chalk.gray(ts)}  ${colorFn(icon)}  ${agentLabel}  ${colorFn(event.details)}\n`
  );

  if (event.type === 'policy_violation' && event.metadata) {
    process.stdout.write(chalk.red(`              ↳ POLICY VIOLATION: ${JSON.stringify(event.metadata)}\n`));
  }
}

export async function watchCommand(): Promise<void> {
  const pid = getDaemonPid();

  console.log('');
  console.log(chalk.hex('#F97316').bold('  OpenSigil Watch') + chalk.gray(' — Live Agent Activity'));
  console.log(chalk.gray('  Press Ctrl+C to exit'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  console.log('');

  if (!pid) {
    console.log(chalk.yellow(`  ⚠  Daemon not running. Showing historical logs only.`));
    console.log(chalk.gray(`  Run ${chalk.white('opensigil start')} to enable live monitoring`));
    console.log('');
  }

  // Show last 20 events first
  const recent = readEvents(20);
  if (recent.length > 0) {
    console.log(chalk.gray('  ── Recent Activity ──'));
    console.log('');
    recent.forEach(renderEvent);
    console.log('');
    console.log(chalk.gray('  ── Live Feed ──'));
    console.log('');
  } else {
    console.log(chalk.gray('  Waiting for agent activity...'));
    console.log('');
  }

  // Watch the events log file for new entries
  if (!fs.existsSync(EVENTS_LOG)) {
    fs.writeFileSync(EVENTS_LOG, '', 'utf-8');
  }

  let lastSize = fs.statSync(EVENTS_LOG).size;
  let buffer = '';

  const watcher = setInterval(() => {
    try {
      const stat = fs.statSync(EVENTS_LOG);
      if (stat.size > lastSize) {
        const fd = fs.openSync(EVENTS_LOG, 'r');
        const chunk = Buffer.alloc(stat.size - lastSize);
        fs.readSync(fd, chunk, 0, chunk.length, lastSize);
        fs.closeSync(fd);
        lastSize = stat.size;

        buffer += chunk.toString('utf-8');
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line) as AgentEvent;
            renderEvent(event);
          } catch { /* ignore malformed */ }
        }
      }
    } catch { /* file might not exist yet */ }
  }, 500);

  // Handle exit
  process.on('SIGINT', () => {
    clearInterval(watcher);
    console.log('');
    console.log(chalk.gray('  Watch stopped.'));
    process.exit(0);
  });

  // Keep alive
  process.stdin.resume();
}
