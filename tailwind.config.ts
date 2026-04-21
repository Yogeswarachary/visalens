import type { Config } from "tailwindcss";

const config: Config = {
  // Use 'content' to tell Tailwind where your classes are
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // This ensures 'cyan-400' maps to your primary brand color
        primary: "#38bdf8", 
      },
    },
  },
  plugins: [],
};
export default config;
