"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    number: "01",
    title: "Install & Initialize",
    description:
      "Install OpenSigil globally and run `opensigil init` in your project. This creates a local config file with sensible default policies.",
    code: "npm i -g opensigil\ncd your-project/\nopensigil init",
    icon: "⬇",
  },
  {
    number: "02",
    title: "Start the Daemon",
    description:
      "Run `opensigil start` to launch the background daemon. It monitors your system for AI agent processes using process signatures.",
    code: "opensigil start\n# ● Daemon started (PID 48271)\n# 👁 Watching: claude, codex...",
    icon: "▶",
  },
  {
    number: "03",
    title: "Agents Are Monitored",
    description:
      "When Claude Code, Codex CLI, or any other agent starts, OpenSigil automatically begins observing every tool call and action.",
    code: "[10:42:31] ▶ Claude Code started\n[10:42:33] ⚡ Read src/api.ts\n[10:42:34] ⚡ Write src/api.ts",
    icon: "👁",
  },
  {
    number: "04",
    title: "Policies Are Enforced",
    description:
      "Policy violations are caught in real-time. Blocked actions stop the agent. Warnings are logged. Your environment stays safe.",
    code: "⛔ BLOCKED: rm -rf ./dist\nPolicy: no-rm-rf\nAgent: Claude Code (48301)",
    icon: "🛡",
  },
];

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = STEPS.map((_, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => Array.from(new Set([...prev, i])));
          }
        },
        { threshold: 0.2 }
      );
      if (refs.current[i]) observer.observe(refs.current[i]!);
      return observer;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-mono text-sm uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From install to oversight in{" "}
            <span className="text-orange-500">4 steps</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            OpenSigil runs locally, requiring no cloud account, no API keys, and
            no data leaving your machine.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/40 via-orange-500/20 to-transparent hidden sm:block" />

          <div className="space-y-12">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center transition-all duration-700 ${
                  visibleSteps.includes(i)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Step number bubble */}
                <div
                  className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-mono font-bold text-lg border-2 ${
                    i < visibleSteps.length
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "bg-[#111] border-[#333] text-gray-500"
                  } transition-all duration-500`}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1 grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{step.icon}</span>
                      <h3 className="text-white font-bold text-xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {step.code.split("\n").map((line, j) => (
                        <div key={j}>
                          {line.startsWith("#") ? (
                            <span className="text-gray-600">{line}</span>
                          ) : line.startsWith("⛔") ? (
                            <span className="text-red-400">{line}</span>
                          ) : line.startsWith("●") ||
                            line.startsWith("👁") ? (
                            <span className="text-orange-400">{line}</span>
                          ) : line.startsWith("[") ? (
                            <span className="text-gray-300">{line}</span>
                          ) : (
                            <span>
                              <span className="text-orange-500">$</span>{" "}
                              <span className="text-white">{line}</span>
                            </span>
                          )}
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
