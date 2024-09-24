/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': {
          light: '#3B82F6',
          DEFAULT: '#19007E',
          dark: '#1E3A8A',
        },
        'gray-custom': {
          DEFAULT: '#1a1a1a',
        },
      },
      fontSize: {
        '3.5xl': '2rem',
      },
    },
  },
  plugins: [],
};
