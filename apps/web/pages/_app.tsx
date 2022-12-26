import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Make Lyrics Covers About Your Fav Songs | Stative</title>
      </Head>
      <main id="application">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
