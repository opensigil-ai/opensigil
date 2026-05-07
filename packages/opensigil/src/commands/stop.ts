import chalk from 'chalk';
import ora from 'ora';
import { getDaemonPid, clearDaemonPid } from '../utils/config';

export async function stopCommand(): Promise<void> {
  const pid = getDaemonPid();

  if (!pid) {
    console.log(chalk.yellow('⚠  No OpenSigil daemon is currently running'));
    return;
  }

  const spinner = ora({
    text: `Stopping daemon (PID ${pid})...`,
    color: 'yellow',
  }).start();

  try {
    process.kill(pid, 'SIGTERM');
    
    // Wait for it to stop
    let stopped = false;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 250));
      try {
        process.kill(pid, 0); // Check if still alive
      } catch {
        stopped = true;
        break;
      }
    }

    if (!stopped) {
      // Force kill
      try { process.kill(pid, 'SIGKILL'); } catch { /* ignore */ }
    }

    clearDaemonPid();
    spinner.succeed(chalk.green('OpenSigil daemon stopped'));
  } catch (err: unknown) {
    clearDaemonPid();
    const msg = err instanceof Error ? err.message : String(err);
    spinner.succeed(chalk.green(`Daemon stopped (${msg})`));
  }
}
