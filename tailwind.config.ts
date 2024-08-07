import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-background": "#FFF7ED",
        "light-text": "#FFF7ED",
        "dark-background": "#27272a", // This is the equivalent of zinc-800
        "dark-text": "#27272a", // This is the equivalent of zinc-800
      },
      opacity: {
        "85": "0.85",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderWidth: {
        "3": "3px",
      },
      screens: {
        xs: "440px",
      },
      spacing: {
        "120": "30rem", // 120 x 0.25rem = 30rem
      },
    },
  },
  plugins: [],
};
export default config;
