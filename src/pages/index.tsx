import GameCanvas from '@/components/gameCanvas';
import styles from './index.module.css';
import { useState } from 'react';
import * as CONST from '@/constants/game';

const Home = () => {
  const [playerLife, setPlayerLine] = useState(CONST.INITIAL_PLAYER_LIFE);

  return (
    <>
      <h1>Naname Shooting</h1>
      <div className={styles.scores}>
        <span id="pl-score" className={styles.pl_score}>PLAYER'S LIFE: {playerLife}</span>
        <span id="en-score" className={styles.en_score}>ENEMY'S LIFE: 5</span>
      </div>
      <GameCanvas width={CONST.CANVAS_W} height={CONST.CANVAS_H} playerLife={setPlayerLine} />
    </>
  );
}

export default Home;
