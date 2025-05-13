import * as THREE from 'three';
import { useEffect } from 'react';
import styles from './index.module.css';
import Keyboard from '../ui/keyboard';
import animate from '@/gameLogic/animate';
import Field from '@/gameLogic/field';
import Player from '@/gameLogic/player';
import EnemyManager from '@/gameLogic/enemyManager';

type Props = {
  width: number;
  height: number;
  setPlayerLife: Function;
  setScore: Function;
}

const GameCanvas = ({ width, height, setPlayerLife, setScore }: Props) => {
  let score = 0;
  let keysPressed: { [index: string]: boolean } = {};
  const field = new Field;
  const player = new Player;
  const enemies = new EnemyManager;

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('game')!
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const camera = new THREE.PerspectiveCamera(60, width / height);
    camera.position.set(0, -800, 800);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const light = new THREE.HemisphereLight(0xffffff, 0x606060, 5.0);

    const scene = new THREE.Scene();
    scene.add(light);
    scene.add(field.graphics);
    scene.add(player.graphics);
    scene.add(player.shotList.graphics);
    scene.add(enemies.graphics);

    animate(() => {
      field.tick();
      player.tick(keysPressed, enemies.list, enemies.shotList);
      setPlayerLife(player.life);
      enemies.tick(player.shotList, player.position);
      setScore(score += enemies.countShotDown);
      renderer.render(scene, camera);
    });
  }, []);

  return (
    <>
      <Keyboard keysPressed={keysPressed} />
      <canvas id="game" width={width} height={height} className={styles.gameCanvas} />
    </>
  );
}

export default GameCanvas;
