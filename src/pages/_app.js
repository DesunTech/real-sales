import { Provider } from "react-redux";
import Layout from "../common/layout";
import store from "../redux/store";
import "../styles/globals.css";
import { useEffect } from "react";
import Aos from "aos";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (window.innerWidth >= 940) {
      import("aos/dist/aos.css");
    }
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  );
}
