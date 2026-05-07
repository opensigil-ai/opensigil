"use client";

const AGENTS = [
  { name: "Claude Code", label: "Anthropic", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { name: "Codex CLI",   label: "OpenAI",    color: "bg-green-100 text-green-700 border-green-200" },
  { name: "OpenClaw",    label: "Open Source", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { name: "MCP Agents",  label: "Any Provider", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { name: "Gemini CLI",  label: "Google",    color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { name: "Cursor",      label: "Anysphere",  color: "bg-pink-100 text-pink-700 border-pink-200" },
];

export default function SupportedAgents() {
  return (
    <section id="agents" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-orange-500 font-mono text-sm uppercase tracking-widest mb-3 font-semibold">
          Compatibility
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Works with every{" "}
          <span className="text-orange-500">AI agent</span>
        </h2>
        <p className="text-gray-500 text-lg mb-12 max-w-xl mx-auto">
          OpenSigil uses process-level monitoring — no SDK integration required.
          If it runs on your machine, OpenSigil can watch it.
        </p>

        {/* Agent chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {AGENTS.map((agent) => (
            <div
              key={agent.name}
              className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 ${agent.color}`}
            >
              <div className="w-2 h-2 rounded-full bg-current opacity-60" />
              <span className="font-semibold text-sm">{agent.name}</span>
              <span className="text-xs opacity-60">· {agent.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 border border-dashed border-gray-300 rounded-xl px-4 py-2.5 text-gray-400 text-sm">
            + any process
          </div>
        </div>

        {/* How detection works */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-left">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center text-orange-500 text-xs">⚡</span>
            How detection works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { step: "1", label: "Process scan", desc: "Daemon polls running processes every 2s using ps-list" },
              { step: "2", label: "Pattern match", desc: "Matches known agent signatures: claude, codex, openclaw..." },
              { step: "3", label: "Policy enforce", desc: "Intercepts syscalls and enforces your ruleset in real time" },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-md flex items-center justify-center text-xs font-bold mb-2">
                  {item.step}
                </div>
                <p className="font-semibold text-gray-900 mb-1">{item.label}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
