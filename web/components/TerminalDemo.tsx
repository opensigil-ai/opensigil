"use client";

import { useEffect, useState, useRef } from "react";

interface TerminalLine {
  delay: number;
  type: "prompt" | "output" | "warning" | "success" | "orange" | "blank";
  content: string;
}

const TERMINAL_LINES: TerminalLine[] = [
  { delay: 0, type: "prompt", content: "npm i -g opensigil" },
  {
    delay: 800,
    type: "output",
    content: "added 42 packages in 3.2s",
  },
  { delay: 1000, type: "blank", content: "" },
  { delay: 1200, type: "prompt", content: "opensigil init" },
  {
    delay: 1800,
    type: "orange",
    content: "  OpenSigil Init",
  },
  {
    delay: 2000,
    type: "output",
    content: "  Initializing agent oversight for this project",
  },
  { delay: 2300, type: "blank", content: "" },
  {
    delay: 2500,
    type: "success",
    content: "  ✓ Config: .opensigil.json",
  },
  { delay: 2700, type: "success", content: "  ✓ No recursive file deletion" },
  {
    delay: 2900,
    type: "success",
    content: "  ✓ Warn on external API calls",
  },
  { delay: 3100, type: "success", content: "  ✓ Block .env file access" },
  { delay: 3300, type: "blank", content: "" },
  { delay: 3500, type: "prompt", content: "opensigil start" },
  {
    delay: 4000,
    type: "orange",
    content: "  ● OpenSigil daemon started (PID 48271)",
  },
  { delay: 4200, type: "blank", content: "" },
  {
    delay: 4400,
    type: "orange",
    content: "  👁  Watching for AI agents: claude, codex, openclaw...",
  },
  { delay: 4600, type: "blank", content: "" },
  {
    delay: 5000,
    type: "warning",
    content: "  [10:42:31]  ▶ PROCESS START  [Claude Code]  Agent started (PID 48301)",
  },
  {
    delay: 5400,
    type: "output",
    content: "  [10:42:33]  ⚡ TOOL CALL      [Claude Code]  Read file: src/api.ts",
  },
  {
    delay: 5700,
    type: "output",
    content: "  [10:42:34]  ⚡ TOOL CALL      [Claude Code]  Write file: src/api.ts",
  },
  {
    delay: 6000,
    type: "output",
    content: "  [10:42:35]  ⚡ TOOL CALL      [Claude Code]  Bash: npm run test",
  },
];

export default function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
      timers.push(t);
    });
    timersRef.current = timers;

    return () => timers.forEach(clearTimeout);
  }, [started]);

  const lastVisible = visibleLines.length > 0 ? Math.max(...visibleLines) : -1;

  return (
    <section id="install" className="py-24 px-6 relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Up and running in{" "}
            <span className="text-orange-500">seconds</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            One command to install, one to start. OpenSigil runs silently in
            the background watching every AI agent move.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Terminal */}
          <div className="terminal-window">
            <div className="terminal-titlebar">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="text-gray-500 text-xs ml-3 font-mono">
                opensigil — bash
              </span>
            </div>
            <div className="terminal-body min-h-[360px]">
              {TERMINAL_LINES.map((line, i) => {
                if (!visibleLines.includes(i)) {
                  if (i === 0 && !started) {
                    return null;
                  }
                  return null;
                }

                const isLastVisible = i === lastVisible;

                return (
                  <div key={i} className="leading-7">
                    {line.type === "prompt" && (
                      <div className="flex items-center gap-1">
                        <span className="terminal-prompt">❯</span>
                        <span className="terminal-cmd">{line.content}</span>
                        {isLastVisible && (
                          <span className="inline-block w-2 h-4 bg-orange-500 ml-0.5 animate-[blink_1s_step-end_infinite]" />
                        )}
                      </div>
                    )}
                    {line.type === "output" && (
                      <p className="terminal-output pl-4">{line.content}</p>
                    )}
                    {line.type === "orange" && (
                      <p className="terminal-output-orange">{line.content}</p>
                    )}
                    {line.type === "success" && (
                      <p className="terminal-output-green">{line.content}</p>
                    )}
                    {line.type === "warning" && (
                      <p style={{ color: "#fb923c" }} className="text-sm">
                        {line.content}
                      </p>
                    )}
                    {line.type === "blank" && <div className="h-2" />}
                  </div>
                );
              })}
              {!started && (
                <div className="flex items-center gap-1 text-gray-600">
                  <span className="text-gray-600">❯</span>
                  <span className="inline-block w-2 h-4 bg-gray-600 ml-0.5 animate-[blink_1s_step-end_infinite]" />
                </div>
              )}
            </div>
          </div>

          {/* Install info */}
          <div className="flex flex-col gap-4">
            {/* Install command */}
            <div className="bg-[#111] border border-[#222] rounded-xl p-6">
              <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">
                Install
              </p>
              <div className="flex items-center gap-3 bg-[#0d0d0d] rounded-lg px-4 py-3 border border-[#1a1a1a]">
                <span className="text-orange-500 font-mono text-sm select-none">
                  $
                </span>
                <code className="text-white font-mono text-sm flex-1">
                  npm i -g opensigil
                </code>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText("npm i -g opensigil")
                  }
                  className="text-gray-600 hover:text-orange-400 transition-colors"
                  title="Copy"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick commands */}
            <div className="bg-[#111] border border-[#222] rounded-xl p-6">
              <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-4">
                Commands
              </p>
              <div className="space-y-3">
                {[
                  {
                    cmd: "opensigil init",
                    desc: "Initialize in current project",
                  },
                  {
                    cmd: "opensigil start",
                    desc: "Start daemon — monitor agents",
                  },
                  {
                    cmd: "opensigil watch",
                    desc: "Live feed of agent activity",
                  },
                  {
                    cmd: "opensigil logs",
                    desc: "View agent activity history",
                  },
                  {
                    cmd: "opensigil status",
                    desc: "Check daemon status",
                  },
                ].map((item) => (
                  <div key={item.cmd} className="flex items-center gap-3">
                    <code className="text-orange-400 font-mono text-sm w-44">
                      {item.cmd}
                    </code>
                    <span className="text-gray-500 text-sm">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
              <p className="text-orange-400 text-xs font-mono uppercase tracking-widest mb-2">
                Requirements
              </p>
              <p className="text-gray-400 text-sm">
                Node.js ≥ 18 · macOS, Linux, or WSL2
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
