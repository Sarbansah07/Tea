import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { forest: '#13241d', canopy: '#1d392c', sage: '#80a68d', gold: '#d5a84b', cream: '#f3eee4', ink: '#24322c', mist: '#dfe8df' }, fontFamily: { display: ['Georgia', 'serif'], sans: ['Arial', 'sans-serif'] } } },
  plugins: []
};
export default config;
