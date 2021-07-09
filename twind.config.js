// import typography from "@twind/typography";
// import { forms, formInput } from "@twind/forms";
import { setup, apply } from 'twind'
import { css } from 'twind/css'
import * as colors from 'twind/colors'

// Don't need to explicitly set up Configuration and Token
// TODO: Figure out how to deal with typography...
setup({
  preflight: (preflight, { theme }) =>
    css(
      preflight,
      {
        body: {
          backgroundColor: theme('colors.gray.100')
        },
        // Theme: https://github.com/tailwindlabs/tailwindcss/blob/v1/stubs/defaultConfig.stub.js#L5
        h1: {
          fontSize: theme('fontSize.2xl'),
          fontWeight: theme('fontWeight.bold'),
          '&:hover': {
            color: theme('colors.blue.800')
          }
          // color: theme('colors.blue.200')
        },
        h2: {
          fontSize: theme('fontSize.xl')
        },
        h3: {
          fontSize: theme('fontSize.lg')
        },
        button: apply`border border-gray-500 rounded px-2 py-1`
      }
      // { body: apply`text-gray-100` }
    ),
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true
      },
      fontFamily: {
        // extend to explicitly set the font name as Open Sans or Lora, etc.
        open: 'Open Sans',
        lora: 'Lora'
      },
      colors: {
        gray: colors.trueGray,
        yellow: {
          custom: '#edf060'
        }
      },
      spacing: {
        128: '32rem', // TODO: figure out how to use spacing,
        144: '36rem'
      }
    }
  }
  // plugins: {
  // 	// https://twind.dev/handbook/plugins.html#plugin-as-alias
  // 	forms,
  // 	'forms-input': formInput,
  // 	btn: apply`py-2 px-4 text-gray-700 font-semibold rounded-lg shadow-md hover:text-gray-400 focus:(outline-none ring(2 gray-300 opacity-75))`,
  // 	postTitle: apply`text-2xl text-red-800 font-bold`,
  // 	'a-hover': apply`hover:text-pink-500`,
  // 	...typography({
  // 		className: 'my-prose' // Defaults to 'prose', => TODO (for rendered markdown...)
  // 	})
  // }
})
