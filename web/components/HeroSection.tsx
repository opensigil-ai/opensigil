"use client";

import { useEffect, useState } from "react";

const CYCLING_WORDS = ["act", "execute", "deploy", "run", "think"];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Orange radial glow — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, rgba(249,115,22,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-orange-600 text-sm font-medium font-mono">
            Local-first · Open source · Zero telemetry
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
          <span className="text-gray-900">Govern your agents</span>
          <br />
          <span className="text-gray-900">before they </span>
          <span
            className={`text-orange-500 transition-all duration-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            } inline-block`}
          >
            {CYCLING_WORDS[wordIndex]}
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-500 text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Monitor what your agents are doing, set rules they can&apos;t break,
          and maintain a complete audit trail across providers.
        </p>

        {/* Install command */}
        <div id="install" className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-3 bg-gray-900 rounded-xl px-5 py-3.5 font-mono text-sm border border-gray-800 shadow-lg">
            <span className="text-orange-400">$</span>
            <span className="text-white">npm i -g opensigil</span>
            <button
              onClick={() => navigator.clipboard?.writeText("npm i -g opensigil")}
              className="ml-2 text-gray-500 hover:text-orange-400 transition-colors"
              title="Copy"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          <a
            href="https://github.com/opensigil-org/opensigil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600 font-medium px-5 py-3.5 rounded-xl transition-all text-sm shadow-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span>v0.1.0 stable</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <span>MIT License</span>
          <div className="w-px h-4 bg-gray-200" />
          <span>Node ≥ 18</span>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
