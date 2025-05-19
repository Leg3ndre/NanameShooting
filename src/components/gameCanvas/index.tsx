import * as THREE from 'three';
import * as CONST from '@/constants/game';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import GameDifficulty from '@/components/gameDifficulty';
import getKeysPressed from '@/hooks/keyboard';
import animate from '@/hooks/animate';
import Field from '@/gameLogic/field';
import Player from '@/gameLogic/player';
import EnemyManager from '@/gameLogic/enemyManager';
import GameCamera from '@/gameLogic/camera';

type Props = {
  width: number;
  height: number;
  setPlayerLife: (life: number) => void;
  setScore: (score: number) => void;
}

const GameCanvas = ({ width, height, setPlayerLife, setScore }: Props) => {
  const [difficulty, setDifficulty] = useState(CONST.DIFFICULTY_NORMAL);
  const scoreRef = useRef(0);
  const field = useRef(new Field);
  const player = useRef(new Player);
  const enemies = useRef(new EnemyManager);
  const keysPressed = getKeysPressed();

  const light = useRef(new THREE.HemisphereLight(0xffffff, 0x606060, 5.0));
  const scene = useRef(new THREE.Scene);
  scene.current.add(light.current);
  scene.current.add(field.current.graphics);
  scene.current.add(player.current.graphics);
  scene.current.add(player.current.shotList.graphics);
  scene.current.add(enemies.current.graphics);

  const camera = new GameCamera(width, height, difficulty);
  let renderer: THREE.WebGLRenderer | undefined;
  useEffect(() => {
    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('game')!
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
  });

  useEffect(() => {
    // 上下キーでスクロールが発生しないように
    document.body.addEventListener("keydown", (e) => e.preventDefault());
  }, []);

  const animateCallback = () => {
    if (renderer === undefined) {
      console.error("Cannot find renderer!!")
      return;
    }

    field.current.tick();
    player.current.tick(keysPressed, enemies.current.list, enemies.current.shotList);
    setPlayerLife(player.current.life);
    enemies.current.tick(player.current.shotList, player.current.position);
    setScore(scoreRef.current += enemies.current.countShotDown);
    renderer.render(scene.current, camera);
  };

  animate(animateCallback);

  return (
    <>
      <canvas id="game" width={width} height={height} className={styles.gameCanvas} />
      <GameDifficulty difficulty={difficulty} setDifficulty={setDifficulty} />
    </>
  );
}

export default GameCanvas;
