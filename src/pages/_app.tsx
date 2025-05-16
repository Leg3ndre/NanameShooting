import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/global.css';


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Naname Shooting</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
