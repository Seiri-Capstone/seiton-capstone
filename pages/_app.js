import { Provider as ReduxProvider } from 'react-redux'
import store from '../store'
import '../styles/global.css'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { ThemeProvider } from 'next-themes'
import '@fontsource/ibm-plex-serif'
import '@fontsource/ibm-plex-serif/500.css'
import '@fontsource/lato' // base font
import '@fontsource/work-sans' // logo style 1
import '@fontsource/tenor-sans' // logo style 2
import '@fontsource/cantarell' // logo style 3

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <ReduxProvider store={store}>
        <NextAuthProvider session={pageProps.session}>
          <Component {...pageProps} />
        </NextAuthProvider>
      </ReduxProvider>
    </ThemeProvider>
  )
}

export default App
