import styles from './index.module.css';
import { useState } from 'react';
import * as CONST from '@/constants/game';
import GameDesc from '@/components/gameDesc';
import GameCanvas from '@/components/gameCanvas';
import BgmAudio from '@/components/bgmAudio';

const Home = () => {
  const [playerLife, setPlayerLine] = useState(CONST.INITIAL_PLAYER_LIFE);
  const [score, setScore] = useState(0);

  return (
    <>
      <h1>Naname Shooting</h1>
      <div className={styles.scores}>
        <span id="pl-score" className={styles.pl_score}>PLAYER&apos;S LIFE: {playerLife}</span>
        <span id="en-score" className={styles.en_score}>KILL SCORE: {score}</span>
      </div>
      <GameCanvas
        width={CONST.CANVAS_W}
        height={CONST.CANVAS_H}
        setPlayerLife={setPlayerLine}
        setScore={setScore}
      />
      <BgmAudio />
      <GameDesc />
    </>
  );
}

export default Home;
