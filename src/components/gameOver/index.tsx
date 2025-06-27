import { useEffect } from 'react';
import styles from './index.module.css';
import { shadow } from 'three/tsl';

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

  return (
    <div id="gameOver" className={styles.gameOver}>
      <div className={styles.gameOverHeader}>GAME OVER</div>
      <div className={styles.gameOverScore}>KILL SCORE: {score}</div>
    </div>
  );
}

export default GameOver;
