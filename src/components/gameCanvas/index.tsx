import * as THREE from 'three';
import { useEffect } from 'react';
import animate from './Animate';
import Field from './Field';
import styles from './index.module.css';
import Player from './Player';
import Keyboard from './keyboard';
import EnemyBase from './Enemy/Base';

type Props = {
  width: number;
  height: number;
}

const GameCanvas = ({ width, height }: Props) => {
  let keysPressed: { [index: string]: boolean } = {};
  const field = new Field;
  const player = new Player;
  const enemy = new EnemyBase;

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
    scene.add(field.getGraphics());
    scene.add(enemy.getGraphics());
    scene.add(player.getGraphics());

    animate(() => {
      field.tick();
      player.tick(keysPressed);
      enemy.tick();
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
