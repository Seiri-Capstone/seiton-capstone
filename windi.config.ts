import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
// import plugin from 'windicss/plugin'
// Research more into this

export default defineConfig({
  extract: {
    include: ['**/*.{js,jsx,css}'],
    exclude: ['node_modules', '.git', '.next']
  },
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        sm: '640px'
      },
      colors: {
        gray: colors.coolGray
      },
      fontFamily: {
        ibm: 'IBM Plex Serif',
        // sans: ['IBM Plex Serif', 'sans-serif'],
        serif: ['serif']
      }
    }
  },
  shortcuts: {
    btn: {
      color: 'white',
      '@apply': 'py-2 px-4 font-semibold rounded-lg',
      '&:hover': {
        '@apply': 'bg-green-700',
        color: 'black'
      }
    },
    'btn-green': 'text-white bg-green-500 hover:bg-green-700'
  }
})
