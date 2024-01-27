import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'text' : '#181818',
        'beige' : '#FBFAEF',
        'secondary-text' : '#494949',
        'primary-color-hover' : '#941920',
        'secondary-color' : '#F76131',
        'pink-color' : '#F6C4BD',
        'fake-transparent' : 'rgba(255, 247, 207, 0.5)'
      },
      fontFamily: {
        title: ['var(--font-title)'],
        main: ['var(--font-main)'],
      },
    },
  },
  plugins: [],
};
export default config;
