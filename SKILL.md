---
name: opensigil
description: OpenSigil is the oversight layer for AI agents. Use this skill to monitor every action your agent takes, enforce policies it cannot break, and maintain a tamper-evident audit trail — all locally, with zero telemetry. Activate when you want governance, observability, or audit logging for any agent session. Pairs with Bankr agents to govern financial actions, LLM gateway calls, and wallet interactions.
license: MIT
compatibility: Works with any Bankr agent. Monitors HTTP calls including api.bankr.bot and llm.bankr.bot, enforces spending policies, and logs all financial actions to a local JSONL audit trail.
---

# OpenSigil — Oversight Layer for AI Agents

OpenSigil is a local-first governance daemon that runs alongside your AI agents. It monitors every action, enforces policy rules, and maintains a complete audit trail. Zero telemetry. No cloud. MIT licensed.

## Install

```bash
npm i -g opensigil
opensigil init
opensigil start
```

## What it does

- **Live monitoring** — watches every tool call, file read/write, shell command, and HTTP request
- **Policy enforcement** — blocks actions that violate your rules before they execute
- **Audit trail** — writes every event to a tamper-evident JSONL log at `~/.opensigil/events.jsonl`
- **Terminal UIs** — `opensigil status`, `opensigil watch`, `opensigil logs`

## Bankr Integration

OpenSigil natively monitors Bankr agent activity, including:

- All HTTP calls to `api.bankr.bot`, `llm.bankr.bot`, and `webhooks.bankr.bot`
- Wallet transfer actions (detects transfer patterns in agent output)
- LLM Gateway inference calls (every call = real spending — log it)
- Swap and financial action patterns

### Bankr Preset Policy

Run `opensigil init --preset bankr` to get a pre-configured policy for Bankr agents:

```json
{
  "preset": "bankr-agent",
  "policies": [
    { "id": "bankr-llm-log",     "rule": "log",   "pattern": "llm.bankr.bot" },
    { "id": "bankr-api-log",     "rule": "log",   "pattern": "api.bankr.bot" },
    { "id": "bankr-transfer-warn","rule": "warn",  "pattern": "wallet/transfer" },
    { "id": "bankr-x402-log",    "rule": "log",   "pattern": "x402.bankr.bot" },
    { "id": "no-unknown-hosts",  "rule": "warn",  "pattern": "(?!.*bankr\\.bot)https?://[^/]+" },
    { "id": "no-rm-rf",          "rule": "block", "pattern": "rm -rf" },
    { "id": "no-env-access",     "rule": "block", "pattern": "\\.env|\\.envrc" }
  ]
}
```

## Usage with Bankr

```bash
# 1. Install OpenSigil
npm i -g opensigil

# 2. Init with Bankr preset
opensigil init --preset bankr

# 3. Start the daemon
opensigil start

# 4. Watch live — including every Bankr LLM and wallet call
opensigil watch
```

## Agent Commands

Once OpenSigil is running, you can ask your agent:

- *"Is OpenSigil monitoring my session?"*
- *"Show me my recent activity log"*
- *"What policies are active?"*
- *"Did any actions get blocked today?"*

## Audit Log Format

```jsonl
{"ts":"2025-05-07T09:14:02Z","type":"http","agent":"bankr","url":"https://llm.bankr.bot/v1/chat/completions","blocked":false}
{"ts":"2025-05-07T09:14:09Z","type":"http","agent":"bankr","url":"https://api.bankr.bot/wallet/transfer","blocked":false,"policy":"bankr-transfer-warn"}
{"ts":"2025-05-07T09:15:01Z","type":"exec","agent":"bankr","cmd":"rm -rf /tmp/cache","blocked":true,"policy":"no-rm-rf"}
```

## Links

- Website: https://opensigil.org
- GitHub: https://github.com/opensigil-ai/opensigil
- npm: https://npmjs.com/package/opensigil
- Twitter: https://x.com/opensigil_org
