import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        brand: {
          primary: "#F97316",
          secondary: "#EA580C",
          bright: "#FF6B00",
        },
        surface: {
          dark: "#0A0A0A",
          card: "#111111",
          border: "#1a1a1a",
          muted: "#222222",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "blink": "blink 1s step-end infinite",
        "scan": "scan 3s linear infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px #F97316, 0 0 10px #F97316" },
          "50%": { boxShadow: "0 0 20px #F97316, 0 0 40px #F97316" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(249, 115, 22, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.05) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
