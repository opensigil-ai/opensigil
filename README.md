# OpenSigil

**The Oversight Layer for AI Agents**

OpenSigil is an open-source AI Agent governance and observability tool. Run it locally to monitor, audit, and control AI agents like Claude Code, Codex CLI, and any MCP-based agent.

## Features

- **AI Observability** — See every tool call, file read/write, and API request your agents make
- **Agent Oversight** — Set policies that agents must follow before they act
- **Policy Engine** — Define rules: no deleting files, no external API calls without approval
- **Audit Trail** — Complete tamper-proof log of all agent actions

## Quick Start

```bash
npm i -g opensigil
opensigil init
opensigil start
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `opensigil start` | Start the daemon — begin monitoring AI agents |
| `opensigil stop` | Stop the daemon |
| `opensigil status` | Show daemon status and active sessions |
| `opensigil logs` | View recent agent activity logs |
| `opensigil watch` | Live feed of agent activity |
| `opensigil init` | Initialize config in current project |

## Supported Agents

- Claude Code
- Codex CLI
- OpenClaw
- Any MCP-based agent

## Links

- Website: [opensigil.ai](https://opensigil.ai)
- Twitter: [@opensigil_org](https://x.com/opensigil_org)

## License

MIT
