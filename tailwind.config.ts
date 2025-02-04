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
          dark: "#222222",
          text: "#ffffff",
          secondary: "#8e8e8e",
          link: "#00376b",
        },
      },
      backgroundImage: {
        'story-gradient': 'linear-gradient(45deg, #F97316, #D946EF)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;