import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/global.css';


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Naname Shooting</title>
        <link rel="icon" href="./favicon.ico" />
        <meta property="og:title" content="NanameShooting" />
        <meta property="og:description" content="大丈夫。MaxenceStudioのゲームだよ。固定視点の3Dシューティングゲームです。" />
        <meta property="og:image" content="https://leg3ndre.github.io/games/naname/ogp/thumbnail.png" />
        <meta property="og:image:width" content="807" />
        <meta property="og:image:height" content="707" />
        <meta property="og:url" content="https://leg3ndre.github.io/games/naname" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NanameShooting" />
        <meta name="twitter:description" content="大丈夫。MaxenceStudioのゲームだよ。固定視点の3Dシューティングゲームです。" />
        <meta name="twitter:image" content="https://leg3ndre.github.io/games/naname/ogp/thumbnail.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
