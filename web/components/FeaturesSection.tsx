"use client";

import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    title: "AI Observability",
    tagline: "See everything your agents do",
    description:
      "Complete visibility into every tool call, file read/write, bash command, and API request your AI agents make. Nothing is hidden.",
    details: [
      "File reads and writes with full path",
      "Bash commands and outputs",
      "HTTP requests and responses",
      "Process spawning and exit codes",
    ],
    code: `[10:42:33] ⚡ TOOL READ    src/auth.ts
[10:42:34] ⚡ TOOL WRITE   src/auth.ts (142 lines)
[10:42:35] ⚡ BASH         npm run test
[10:42:38] ⚡ HTTP POST    https://api.example.com/v1`,
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Agent Oversight",
    tagline: "Policies that agents must follow",
    description:
      "Define rules that agents must respect before they act. OpenSigil intercepts and enforces policies in real-time, keeping your environment safe.",
    details: [
      "Pre-execution policy checks",
      "Block, warn, or log on violation",
      "Per-project policy files",
      "Override with explicit approval",
    ],
    code: `POLICY VIOLATION DETECTED
Rule: no-env-access
Agent: Claude Code (PID 48301)
Action: READ .env.production
Status: ⛔ BLOCKED`,
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Policy Engine",
    tagline: "Your rules, your environment",
    description:
      "Write policies in plain JSON. Define what agents can and cannot do — no deleting production files, no external API calls, no secret exposure.",
    details: [
      "JSON-based policy definitions",
      "Regex pattern matching",
      "Block / warn / log modes",
      "Policy inheritance and overrides",
    ],
    code: `{
  "id": "no-rm-rf",
  "rule": "block",
  "pattern": "rm -rf|rmdir /s",
  "enabled": true
}`,
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    title: "Audit Trail",
    tagline: "Complete tamper-proof history",
    description:
      "Every agent action is logged to a local JSONL file. Query, filter, and replay the complete history of what your AI agents did and when.",
    details: [
      "JSONL event stream format",
      "Full timestamp and context",
      "Process metadata tracking",
      "Queryable with standard tools",
    ],
    code: `{"ts":"2024-01-15T10:42:33Z",
 "type":"tool_call",
 "agent":"Claude Code",
 "pid":48301,
 "action":"write",
 "path":"src/api.ts"}`,
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`glow-border bg-[#111] rounded-xl p-6 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 mb-5">
        {feature.icon}
      </div>

      {/* Title */}
      <h3 className="text-white font-bold text-xl mb-1">{feature.title}</h3>
      <p className="text-orange-400 text-sm font-medium mb-3">
        {feature.tagline}
      </p>
      <p className="text-gray-400 text-sm leading-relaxed mb-5">
        {feature.description}
      </p>

      {/* Details */}
      <ul className="space-y-2 mb-5">
        {feature.details.map((d) => (
          <li key={d} className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
            {d}
          </li>
        ))}
      </ul>

      {/* Code preview */}
      <div className="bg-[#0d0d0d] rounded-lg p-3 border border-[#1a1a1a]">
        <pre className="text-xs font-mono text-gray-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
          {feature.code}
        </pre>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-mono text-sm uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Complete control over your agents
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From raw observability to policy enforcement — OpenSigil gives you
            the oversight layer that every AI-assisted workflow needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
