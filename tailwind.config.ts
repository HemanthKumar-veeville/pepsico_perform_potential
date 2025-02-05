import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        instagram: {
          dark: "#404040",
          text: "#ffffff",
          secondary: "#8e8e8e",
          link: "#00376b",
        },
      },
      backgroundImage: {
        'story-gradient': 'linear-gradient(135deg, #0EA5E9, #2563EB, #1E3A8A)',
        'story-gradient-hover': 'linear-gradient(135deg, #0284C7, #1D4ED8, #172554)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;