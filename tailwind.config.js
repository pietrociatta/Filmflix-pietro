/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        scroll: '#2d333f',
      },
      animation: {
        'card-pop': 'pop 500ms  cubic-bezier(0, 0, 0.2, 1)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '50%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
    require('daisyui'),
    require('tailwind-scrollbar'),
  ],

  daisyui: {
    styled: true,
    themes: ['dark'],
    base: true,
    utils: true,

    darkTheme: 'dark',
  },
};
