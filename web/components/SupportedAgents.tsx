"use client";

const AGENTS = [
  { name: "Claude Code", company: "Anthropic", icon: "🤖", status: "supported" },
  { name: "Codex CLI", company: "OpenAI", icon: "💻", status: "supported" },
  { name: "OpenClaw", company: "Open Source", icon: "🦀", status: "supported" },
  { name: "Cursor", company: "Anysphere", icon: "↗", status: "supported" },
  { name: "Continue.dev", company: "Continue", icon: "⚡", status: "supported" },
  { name: "Aider", company: "Paul Gauthier", icon: "🛠", status: "supported" },
  { name: "GitHub Copilot", company: "GitHub", icon: "✈", status: "coming-soon" },
  { name: "Any MCP Agent", company: "MCP Protocol", icon: "🔌", status: "supported" },
];

export default function SupportedAgents() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-orange-500 font-mono text-sm uppercase tracking-widest mb-3">
            Supported Agents
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Works with the agents you already use
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            OpenSigil monitors agents by process signature — no plugins, no
            integrations, no code changes required.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {AGENTS.map((agent) => (
            <div
              key={agent.name}
              className={`relative glow-border bg-[#111] rounded-xl p-5 text-center transition-all hover:-translate-y-1 group ${
                agent.status === "coming-soon" ? "opacity-60" : ""
              }`}
            >
              {agent.status === "coming-soon" && (
                <div className="absolute top-2 right-2 bg-orange-500/20 text-orange-400 text-[10px] font-mono rounded px-1.5 py-0.5">
                  SOON
                </div>
              )}
              <div className="text-3xl mb-3">{agent.icon}</div>
              <p className="text-white font-semibold text-sm mb-1">
                {agent.name}
              </p>
              <p className="text-gray-600 text-xs">{agent.company}</p>
              {agent.status === "supported" && (
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-green-500 text-xs">Supported</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MCP note */}
        <div className="mt-8 bg-orange-500/5 border border-orange-500/20 rounded-xl p-6 text-center">
          <p className="text-orange-400 font-medium mb-2">
            🔌 Universal MCP Support
          </p>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Any agent built on the Model Context Protocol (MCP) is automatically
            supported. OpenSigil watches process signatures — if it&apos;s running on
            your machine, it&apos;s being monitored.
          </p>
        </div>
      </div>
    </section>
  );
}
