const { fontSize, fontWeight } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        warmGray: colors.warmGray,
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuschia: colors.fuschia,
        pink: colors.pink,
        rose: colors.rose,
        darkblue: '#2c4482',
        medblue: '#1f487e',
        skyblue: '#376996',
        navyblue: '#15325f',
        darkteal: '#1a81a5',
        peach: '#efe1c6',
        lightorange: '#efc085'
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            // fontSize: '.5 rem',
            color: theme('colors.gray.700'),
            h1: {
              letterSpacing: theme('letterSpacing.tight'),
              fontWeight: '500'
            },
            h2: {
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.800')
            },
            h3: {
              fontSize: theme('text-sm'),
              color: theme('colors.gray.800')
            },
            strong: {
              color: theme('colors.gray.800')
            },
            a: {
              color: theme('colors.green.500'),
              '&:hover': {
                color: theme('colors.green.600')
              }
            }
          }
        }
      })
    }
  },
  variants: {
    typography: ['dark'],
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
