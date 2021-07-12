const { fontSize, fontWeight } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            fontSize: '.75rem',
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
