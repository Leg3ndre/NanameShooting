import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import styles from './index.module.css';

type Props = {
  // setDifficulty: (difficulty: number) => void;
}

const GameDifficulty = ({  }: Props) => {
  return (
    <div className={styles.difficulty}>
      <label>
        <input type="radio" name="difficulty" />
        簡単モード（オブジェクトの影を表示）
      </label>
      <label>
        <input type="radio" name="difficulty" />
        普通モード
      </label>
      <label>
        <input type="radio" name="difficulty" />
        難関モード（遠近感をなくす）
      </label>
    </div>
  );
}

export default GameDifficulty;
