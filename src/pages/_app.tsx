import { AppProps } from 'next/app';
import Modal from 'react-modal';
import { Provider } from 'react-redux';

import store from '../redux/store';
import '../styles/App.css';
import '../styles/index.css';

Modal.setAppElement('#__next');

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
