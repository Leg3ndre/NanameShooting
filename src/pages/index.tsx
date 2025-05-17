import GameCanvas from '@/components/gameCanvas';
import styles from './index.module.css';
import { useState } from 'react';
import * as CONST from '@/constants/game';

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
      <div className={styles.desc}>
        <p className={styles.abstract}>
          固定視点の3Dシューティングゲームです。
          プレイヤーから見て右上にカメラが固定されているため、上移動と右移動の区別は遠近感でがんばってください。
        </p>
        <ul className={styles.playManual}>
          <li>画面右から次々現れる敵を倒し、スコアを稼いでください</li>
          <li>プレイヤーが操作する自機は赤い紙飛行機です。敵に弾を当てると倒すことができます</li>
          <li>敵の弾が自機に当たるとライフが減ります</li>
          <li>※ 現状では自機のライフが0になってもゲームは終了しません</li>
          <li>操作方法</li>
            <ul>
              <li>↑ or W: 上へ移動</li>
              <li>↓ or S: 下へ移動</li>
              <li>← or A: 左へ移動</li>
              <li>→ or D: 右へ移動</li>
              <li>X or E: 前へ移動</li>
              <li>Z or Q: 後ろへ移動</li>
              <li>Space or Enter: 弾を発射</li>
            </ul>
        </ul>
      </div>
    </>
  );
}

export default Home;
