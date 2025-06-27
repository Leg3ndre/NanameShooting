import { useEffect } from 'react';
import styles from './index.module.css';

type Props = {
  playerLife: number;
  score: number;
}

const GameOver = ({ playerLife, score }: Props) => {
  useEffect(() => {
    if (playerLife > 0) return;

    const elm = document.getElementById('gameOver')!;
    elm.style.display = "block";
  }, [playerLife]);

  const tweetResult = () => {
    window.open('https://x.com/intent/post?text=おはよお！');
  }

  return (
    <div id="gameOver" className={styles.gameOver}>
      <div className={styles.gameOverHeader}>GAME OVER</div>
      <div className={styles.gameOverScore}>KILL SCORE: {score}</div>
      <button className={styles.tweetButton} onClick={tweetResult}>
        <span className={styles.twitterStr}>&#x1D54F;</span> でシェア
      </button>
    </div>
  );
}

export default GameOver;
