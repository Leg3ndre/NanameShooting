import * as THREE from 'three';
import { useEffect } from 'react';
import animate from './Animate';
import fieldLines from './Field';
import styles from './index.module.css';

type Props = {
  width: number;
  height: number;
}

const GameCanvas = ({ width, height }: Props) => {
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
    const lines = fieldLines();
    for (let line of lines) {
      scene.add(line);
    }

    animate(() => {
      renderer.render(scene, camera);
    });
  }, []);

  return (
    <canvas id="game" width={width} height={height} className={styles.gameCanvas} />
  );
}

export default GameCanvas;
