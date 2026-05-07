import chalk from 'chalk';
import { readEvents } from '../utils/logger';
import { OPENSIGIL_DIR } from '../utils/config';

const TYPE_COLORS: Record<string, (s: string) => string> = {
  process_start: (s) => chalk.green(s),
  process_stop: (s) => chalk.gray(s),
  tool_call: (s) => chalk.cyan(s),
  policy_violation: (s) => chalk.red(s),
  info: (s) => chalk.blue(s),
};

const TYPE_ICONS: Record<string, string> = {
  process_start: '▶',
  process_stop: '■',
  tool_call: '⚡',
  policy_violation: '🛡',
  info: 'ℹ',
};

export interface LogsOptions {
  lines?: number;
  type?: string;
  follow?: boolean;
}

export async function logsCommand(options: LogsOptions = {}): Promise<void> {
  const limit = options.lines ?? 50;
  const filterType = options.type;

  let events = readEvents(Math.max(limit * 2, 200));

  if (filterType) {
    events = events.filter(e => e.type === filterType);
  }

  events = events.slice(-limit);

  if (events.length === 0) {
    console.log('');
    console.log(chalk.gray('  No agent activity logged yet.'));
    console.log('');
    console.log(chalk.gray(`  Run ${chalk.white('opensigil start')} to begin monitoring`));
    console.log(`  Logs stored at: ${chalk.white(OPENSIGIL_DIR + '/activity.log')}`);
    console.log('');
    return;
  }

  console.log('');
  console.log(chalk.hex('#F97316').bold('  OpenSigil Activity Log'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  console.log('');

  for (const event of events) {
    const ts = new Date(event.timestamp).toLocaleTimeString();
    const icon = TYPE_ICONS[event.type] || '·';
    const colorFn = TYPE_COLORS[event.type] || ((s: string) => s);
    const typeLabel = event.type.replace(/_/g, ' ').toUpperCase().padEnd(16);

    console.log(
      `  ${chalk.gray(ts)}  ${colorFn(icon + ' ' + typeLabel)}  ${chalk.gray('[' + event.agent + ']')}  ${event.details}`
    );

    if (event.metadata && Object.keys(event.metadata).length > 0 && event.type === 'policy_violation') {
      console.log(chalk.gray(`              ↳ ${JSON.stringify(event.metadata)}`));
    }
  }

  console.log('');
  console.log(chalk.gray(`  Showing ${events.length} events. Full log: ${OPENSIGIL_DIR}/activity.log`));
  console.log('');
}
