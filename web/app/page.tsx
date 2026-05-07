"use client";

import { useState } from "react";
import BootSequence from "@/components/BootSequence";
import HeroSection from "@/components/HeroSection";
import TerminalDemo from "@/components/TerminalDemo";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import SupportedAgents from "@/components/SupportedAgents";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      {!bootDone && <BootSequence onComplete={() => setBootDone(true)} />}

      <div
        className={`transition-opacity duration-700 ${bootDone ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <Navbar />
        <HeroSection />
        <TerminalDemo />
        <FeaturesSection />
        <HowItWorks />
        <SupportedAgents />
        <CtaSection />
        <Footer />
      </div>
    </main>
  );
}
