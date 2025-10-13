import { useEffect, useRef } from 'react';
import styles from './index.module.css';

type Props = {
  playerLife: number;
  score: number;
  setOnGame: (onGame: boolean) => void;
}

const GameOver = ({ playerLife, score, setOnGame }: Props) => {
    const elmRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (playerLife > 0) return;
    if (elmRef.current == null) return;

    setOnGame(false);
    elmRef.current.style.display = "block";
  }, [playerLife]);

  const tweetResult = () => {
    const tweetMessage = `[NanameShooting] 記録は${score}点でした！`;
    const currentUrl = location.href;
    const hashTags = 'NanameShooting,MaxenceStudio';
    window.open(`https://x.com/intent/post?text=${tweetMessage}&url=${currentUrl}&hashtags=${hashTags}`);
  }

  return (
    <div id="gameOver" className={styles.gameOver} ref={elmRef}>
      <div className={styles.gameOverHeader}>GAME OVER</div>
      <div className={styles.gameOverScore}>KILL SCORE: {score}</div>
      <button className={styles.tweetButton} onClick={tweetResult}>
        <span className={styles.twitterStr}>&#x1D54F;</span> でシェア
      </button>
    </div>
  );
}

export default GameOver;
