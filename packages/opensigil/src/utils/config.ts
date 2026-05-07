import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export const OPENSIGIL_DIR = path.join(os.homedir(), '.opensigil');
export const CONFIG_FILE = path.join(OPENSIGIL_DIR, 'config.json');
export const DAEMON_PID_FILE = path.join(OPENSIGIL_DIR, 'daemon.pid');
export const LOG_FILE = path.join(OPENSIGIL_DIR, 'activity.log');
export const EVENTS_LOG = path.join(OPENSIGIL_DIR, 'events.jsonl');

export interface OpenSigilConfig {
  version: string;
  watchInterval: number;
  logMaxLines: number;
  agents: {
    patterns: string[];
    labels: Record<string, string>;
  };
  policies: Policy[];
  alertWebhook?: string;
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rule: 'block' | 'warn' | 'log';
  pattern: string;
}

export const DEFAULT_CONFIG: OpenSigilConfig = {
  version: '0.1.0',
  watchInterval: 2000,
  logMaxLines: 1000,
  agents: {
    patterns: [
      'claude',
      'codex',
      'openclaw',
      'copilot',
      'aider',
      'cursor',
      'continue',
      'codeium',
      'tabnine',
      'ghostwriter',
    ],
    labels: {
      claude: 'Claude Code',
      codex: 'Codex CLI',
      openclaw: 'OpenClaw',
      copilot: 'GitHub Copilot',
      aider: 'Aider',
      cursor: 'Cursor',
      continue: 'Continue.dev',
    },
  },
  policies: [
    {
      id: 'no-rm-rf',
      name: 'No recursive deletion',
      description: 'Block agents from running rm -rf or equivalent',
      enabled: true,
      rule: 'block',
      pattern: 'rm -rf|rmdir /s|del /f',
    },
    {
      id: 'no-curl-external',
      name: 'No external API calls without approval',
      description: 'Warn when agents make external HTTP requests',
      enabled: true,
      rule: 'warn',
      pattern: 'curl|wget|fetch.*http',
    },
    {
      id: 'no-env-access',
      name: 'No .env file access',
      description: 'Block agents from reading environment/secret files',
      enabled: true,
      rule: 'block',
      pattern: '\\.env|\\.envrc|secrets\\.',
    },
  ],
};

export function ensureDir(): void {
  if (!fs.existsSync(OPENSIGIL_DIR)) {
    fs.mkdirSync(OPENSIGIL_DIR, { recursive: true });
  }
}

export function loadConfig(): OpenSigilConfig {
  ensureDir();
  if (!fs.existsSync(CONFIG_FILE)) {
    return { ...DEFAULT_CONFIG };
  }
  try {
    const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function saveConfig(config: OpenSigilConfig): void {
  ensureDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

export function getDaemonPid(): number | null {
  if (!fs.existsSync(DAEMON_PID_FILE)) return null;
  try {
    const pid = parseInt(fs.readFileSync(DAEMON_PID_FILE, 'utf-8').trim(), 10);
    if (isNaN(pid)) return null;
    // Check if process is actually running
    process.kill(pid, 0);
    return pid;
  } catch {
    // Process not running, clean up stale pid file
    try { fs.unlinkSync(DAEMON_PID_FILE); } catch { /* ignore */ }
    return null;
  }
}

export function writeDaemonPid(pid: number): void {
  ensureDir();
  fs.writeFileSync(DAEMON_PID_FILE, String(pid), 'utf-8');
}

export function clearDaemonPid(): void {
  try { fs.unlinkSync(DAEMON_PID_FILE); } catch { /* ignore */ }
}
