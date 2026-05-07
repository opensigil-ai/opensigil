"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Each entry: either a typed command or an instant output line
type LineKind =
  | { kind: "type";    prompt: true;  text: string; pauseAfter?: number }
  | { kind: "instant"; prompt: false; text: string; color?: string; gap?: boolean };

const SCRIPT: LineKind[] = [
  { kind: "type",    prompt: true,  text: "npm i -g opensigil", pauseAfter: 400 },
  { kind: "instant", prompt: false, text: "added 42 packages in 3s", color: "gray" },
  { kind: "instant", prompt: false, text: "", gap: true },
  { kind: "type",    prompt: true,  text: "opensigil init", pauseAfter: 350 },
  { kind: "instant", prompt: false, text: "✓ Created .opensigil/config.json", color: "green" },
  { kind: "instant", prompt: false, text: "✓ Registered policy ruleset: default", color: "green" },
  { kind: "instant", prompt: false, text: "", gap: true },
  { kind: "type",    prompt: true,  text: "opensigil start", pauseAfter: 500 },
  { kind: "instant", prompt: false, text: "◉ OpenSigil daemon running  ◉ Log watch active", color: "orange" },
  { kind: "instant", prompt: false, text: "", gap: true },
  { kind: "instant", prompt: false, text: "────────────────────────────────────────────────", color: "dim" },
  { kind: "instant", prompt: false, text: "[09:14:02] 🔍 PROCESS   claude --dangerously-skip-permissions", color: "gray" },
  { kind: "instant", prompt: false, text: "[09:14:02] ✅ ALLOWED   Read file: src/index.ts", color: "gray" },
  { kind: "instant", prompt: false, text: "[09:14:05] ✅ ALLOWED   Write file: src/index.ts", color: "gray" },
  { kind: "instant", prompt: false, text: "[09:14:09] ⚠️  BLOCKED   Exec: rm -rf /tmp/cache  → policy: no-delete", color: "warn" },
  { kind: "instant", prompt: false, text: "[09:14:11] ✅ ALLOWED   HTTP GET https://api.anthropic.com/v1", color: "gray" },
  { kind: "instant", prompt: false, text: "[09:14:14] ⚠️  BLOCKED   HTTP POST https://unknown-host.io  → allowlist", color: "warn" },
  { kind: "instant", prompt: false, text: "", gap: true },
  { kind: "instant", prompt: false, text: "Sessions: 1 active · Events: 6 · Violations: 2", color: "orange" },
];

const TYPING_SPEED = 38; // ms per char
const INSTANT_DELAY = 120; // ms between instant lines

interface RenderedLine {
  id: number;
  prompt: boolean;
  text: string;      // fully displayed text so far
  fullText: string;  // target text
  typing: boolean;   // currently being typed
  color: string;
  gap: boolean;
}

export default function TerminalDemo() {
  const [lines, setLines] = useState<RenderedLine[]>([]);
  const [cursorLine, setCursorLine] = useState(-1);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll terminal body
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = useCallback((partial: Omit<RenderedLine, "id">): number => {
    const id = idRef.current++;
    setLines(prev => [...prev, { ...partial, id }]);
    return id;
  }, []);

  const typeIntoLine = useCallback((id: number, fullText: string): Promise<void> => {
    return new Promise(resolve => {
      let i = 0;
      setCursorLine(id);
      const tick = () => {
        i++;
        setLines(prev =>
          prev.map(l => l.id === id ? { ...l, text: fullText.slice(0, i), typing: i < fullText.length } : l)
        );
        if (i < fullText.length) {
          setTimeout(tick, TYPING_SPEED);
        } else {
          setCursorLine(-1);
          resolve();
        }
      };
      setTimeout(tick, TYPING_SPEED);
    });
  }, []);

  useEffect(() => {
    if (!started) return;

    const run = async () => {
      for (const entry of SCRIPT) {
        if (entry.kind === "type") {
          // Add empty line first, then type into it
          const id = addLine({
            prompt: true,
            text: "",
            fullText: entry.text,
            typing: true,
            color: "white",
            gap: false,
          });
          await typeIntoLine(id, entry.text);
          await delay(entry.pauseAfter ?? 300);
        } else {
          // Instant line
          addLine({
            prompt: false,
            text: entry.text,
            fullText: entry.text,
            typing: false,
            color: entry.color ?? "gray",
            gap: entry.gap ?? false,
          });
          await delay(entry.gap ? 30 : INSTANT_DELAY);
        }
      }
    };

    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div
            ref={bodyRef}
            className="bg-gray-950 font-mono text-sm p-5 min-h-[320px] max-h-[420px] overflow-y-auto leading-relaxed"
            style={{ scrollBehavior: "smooth" }}
          >
            {lines.map(line => (
              <div key={line.id} className={line.gap ? "h-3" : "mb-0.5"}>
                {!line.gap && (
                  <span>
                    {line.prompt && (
                      <span className="text-orange-400 select-none">❯ </span>
                    )}
                    <span className={colorClass(line.color)}>
                      {line.text}
                    </span>
                    {/* Blinking cursor on active typing line */}
                    {cursorLine === line.id && (
                      <span className="inline-block w-[7px] h-[14px] bg-orange-400 ml-[2px] align-middle animate-[blink_0.8s_step-end_infinite]" />
                    )}
                  </span>
                )}
              </div>
            ))}

            {/* Idle cursor when nothing is typing */}
            {started && cursorLine === -1 && lines.length === SCRIPT.length && (
              <div>
                <span className="text-orange-400 select-none">❯ </span>
                <span className="inline-block w-[7px] h-[14px] bg-orange-400 ml-[2px] align-middle animate-[blink_0.8s_step-end_infinite]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function colorClass(color: string): string {
  switch (color) {
    case "orange": return "text-orange-400 font-semibold";
    case "green":  return "text-green-400";
    case "warn":   return "text-amber-400";
    case "dim":    return "text-gray-700 text-xs";
    case "white":  return "text-white";
    case "gray":
    default:       return "text-gray-400";
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}
