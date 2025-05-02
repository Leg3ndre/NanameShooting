import * as THREE from 'three';
import { useEffect } from 'react';
import animate from './Animate';
import Field from './Field';
import styles from './index.module.css';
import Player from './Player';

type Props = {
  width: number;
  height: number;
}

const GameCanvas = ({ width, height }: Props) => {
  const field = new Field;
  const player = new Player;

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('game')!
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, -800, 800);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const scene = new THREE.Scene();
    scene.add(field.getGraphics());
    scene.add(player.getGraphics());

    animate(() => {
      field.tick();
      renderer.render(scene, camera);
    });
  }, []);

  return (
    <canvas id="game" width={width} height={height} className={styles.gameCanvas} />
  );
}

export default GameCanvas;
