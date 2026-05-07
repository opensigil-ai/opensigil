"use client";

import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "AI Observability",
    description: "See every tool call, file read/write, shell command, and API request your agents make — in real time.",
    code: `[09:14:02] READ   src/index.ts
[09:14:03] WRITE  src/index.ts
[09:14:05] EXEC   npm install
[09:14:07] HTTP   GET api.openai.com`,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Agent Oversight",
    description: "Monitor active agent sessions across Claude Code, Codex CLI, and any MCP-based agent on your machine.",
    code: `Sessions: 2 active
├─ claude  PID 4821  ▲ running
└─ codex   PID 5120  ▲ running

Status: ⛔ BLOCKED rm -rf`,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Policy Engine",
    description: "Define rules your agents must follow. Block dangerous commands, restrict network access, protect sensitive paths.",
    code: `# .opensigil/policy.json
{
  "rules": [
    { "deny": "exec:rm -rf" },
    { "deny": "http:*.unknown.io" },
    { "allow": "read:src/**" }
  ]
}`,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Audit Trail",
    description: "Every agent action is logged to a tamper-evident JSONL file. Replay sessions, investigate incidents.",
    code: `{"ts":"09:14:02","type":"read",
  "agent":"claude","path":"src/api.ts"}
{"ts":"09:14:09","type":"exec",
  "agent":"claude","cmd":"rm -rf /tmp",
  "blocked":true,"policy":"no-delete"}`,
  },
];

export default function FeaturesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-500 font-mono text-sm uppercase tracking-widest mb-3 font-semibold">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to{" "}
            <span className="text-orange-500">govern agents</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            OpenSigil gives you full visibility and control over every AI agent
            running on your machine.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`card-border bg-white rounded-2xl p-6 transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Icon */}
              <div className="w-11 h-11 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center text-orange-500 mb-5">
                {f.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">{f.description}</p>

              {/* Code block */}
              <div className="bg-gray-950 rounded-xl p-4 font-mono text-xs leading-relaxed">
                {f.code.split("\n").map((line, j) => (
                  <div key={j} className="text-gray-400">
                    {line.startsWith("#") ? (
                      <span className="text-gray-600">{line}</span>
                    ) : line.includes("BLOCKED") || line.includes("blocked") || line.includes("deny") ? (
                      <span className="text-amber-400">{line}</span>
                    ) : line.includes("ALLOWED") || line.includes("allow") ? (
                      <span className="text-green-400">{line}</span>
                    ) : line.includes("READ") || line.includes("read") ? (
                      <span className="text-blue-400">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
