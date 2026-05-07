"use client";

import { useEffect, useState } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  { delay: 0, text: "OPENSIGIL v0.1.0", type: "title" },
  { delay: 200, text: "──────────────────────────────────────", type: "divider" },
  { delay: 500, text: "INITIALIZING SYSTEMS...", type: "init" },
  { delay: 900, text: "", type: "blank" },
  { delay: 1100, text: "[ OK ] Loading kernel modules", type: "ok" },
  { delay: 1300, text: "[ OK ] Mounting agent watchers", type: "ok" },
  { delay: 1500, text: "[ OK ] Starting policy engine", type: "ok" },
  { delay: 1700, text: "[ OK ] Initializing audit log", type: "ok" },
  { delay: 1900, text: "", type: "blank" },
  { delay: 2100, text: "01 >> AI OBSERVABILITY        [ARMED]", type: "feature" },
  { delay: 2350, text: "02 >> AGENT OVERSIGHT         [ARMED]", type: "feature" },
  { delay: 2600, text: "03 >> POLICY ENGINE           [ARMED]", type: "feature" },
  { delay: 2850, text: "04 >> AUDIT TRAIL             [ARMED]", type: "feature" },
  { delay: 3100, text: "", type: "blank" },
  { delay: 3300, text: "ALL SYSTEMS OPERATIONAL", type: "ready" },
  { delay: 3600, text: "──────────────────────────────────────", type: "divider" },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
      timers.push(t);
    });

    // Start fade out after last line + pause
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4200);
    timers.push(fadeTimer);

    // Complete after fade
    const doneTimer = setTimeout(() => {
      setDone(true);
      onComplete();
    }, 4900);
    timers.push(doneTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0A0A0A] flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
          style={{
            animation: "scan-line 3s linear infinite",
          }}
        />
      </div>

      {/* CRT vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div className="relative w-full max-w-xl px-8 font-mono">
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            className={`transition-all duration-150 ${
              visibleLines.includes(i)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1"
            }`}
            style={{ minHeight: line.type === "blank" ? "1em" : "auto" }}
          >
            {line.type === "title" && (
              <p className="text-orange-500 font-bold text-xl tracking-widest mb-1">
                {line.text}
              </p>
            )}
            {line.type === "divider" && (
              <p className="text-orange-900 text-sm">{line.text}</p>
            )}
            {line.type === "init" && (
              <p className="text-orange-400 text-sm font-bold tracking-widest animate-pulse">
                {line.text}
              </p>
            )}
            {line.type === "ok" && (
              <p className="text-sm">
                <span className="text-green-500">[ OK ]</span>
                <span className="text-gray-400">
                  {line.text.replace("[ OK ]", "")}
                </span>
              </p>
            )}
            {line.type === "feature" && (
              <p className="text-sm font-bold">
                <span className="text-orange-500">
                  {line.text.split("[")[0]}
                </span>
                <span className="text-green-400">
                  [{line.text.split("[")[1]}
                </span>
              </p>
            )}
            {line.type === "ready" && (
              <p className="text-orange-400 text-sm font-bold tracking-widest">
                {line.text}
                <span className="inline-block w-2 h-4 bg-orange-400 ml-1 animate-[blink_1s_step-end_infinite]" />
              </p>
            )}
            {line.type === "blank" && <div />}
          </div>
        ))}
      </div>
    </div>
  );
}
