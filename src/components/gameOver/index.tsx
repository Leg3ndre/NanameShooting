import styles from './index.module.css';

const GameOver = () => {
  return (
    <div id="gameOver" className={styles.gameOver}>
      <div className={styles.gameOverHeader}>GAME OVER</div>
      <div className={styles.gameOverScore}>KILL SCORE: 0</div>
    </div>
  );
}

export default GameOver;
