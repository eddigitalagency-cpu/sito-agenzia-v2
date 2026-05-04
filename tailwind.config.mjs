/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['GraphikLCG', 'Inter', 'system-ui', 'sans-serif'],
        cal:  ['CalSans', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'heading': ['90px', { lineHeight: '117px', fontWeight: '600' }],
      },
      colors: {
        'body-text': 'rgb(161, 161, 170)',
      },
    },
  },
  plugins: [],
};
