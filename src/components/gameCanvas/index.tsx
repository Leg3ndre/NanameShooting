import * as THREE from 'three';
import { useEffect } from 'react';
import animate from './Animate';
import fieldLineEdges from './Field';
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
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const edges = fieldLineEdges();
    for (let edge of edges) {
      let geometry = new THREE.BufferGeometry();
      geometry.setFromPoints([
        new THREE.Vector3(edge[0][0], edge[0][1], edge[0][2]),
        new THREE.Vector3(edge[1][0], edge[1][1], edge[1][2]),
      ]);
      scene.add(new THREE.Line(geometry, material));
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
