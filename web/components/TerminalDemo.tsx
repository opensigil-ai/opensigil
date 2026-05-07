"use client";

import { useEffect, useRef, useState } from "react";

const TERMINAL_LINES = [
  { delay: 0,    type: "prompt", text: "npm i -g opensigil" },
  { delay: 600,  type: "output", text: "added 42 packages in 3s" },
  { delay: 900,  type: "gap",    text: "" },
  { delay: 1100, type: "prompt", text: "opensigil init" },
  { delay: 1600, type: "info",   text: "✓ Created .opensigil/config.json" },
  { delay: 1900, type: "info",   text: "✓ Registered policy ruleset: default" },
  { delay: 2100, type: "gap",    text: "" },
  { delay: 2300, type: "prompt", text: "opensigil start" },
  { delay: 2800, type: "orange", text: "◉ OpenSigil daemon running  ◉ Log watch active" },
  { delay: 3100, type: "gap",    text: "" },
  { delay: 3300, type: "dim",    text: "─────────────────────────────────────────────" },
  { delay: 3500, type: "event",  text: "[09:14:02] 🔍 PROCESS   claude --dangerously-skip-permissions" },
  { delay: 3900, type: "event",  text: "[09:14:02] ✅ ALLOWED   Read file: src/index.ts" },
  { delay: 4300, type: "event",  text: "[09:14:05] ✅ ALLOWED   Write file: src/index.ts" },
  { delay: 4700, type: "warn",   text: "[09:14:09] ⚠️  BLOCKED   Exec: rm -rf /tmp/cache  → policy: no-delete" },
  { delay: 5100, type: "event",  text: "[09:14:11] ✅ ALLOWED   HTTP GET https://api.anthropic.com/v1" },
  { delay: 5400, type: "warn",   text: "[09:14:14] ⚠️  BLOCKED   HTTP POST https://unknown-host.io  → policy: allowlist" },
  { delay: 5700, type: "gap",    text: "" },
  { delay: 5900, type: "orange", text: "Sessions: 1 active · Events: 6 · Violations: 2" },
];

export default function TerminalDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleCount((n) => Math.max(n, i + 1)), line.delay);
    });
  }, [started]);

  return (
    <section ref={ref} className="py-24 px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-orange-500 font-mono text-sm uppercase tracking-widest mb-3 font-semibold">
            Live Demo
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            From install to oversight in{" "}
            <span className="text-orange-500">seconds</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            OpenSigil runs locally on your machine. No cloud. No accounts.
            Just install and start watching.
          </p>
        </div>

        {/* Terminal window */}
        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          {/* Title bar */}
          <div className="bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-3 text-gray-400 text-xs font-mono">opensigil — zsh</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-orange-400 text-xs font-mono">daemon active</span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="bg-gray-950 terminal-body min-h-[340px]">
            {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
              <div key={i} className="mb-0.5">
                {line.type === "prompt" && (
                  <p>
                    <span className="terminal-prompt">❯ </span>
                    <span className="text-white">{line.text}</span>
                    {i === visibleCount - 1 && (
                      <span className="inline-block w-2 h-4 bg-orange-400 ml-0.5 animate-[blink_1s_step-end_infinite] align-middle" />
                    )}
                  </p>
                )}
                {line.type === "output" && (
                  <p className="terminal-output pl-4">{line.text}</p>
                )}
                {line.type === "info" && (
                  <p className="text-green-400 pl-4 text-sm">{line.text}</p>
                )}
                {line.type === "orange" && (
                  <p className="terminal-output-orange font-semibold">{line.text}</p>
                )}
                {line.type === "event" && (
                  <p className="terminal-output text-sm">{line.text}</p>
                )}
                {line.type === "warn" && (
                  <p className="text-amber-400 text-sm">{line.text}</p>
                )}
                {line.type === "dim" && (
                  <p className="text-gray-700 text-xs">{line.text}</p>
                )}
                {line.type === "gap" && <div className="h-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
