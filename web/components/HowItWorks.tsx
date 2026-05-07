"use client";

const STEPS = [
  {
    number: "01",
    title: "Install the CLI",
    description: "One command. OpenSigil installs globally and runs locally. No cloud, no accounts, no data leaves your machine.",
    code: "npm i -g opensigil",
  },
  {
    number: "02",
    title: "Initialize your project",
    description: "Run init to create a policy config in your project. Choose from preset rulesets or write your own rules.",
    code: "opensigil init",
  },
  {
    number: "03",
    title: "Start the daemon",
    description: "The daemon watches for AI agent processes and intercepts their actions in real time using process monitoring.",
    code: "opensigil start",
  },
  {
    number: "04",
    title: "Watch & audit",
    description: "Live feed of every agent action. Violations are blocked instantly. All events are logged to a JSONL audit trail.",
    code: "opensigil watch",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-orange-50 border-y border-orange-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-500 font-mono text-sm uppercase tracking-widest mb-3 font-semibold">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            From install to oversight in{" "}
            <span className="text-orange-500">4 steps</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            OpenSigil runs entirely on your machine. Setup takes under a minute.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-orange-200 hidden md:block" />

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative flex gap-6 md:gap-10">
                {/* Number bubble */}
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm font-mono z-10 shadow-md shadow-orange-200">
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.description}</p>
                  <div className="flex items-center gap-3 bg-gray-950 rounded-lg px-4 py-2.5 font-mono text-sm w-fit">
                    <span className="text-orange-400">$</span>
                    <span className="text-white">{step.code}</span>
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
