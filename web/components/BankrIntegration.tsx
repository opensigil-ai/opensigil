"use client";

const STEPS = [
  {
    cmd: "npm i -g opensigil",
    label: "Install OpenSigil",
  },
  {
    cmd: "opensigil init --preset bankr",
    label: "Init with Bankr preset",
  },
  {
    cmd: "opensigil start",
    label: "Start monitoring",
  },
  {
    cmd: "opensigil watch",
    label: "Live feed — including every Bankr call",
  },
];

const MONITORS = [
  { host: "llm.bankr.bot",       label: "LLM Gateway calls",          rule: "log",   note: "every call = real spending" },
  { host: "api.bankr.bot",       label: "Agent API calls",            rule: "log",   note: "prompts, jobs, env vars" },
  { host: "wallet/transfer",     label: "Wallet transfers",           rule: "warn",  note: "flag before funds move" },
  { host: "x402.bankr.bot",      label: "x402 pay-per-request",       rule: "log",   note: "per-request USDC charges" },
  { host: "webhooks.bankr.bot",  label: "Webhook triggers",           rule: "log",   note: "external event hooks" },
];

const ruleColor: Record<string, string> = {
  log:   "text-blue-600 bg-blue-50 border-blue-200",
  warn:  "text-amber-600 bg-amber-50 border-amber-200",
  block: "text-red-600 bg-red-50 border-red-200",
};

export default function BankrIntegration() {
  return (
    <section className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Integration badge */}
          <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-5 py-2 mb-8">
            <span className="text-lg">🔶</span>
            <span className="text-gray-400 text-sm">×</span>
            <span className="text-lg">🦀</span>
            <span className="text-sm font-medium text-gray-600 ml-1">
              OpenSigil × Bankr
            </span>
          </div>

          <p className="text-orange-500 font-mono text-sm uppercase tracking-widest mb-3 font-semibold">
            Integration
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Governance for{" "}
            <a
              href="https://bankr.bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              Bankr
            </a>{" "}
            agents
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Bankr agents have real wallets, spend real crypto, and call paid LLM endpoints.
            OpenSigil monitors every one of those actions — locally, with zero telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left — what gets monitored */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center text-white text-xs font-bold">◉</span>
              What gets monitored
            </h3>
            <div className="space-y-3">
              {MONITORS.map((m) => (
                <div
                  key={m.host}
                  className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-xs font-mono text-gray-800 bg-white border border-gray-200 px-2 py-0.5 rounded">
                        {m.host}
                      </code>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${ruleColor[m.rule]}`}>
                        {m.rule}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{m.label} — {m.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — setup steps + terminal */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center text-white text-xs font-bold">⚡</span>
              Setup in 4 commands
            </h3>

            {/* Terminal */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-6">
              <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-gray-400 text-xs font-mono">bankr-agent — zsh</span>
              </div>
              <div className="bg-gray-950 p-4 font-mono text-xs space-y-2">
                {STEPS.map((s, i) => (
                  <div key={i}>
                    <span className="text-orange-400">❯ </span>
                    <span className="text-white">{s.cmd}</span>
                    <div className="text-gray-600 pl-4 text-[11px]"># {s.label}</div>
                  </div>
                ))}
                <div className="pt-1">
                  <span className="text-orange-400">◉ </span>
                  <span className="text-orange-300 font-semibold">OpenSigil × Bankr — monitoring active</span>
                </div>
                <div className="text-gray-500 text-[11px] pl-4">
                  Watching: llm.bankr.bot · api.bankr.bot · wallet/transfer · x402
                </div>
              </div>
            </div>

            {/* Bankr skill install */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span>🦀</span> Install as a Bankr Skill
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Inside any Bankr agent, just say:
              </p>
              <div className="bg-white border border-orange-200 rounded-lg px-4 py-2.5 font-mono text-xs text-gray-800">
                install opensigil from https://github.com/opensigil-ai/opensigil
              </div>
              <p className="text-xs text-gray-400 mt-2">
                OpenSigil becomes the governance layer for your Bankr agent instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
