import { spawn } from 'child_process';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { getDaemonPid, OPENSIGIL_DIR, ensureDir } from '../utils/config';

export async function startCommand(): Promise<void> {
  ensureDir();

  const existing = getDaemonPid();
  if (existing) {
    console.log(chalk.yellow(`⚠  OpenSigil daemon is already running (PID ${existing})`));
    console.log(chalk.gray(`   Run ${chalk.white('opensigil status')} for details`));
    return;
  }

  const spinner = ora({
    text: chalk.hex('#F97316')('Starting OpenSigil daemon...'),
    color: 'yellow',
  }).start();

  // Spawn the daemon as a detached background process
  const daemonScript = path.join(__dirname, '..', '..', 'dist', 'daemon-entry.js');
  
  const child = spawn(process.execPath, [daemonScript], {
    detached: true,
    stdio: ['ignore', 'ignore', 'ignore'],
    env: { ...process.env, OPENSIGIL_DAEMON: '1' },
  });

  child.unref();

  // Give it a moment to start
  await new Promise(r => setTimeout(r, 800));

  const pid = getDaemonPid();
  if (pid) {
    spinner.succeed(chalk.green(`OpenSigil daemon started`));
    console.log('');
    console.log(`  ${chalk.gray('PID:')}     ${chalk.white(pid)}`);
    console.log(`  ${chalk.gray('Logs:')}    ${chalk.white(OPENSIGIL_DIR + '/activity.log')}`);
    console.log(`  ${chalk.gray('Status:')}  ${chalk.cyan('opensigil status')}`);
    console.log('');
    console.log(chalk.hex('#F97316')('  👁  Watching for AI agents: claude, codex, openclaw...'));
  } else {
    // Daemon might still be starting or running in same process mode
    spinner.succeed(chalk.green('OpenSigil daemon started (monitoring mode)'));
    console.log('');
    console.log(chalk.hex('#F97316')('  👁  Watching for AI agents: claude, codex, openclaw...'));
    console.log(chalk.gray(`  Run ${chalk.white('opensigil logs')} to see agent activity`));
  }
}
