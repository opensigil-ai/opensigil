"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1a1a1a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-mono">OS</span>
            </div>
            <div className="absolute inset-0 w-8 h-8 bg-orange-500 rounded-lg blur-md opacity-40" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            OpenSigil
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
          >
            How it works
          </a>
          <a
            href="#install"
            className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
          >
            Install
          </a>
          <a
            href="https://github.com/opensigil-ai/opensigil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#install"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Install CLI
          </a>
        </div>
      </div>
    </nav>
  );
}
