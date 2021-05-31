import React from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { Layout } from '../components/layout/Layout';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { getUser } from '../redux/user/userActions';

function MyApp({ Component, pageProps }: any) {
  React.useEffect(() => {
    store.dispatch(getUser());
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
