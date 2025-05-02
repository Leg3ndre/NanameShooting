import * as THREE from 'three';
import { useEffect } from 'react';
import animate from './Animate';
import Field from './Field';
import styles from './index.module.css';
import Player from './Player';
import Keyboard from './keyboard';

type Props = {
  width: number;
  height: number;
}

const GameCanvas = ({ width, height }: Props) => {
  const field = new Field;
  const player = new Player;
  let keysPressed: { [index: string]: boolean } = {};

  useEffect(() => {
    const renderer = buildRenderer(document.getElementById('game')!);
    const camera = buildCamera();

    const scene = new THREE.Scene();
    scene.add(field.getGraphics());
    scene.add(player.getGraphics());

    animate(() => {
      field.tick();
      player.tick();
      renderer.render(scene, camera);
    });
  }, []);

  const buildCamera = () => {
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, -800, 800);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
  }

  const buildRenderer = (canvasDom: HTMLElement) => {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasDom
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    return renderer;
  }

  return (
    <>
      <Keyboard keysPressed={keysPressed} />
      <canvas id="game" width={width} height={height} className={styles.gameCanvas} />
    </>
  );
}

export default GameCanvas;
