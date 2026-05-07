"use client";

export default function CtaSection() {
  return (
    <section className="py-24 px-6 bg-orange-500">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium font-mono">
            Open source · Free forever · MIT License
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          Start governing your agents today
        </h2>
        <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
          Install in seconds. No signup. No cloud. Your agents, your rules, your machine.
        </p>

        {/* Install command */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-3 bg-gray-950 rounded-xl px-5 py-3.5 font-mono text-sm border border-gray-800 shadow-xl">
            <span className="text-orange-400">$</span>
            <span className="text-white">npm i -g opensigil</span>
          </div>
          <a
            href="https://github.com/opensigil-ai/opensigil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white hover:bg-orange-50 text-orange-600 font-semibold px-5 py-3.5 rounded-xl transition-colors shadow-md text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 text-sm text-orange-100">
          <div>npm i -g opensigil</div>
          <div className="w-px h-4 bg-orange-300" />
          <div>v0.1.0</div>
          <div className="w-px h-4 bg-orange-300" />
          <div>MIT License</div>
        </div>
      </div>
    </section>
  );
}
