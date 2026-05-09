import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { loadConfig, saveConfig, ensureDir } from '../utils/config';

const LOCAL_CONFIG_FILE = '.opensigil.json';

const orange = chalk.hex('#F97316');

const BANKR_PRESET = {
  preset: 'bankr-agent',
  project: '',
  created: '',
  policies: [
    { id: 'bankr-llm-log',       rule: 'log',   pattern: 'llm\\.bankr\\.bot',      description: 'Log all Bankr LLM Gateway calls (each call = real spending)' },
    { id: 'bankr-api-log',       rule: 'log',   pattern: 'api\\.bankr\\.bot',      description: 'Log all Bankr Agent API calls' },
    { id: 'bankr-transfer-warn', rule: 'warn',  pattern: 'wallet/transfer',         description: 'Warn on wallet transfer actions' },
    { id: 'bankr-x402-log',      rule: 'log',   pattern: 'x402\\.bankr\\.bot',     description: 'Log all Bankr x402 pay-per-request calls' },
    { id: 'bankr-webhooks-log',  rule: 'log',   pattern: 'webhooks\\.bankr\\.bot', description: 'Log all Bankr webhook triggers' },
    { id: 'no-rm-rf',            rule: 'block', pattern: 'rm -rf|rmdir /s',        description: 'Block recursive deletion' },
    { id: 'no-env-access',       rule: 'block', pattern: '\\.env|\\.envrc',         description: 'Block .env file access' },
  ],
  watchPaths: ['src/', 'lib/', '.'],
  ignorePatterns: ['node_modules/', '.git/', 'dist/', '.next/'],
};

const DEFAULT_PRESET = {
  project: '',
  created: '',
  policies: [
    { id: 'no-rm-rf',        rule: 'block', pattern: 'rm -rf|rmdir /s', description: 'Block recursive deletion' },
    { id: 'no-curl-external', rule: 'warn',  pattern: 'curl|wget',      description: 'Warn on external HTTP calls' },
    { id: 'no-env-access',   rule: 'block', pattern: '\\.env|\\.envrc', description: 'Block .env file access' },
  ],
  watchPaths: ['src/', 'lib/', '.'],
  ignorePatterns: ['node_modules/', '.git/', 'dist/', '.next/'],
};

export async function initCommand(options: { preset?: string } = {}): Promise<void> {
  const cwd = process.cwd();
  const localConfigPath = path.join(cwd, LOCAL_CONFIG_FILE);
  const isBankr = options.preset === 'bankr';

  console.log('');
  console.log(orange.bold('  OpenSigil Init'));
  if (isBankr) {
    console.log(chalk.gray('  Initializing with ') + orange('Bankr Agent') + chalk.gray(' preset'));
  } else {
    console.log(chalk.gray('  Initializing agent oversight for this project'));
  }
  console.log('');

  const spinner = ora({ text: 'Setting up OpenSigil...', color: 'yellow' }).start();
  await new Promise(r => setTimeout(r, 500));

  ensureDir();

  const preset = isBankr ? { ...BANKR_PRESET } : { ...DEFAULT_PRESET };
  preset.project = path.basename(cwd);
  preset.created = new Date().toISOString();

  fs.writeFileSync(localConfigPath, JSON.stringify(preset, null, 2), 'utf-8');

  const globalConfig = loadConfig();
  saveConfig(globalConfig);

  spinner.succeed(chalk.green('OpenSigil initialized'));
  console.log('');
  console.log(`  ${chalk.gray('Config:')}   ${chalk.white(LOCAL_CONFIG_FILE)}`);
  console.log(`  ${chalk.gray('Global:')}   ${chalk.white(require('os').homedir() + '/.opensigil/config.json')}`);

  if (isBankr) {
    console.log('');
    console.log(`  ${orange('◉')} ${chalk.bold('Bankr Agent preset active')}`);
    console.log('');
    console.log(chalk.gray('  Monitoring:'));
    console.log(`    ${chalk.green('✓')} ${chalk.white('llm.bankr.bot')}       ${chalk.gray('— log every LLM inference call')}`);
    console.log(`    ${chalk.green('✓')} ${chalk.white('api.bankr.bot')}       ${chalk.gray('— log all Agent API calls')}`);
    console.log(`    ${chalk.green('✓')} ${chalk.white('wallet/transfer')}     ${chalk.gray('— warn on wallet transfers')}`);
    console.log(`    ${chalk.green('✓')} ${chalk.white('x402.bankr.bot')}      ${chalk.gray('— log pay-per-request calls')}`);
    console.log(`    ${chalk.green('✓')} ${chalk.white('webhooks.bankr.bot')}  ${chalk.gray('— log webhook triggers')}`);
    console.log(`    ${chalk.red('✗')} ${chalk.white('rm -rf')}              ${chalk.gray('— blocked')}`);
    console.log(`    ${chalk.red('✗')} ${chalk.white('.env access')}         ${chalk.gray('— blocked')}`);
  } else {
    console.log('');
    console.log(chalk.gray('  Active policies:'));
    console.log(`    ${chalk.green('✓')} No recursive file deletion`);
    console.log(`    ${chalk.green('✓')} Warn on external API calls`);
    console.log(`    ${chalk.green('✓')} Block .env file access`);
  }

  console.log('');
  console.log(chalk.gray('  Next steps:'));
  console.log(`    ${chalk.white('1.')} Run ${chalk.cyan('opensigil start')} to begin monitoring`);
  console.log(`    ${chalk.white('2.')} Edit ${chalk.cyan(LOCAL_CONFIG_FILE)} to customize policies`);
  console.log(`    ${chalk.white('3.')} Run ${chalk.cyan('opensigil watch')} for live agent activity`);
  if (isBankr) {
    console.log('');
    console.log(`  ${chalk.gray('Docs:')} ${chalk.white('https://opensigil.org')}`);
    console.log(`  ${chalk.gray('Bankr:')} ${chalk.white('https://bankr.bot')}`);
  }
  console.log('');
}
