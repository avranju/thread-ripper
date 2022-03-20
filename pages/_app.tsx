import '../styles/global.css';
import type { AppProps } from 'next/app';

function ThreadRipperApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default ThreadRipperApp;
