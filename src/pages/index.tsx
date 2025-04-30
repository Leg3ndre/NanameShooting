import * as THREE from 'three';
import { useEffect } from 'react';

const Home = () => {
  const width = 640;
  const height = 480;

  let canvas;
  useEffect(() => {
    if (canvas) return;
    canvas = document.getElementById('game')!;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, -800, 800);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const scene = new THREE.Scene();
    const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.render(scene, camera);
  }, []);

  return (
    <>
      <h1>Naname Shooting</h1>
      <canvas id="game" width="640" height="480"></canvas>
    </>
  );
}

export default Home;
