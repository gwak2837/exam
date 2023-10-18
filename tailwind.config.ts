import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'text-gray-350': '#243c5a',
      },
    },
  },
  plugins: [],
}

export default config
