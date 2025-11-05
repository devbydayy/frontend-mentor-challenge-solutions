import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        'lg': '1rem', 
      },
      colors: {
        neutral: {
          '900': 'hsl(243, 96%, 9%)',
          '800': 'hsl(243, 27%, 20%)',
          '700': 'hsl(243, 23%, 24%)',
          '600': 'hsl(243, 23%, 30%)',
          '300': 'hsl(240, 6%, 70%)',
          '200': 'hsl(250, 6%, 84%)',
          '0': 'hsl(0, 0%, 100%)',
        },
        orange: {
          '500': 'hsl(28, 100%, 52%)',
        },
        blue: {
          '500': 'hsl(233, 67%, 56%)',
          '700': 'hsl(248, 70%, 36%)',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        grotesque: ['var(--font-grotesque)', 'sans-serif'],
      },
      fontSize: {
        'body': '18px',
      },
      screens: {
        'mobile': '375px',
        'desktop': '1440px',
      },
    },
  },
  plugins: [],
};
export default config;
