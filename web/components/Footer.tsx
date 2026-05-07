export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-mono">
                    OS
                  </span>
                </div>
                <div className="absolute inset-0 w-8 h-8 bg-orange-500 rounded-lg blur-md opacity-40" />
              </div>
              <span className="font-bold text-white text-lg">OpenSigil</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              The oversight layer for AI agents. Local-first, open source, zero
              telemetry.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-white text-sm font-semibold mb-3">Product</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-500 hover:text-orange-400 transition-colors text-sm"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-500 hover:text-orange-400 transition-colors text-sm"
                  >
                    How it works
                  </a>
                </li>
                <li>
                  <a
                    href="#install"
                    className="text-gray-500 hover:text-orange-400 transition-colors text-sm"
                  >
                    Install
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-3">Community</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/opensigil-ai/opensigil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-orange-400 transition-colors text-sm"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/opensigil_org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-orange-400 transition-colors text-sm"
                  >
                    Twitter / X
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-3">Legal</p>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-500 text-sm">MIT License</span>
                </li>
                <li>
                  <span className="text-gray-500 text-sm">Open Source</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} OpenSigil. Open source under the MIT
            License.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/opensigil-ai/opensigil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-orange-400 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
