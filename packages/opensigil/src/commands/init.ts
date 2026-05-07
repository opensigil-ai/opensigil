import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { loadConfig, saveConfig, ensureDir } from '../utils/config';

const LOCAL_CONFIG_FILE = '.opensigil.json';

export async function initCommand(): Promise<void> {
  const cwd = process.cwd();
  const localConfigPath = path.join(cwd, LOCAL_CONFIG_FILE);

  console.log('');
  console.log(chalk.hex('#F97316').bold('  OpenSigil Init'));
  console.log(chalk.gray('  Initializing agent oversight for this project'));
  console.log('');

  const spinner = ora({ text: 'Setting up OpenSigil...', color: 'yellow' }).start();
  
  await new Promise(r => setTimeout(r, 500));

  // Ensure global dir exists
  ensureDir();

  // Create local config
  const localConfig = {
    project: path.basename(cwd),
    created: new Date().toISOString(),
    policies: [
      { id: 'no-rm-rf', enabled: true },
      { id: 'no-curl-external', enabled: true },
      { id: 'no-env-access', enabled: true },
    ],
    watchPaths: ['src/', 'lib/', '.'],
    ignorePatterns: ['node_modules/', '.git/', 'dist/', '.next/'],
  };

  fs.writeFileSync(localConfigPath, JSON.stringify(localConfig, null, 2), 'utf-8');

  // Update global config
  const globalConfig = loadConfig();
  saveConfig(globalConfig);

  spinner.succeed(chalk.green('OpenSigil initialized'));
  console.log('');
  console.log(`  ${chalk.gray('Config:')}   ${chalk.white(LOCAL_CONFIG_FILE)}`);
  console.log(`  ${chalk.gray('Global:')}   ${chalk.white(require('os').homedir() + '/.opensigil/config.json')}`);
  console.log('');
  console.log(chalk.gray('  Active policies:'));
  console.log(`    ${chalk.green('✓')} No recursive file deletion`);
  console.log(`    ${chalk.green('✓')} Warn on external API calls`);
  console.log(`    ${chalk.green('✓')} Block .env file access`);
  console.log('');
  console.log(chalk.gray('  Next steps:'));
  console.log(`    ${chalk.white('1.')} Run ${chalk.cyan('opensigil start')} to begin monitoring`);
  console.log(`    ${chalk.white('2.')} Edit ${chalk.cyan(LOCAL_CONFIG_FILE)} to customize policies`);
  console.log(`    ${chalk.white('3.')} Run ${chalk.cyan('opensigil watch')} for live agent activity`);
  console.log('');
}
