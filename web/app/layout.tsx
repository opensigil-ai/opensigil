import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenSigil — The Oversight Layer for AI Agents",
  description:
    "Monitor, audit, and govern AI agents locally. See every tool call, set policies, and maintain a complete audit trail for Claude Code, Codex CLI, and any MCP-based agent.",
  keywords: [
    "AI agents",
    "agent governance",
    "AI observability",
    "Claude Code",
    "Codex CLI",
    "MCP",
    "AI oversight",
    "agent monitoring",
  ],
  authors: [{ name: "OpenSigil", url: "https://opensigil.org" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "OpenSigil — The Oversight Layer for AI Agents",
    description:
      "Monitor, audit, and govern AI agents locally. See every tool call, set policies, and maintain a complete audit trail.",
    url: "https://opensigil.org",
    siteName: "OpenSigil",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenSigil — The Oversight Layer for AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenSigil — The Oversight Layer for AI Agents",
    description: "Monitor, audit, and govern AI agents locally.",
    creator: "@opensigil_org",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
