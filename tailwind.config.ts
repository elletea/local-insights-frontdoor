import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-cash-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-exact-block)', 'sans-serif'],
      },
      letterSpacing: {
        'tight-2': '-0.1em',
      },
    },
  },
  plugins: [],
};
export default config;
