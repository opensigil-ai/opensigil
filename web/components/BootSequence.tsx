"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  { type: "init",    text: "INITIALIZING SYSTEMS..." },
  { type: "blank",   text: "" },
  { type: "ok",      text: "[ OK ] Loading policy engine" },
  { type: "ok",      text: "[ OK ] Mounting audit logger" },
  { type: "ok",      text: "[ OK ] Connecting process watcher" },
  { type: "blank",   text: "" },
  { type: "feature", text: "01 >> AI OBSERVABILITY   [ARMED]" },
  { type: "feature", text: "02 >> AGENT OVERSIGHT    [ARMED]" },
  { type: "feature", text: "03 >> POLICY ENGINE      [ARMED]" },
  { type: "feature", text: "04 >> AUDIT TRAIL        [ARMED]" },
  { type: "blank",   text: "" },
  { type: "title",   text: "OPENSIGIL.ORG  v0.1.0-alpha" },
  { type: "blank",   text: "" },
  { type: "ready",   text: "READY" },
];

interface Props {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setVisibleLines((prev) => [...prev, i]);
      i++;
      if (i >= BOOT_LINES.length) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 900);
      }
    }, 110);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "#0A0A0A" }}
    >
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
              <p className="text-orange-400 font-bold text-xl tracking-widest mb-1">
                {line.text}
              </p>
            )}
            {line.type === "init" && (
              <p className="text-orange-400 text-sm font-bold tracking-widest animate-pulse">
                {line.text}
              </p>
            )}
            {line.type === "ok" && (
              <p className="text-sm">
                <span className="text-green-400">[ OK ]</span>
                <span className="text-gray-400">
                  {line.text.replace("[ OK ]", "")}
                </span>
              </p>
            )}
            {line.type === "feature" && (
              <p className="text-sm font-bold">
                <span className="text-orange-400">
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
