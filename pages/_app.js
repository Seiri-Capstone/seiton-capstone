import { Provider as ReduxProvider } from 'react-redux'
import store from '../store'
import withTwindApp from '@twind/next/app'
import twindConfig from '../twind.config'
import { Provider as NextAuthProvider } from 'next-auth/client'

const App = ({ Component, pageProps }) => {
  return (
    <ReduxProvider store={store}>
      <NextAuthProvider session={pageProps.session}>
        <Component {...pageProps} />
      </NextAuthProvider>
    </ReduxProvider>
  )
}

export default withTwindApp(twindConfig, App)
