const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './libs/**/*.{js,ts,jsx,tsx}',
    './libs_cms/**/*.{js,ts,jsx,tsx}',
    './libs_dinkes/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Fredoka', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        maincolor: {
          DEFAULT: '#00807f',
          dark: '#056868'
        },
        secondary: '#0278d0',
        orange: {
          DEFAULT: '#FE852A',
          dark: '#c57336'
        }
      }
    },
  },
  plugins: [],
}
