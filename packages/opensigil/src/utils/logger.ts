import * as fs from 'fs';
import * as path from 'path';
import { OPENSIGIL_DIR, EVENTS_LOG, LOG_FILE, ensureDir } from './config';

export interface AgentEvent {
  timestamp: string;
  type: 'process_start' | 'process_stop' | 'tool_call' | 'policy_violation' | 'info';
  agent: string;
  pid?: number;
  details: string;
  metadata?: Record<string, unknown>;
}

export function appendEvent(event: AgentEvent): void {
  ensureDir();
  const line = JSON.stringify(event) + '\n';
  fs.appendFileSync(EVENTS_LOG, line, 'utf-8');

  // Also write human-readable log
  const humanLine = `[${event.timestamp}] [${event.type.toUpperCase()}] [${event.agent}] ${event.details}\n`;
  fs.appendFileSync(LOG_FILE, humanLine, 'utf-8');
}

export function readEvents(limit = 100): AgentEvent[] {
  if (!fs.existsSync(EVENTS_LOG)) return [];
  try {
    const lines = fs.readFileSync(EVENTS_LOG, 'utf-8')
      .split('\n')
      .filter(l => l.trim())
      .map(l => {
        try { return JSON.parse(l) as AgentEvent; }
        catch { return null; }
      })
      .filter(Boolean) as AgentEvent[];
    return lines.slice(-limit);
  } catch {
    return [];
  }
}

export function readLogLines(limit = 50): string[] {
  if (!fs.existsSync(LOG_FILE)) return [];
  try {
    const lines = fs.readFileSync(LOG_FILE, 'utf-8')
      .split('\n')
      .filter(l => l.trim());
    return lines.slice(-limit);
  } catch {
    return [];
  }
}

export function clearLogs(): void {
  try { fs.writeFileSync(EVENTS_LOG, '', 'utf-8'); } catch { /* ignore */ }
  try { fs.writeFileSync(LOG_FILE, '', 'utf-8'); } catch { /* ignore */ }
}
