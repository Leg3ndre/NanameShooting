import * as THREE from 'three';
import { useEffect } from 'react';
import styles from './index.module.css'

type Props = {
  width: number;
  height: number;
}

const GameCanvas = ({ width, height }: Props) => {
  const FPS = 60;
  let prevTime = 0;

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('game')!
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const scene = new THREE.Scene();
    const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const tick = () => {
      const currentTime = Date.now();

      if (currentTime - prevTime > 1000.0 / FPS) {
        console.log('tick!', currentTime - prevTime);

        prevTime = currentTime;
        mesh.rotation.x += 0.1;
        mesh.rotation.y += 0.1;
        renderer.render(scene, camera);
      }

      requestAnimationFrame(tick);
    }

    tick();
  }, []);

  return (
    <canvas id="game" width={width} height={height} className={styles.gameCanvas} />
  );
}

export default GameCanvas;
