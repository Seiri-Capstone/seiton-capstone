import { Provider as ReduxProvider } from 'react-redux'
import store from '../store'
import '../styles/global.css'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { ThemeProvider } from 'next-themes'
import '@fontsource/ibm-plex-serif'
import '@fontsource/ibm-plex-serif/500.css'
import Layout from '../components/Layout'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <ReduxProvider store={store}>
        <NextAuthProvider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextAuthProvider>
      </ReduxProvider>
    </ThemeProvider>
  )
}

export default App
