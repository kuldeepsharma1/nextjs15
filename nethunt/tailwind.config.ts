import type { Config } from "tailwindcss";

export default {
  darkMode:'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#1D4ED8',
        },
        orange: {
          600: '#F97316',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
