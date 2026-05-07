"use client";

const LINKS = {
  Product: [
    { label: "Features",    href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Agents",      href: "#agents" },
    { label: "npm package", href: "https://npmjs.com/package/opensigil" },
  ],
  Resources: [
    { label: "GitHub",       href: "https://github.com/opensigil-org/opensigil" },
    { label: "npm",          href: "https://npmjs.com/package/opensigil" },
    { label: "Twitter / X",  href: "https://x.com/opensigil_org" },
    { label: "MIT License",  href: "https://github.com/opensigil-org/opensigil/blob/main/LICENSE" },
  ],
  Install: [
    { label: "npm i -g opensigil",    href: "#" },
    { label: "opensigil init",         href: "#" },
    { label: "opensigil start",        href: "#" },
    { label: "opensigil watch",        href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-bold text-white">OpenSigil</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 mb-4">
              The oversight layer for AI agents. Local-first, open source, zero telemetry.
            </p>
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/opensigil-org/opensigil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-400 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href="https://x.com/opensigil_org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-400 transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* npm */}
              <a
                href="https://npmjs.com/package/opensigil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-400 transition-colors"
                aria-label="npm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 0v24h24V0H0zm13.333 20H10.667v-8H8v8H4V4h16v16h-6.667v-8h-2.667v8H13.333z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`text-sm transition-colors hover:text-orange-400 ${
                        link.label.startsWith("opensigil") || link.label.startsWith("npm i")
                          ? "font-mono text-gray-600"
                          : "text-gray-500"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} OpenSigil. Open source under the MIT License.
          </p>
          <p className="text-gray-700 text-xs font-mono">
            opensigil.org
          </p>
        </div>
      </div>
    </footer>
  );
}
