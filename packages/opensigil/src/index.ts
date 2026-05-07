#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { startCommand } from './commands/start';
import { stopCommand } from './commands/stop';
import { statusCommand } from './commands/status';
import { logsCommand } from './commands/logs';
import { initCommand } from './commands/init';
import { watchCommand } from './commands/watch';

// Check if running as daemon
if (process.env.OPENSIGIL_DAEMON === '1') {
  const { runDaemon } = require('./daemon');
  runDaemon().catch((err: Error) => {
    console.error('Daemon error:', err.message);
    process.exit(1);
  });
} else {
  const program = new Command();

  const orange = chalk.hex('#F97316');
  const banner = `
  ${orange('█▀█ █▀█ █▀▀ █▄ █ █▀ █ █▀▀ █ █')}
  ${orange('█▄█ █▀▀ ██▄ █ ▀█ ▄█ █ █▄█ █ █▄')}
  
  ${chalk.white.bold('OpenSigil')} ${chalk.gray('— The Oversight Layer for AI Agents')}
  ${chalk.gray('v' + require('../package.json').version)}
`;

  program
    .name('opensigil')
    .description('The Oversight Layer for AI Agents')
    .version(require('../package.json').version)
    .addHelpText('beforeAll', banner);

  program
    .command('start')
    .description('Start the OpenSigil daemon — begin monitoring AI agents')
    .action(async () => {
      await startCommand();
    });

  program
    .command('stop')
    .description('Stop the OpenSigil daemon')
    .action(async () => {
      await stopCommand();
    });

  program
    .command('status')
    .description('Show daemon status and active agent sessions')
    .action(async () => {
      await statusCommand();
    });

  program
    .command('logs')
    .description('View recent agent activity logs')
    .option('-n, --lines <number>', 'Number of log lines to show', '50')
    .option('-t, --type <type>', 'Filter by event type (process_start, tool_call, policy_violation)')
    .action(async (options) => {
      await logsCommand({
        lines: parseInt(options.lines, 10),
        type: options.type,
      });
    });

  program
    .command('watch')
    .description('Live feed of agent activity (tail -f for agents)')
    .action(async () => {
      await watchCommand();
    });

  program
    .command('init')
    .description('Initialize OpenSigil config in the current project')
    .action(async () => {
      await initCommand();
    });

  // Show banner + help if no command given
  if (process.argv.length <= 2) {
    console.log(banner);
    console.log(chalk.gray('  Commands:'));
    console.log(`    ${orange('start')}   Start the daemon — monitor AI agents`);
    console.log(`    ${orange('stop')}    Stop the daemon`);
    console.log(`    ${orange('status')}  Show daemon status and active sessions`);
    console.log(`    ${orange('logs')}    View recent agent activity`);
    console.log(`    ${orange('watch')}   Live feed of agent activity`);
    console.log(`    ${orange('init')}    Initialize config in current project`);
    console.log('');
    console.log(chalk.gray('  Quick start:'));
    console.log(`    ${chalk.white('npm i -g opensigil')}`);
    console.log(`    ${chalk.white('opensigil init')}`);
    console.log(`    ${chalk.white('opensigil start')}`);
    console.log('');
    console.log(chalk.gray(`  Docs: ${chalk.white('https://opensigil.ai')}`));
    console.log(chalk.gray(`  Twitter: ${chalk.white('https://x.com/opensigil_org')}`));
    console.log('');
    process.exit(0);
  }

  program.parse(process.argv);
}
