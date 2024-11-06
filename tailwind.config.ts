import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // background: 'var(--background)',
        // foreground: 'var(--foreground)',
        primary: '#17153B',
        secondary: '#433D8B',
      },
    },
  },
  plugins: [],
};
export default config;
