import * as THREE from 'three';
import * as CONST from '@/constants/game';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import GameDifficulty from '@/components/gameDifficulty';
import useKeyboardEffect from '@/hooks/keyboard';
import useAnimateEffect from '@/hooks/animate';
import Field from '@/gameLogic/field';
import Player from '@/gameLogic/player';
import EnemyManager from '@/gameLogic/enemyManager';
import GameCamera from '@/gameLogic/camera';
import GameScene from '@/gameLogic/scene';
import GameOver from '../gameOver';

type Props = {
  width: number;
  height: number;
  setPlayerLife: (life: number) => void;
  setScore: (score: number) => void;
}

const GameCanvas = ({ width, height, setPlayerLife, setScore }: Props) => {
  const [difficulty, setDifficulty] = useState(CONST.DIFFICULTY_NORMAL);
  const [actualFps, setActualFps] = useState(0.0);
  const scoreRef = useRef(0);
  const field = useRef(new Field);
  const player = useRef(new Player);
  const enemies = useRef(new EnemyManager);
  const keysPressed = useKeyboardEffect();

  const scene = useRef(new GameScene);
  scene.current.addObejects(field.current, player.current, enemies.current);

  const camera = useRef(new GameCamera(width, height, difficulty));
  const renderer = useRef<THREE.WebGLRenderer | undefined>(undefined);

  useEffect(() => {
    renderer.current = new THREE.WebGLRenderer({
      canvas: document.getElementById('game')!
    });
    renderer.current.setPixelRatio(window.devicePixelRatio);
    renderer.current.setSize(width, height);
  }, []);

  useEffect(() => {
    // 上下キーでスクロールが発生しないように
    document.body.addEventListener("keydown", (e) => e.preventDefault());
  }, []);

  useEffect(() => {
    scene.current.changeDifficulty(player.current, enemies.current, difficulty);
  }, [difficulty]);

  useEffect(() => {
    camera.current = new GameCamera(width, height, difficulty);
  }, [difficulty]);

  const animateCallback = () => {
    if (renderer.current === undefined) {
      console.error("Cannot find renderer!!")
      return;
    }

    field.current.tick();
    player.current.tick(keysPressed, enemies.current.list, enemies.current.shotList);
    setPlayerLife(player.current.life);
    enemies.current.tick(player.current.shotList, player.current.position);
    setScore(scoreRef.current += enemies.current.countShotDown);

    renderer.current.render(scene.current, camera.current);
  };

  useAnimateEffect(animateCallback, setActualFps);

  return (
    <>
      <div>
        <canvas id="game" width={width} height={height} className={styles.gameCanvas} />
        <GameOver />
      </div>
      <GameDifficulty difficulty={difficulty} setDifficulty={setDifficulty} />
      <span className={styles.fps}>{actualFps}</span>
    </>
  );
}

export default GameCanvas;
