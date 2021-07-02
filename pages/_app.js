import { Provider as ReduxProvider } from "react-redux";
import store from "../store";
import withTwindApp from "@twind/next/app";
import twindConfig from "../twind.config";

const App = ({ Component, pageProps }) => {
  return (
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  );
};

export default withTwindApp(twindConfig, App);
