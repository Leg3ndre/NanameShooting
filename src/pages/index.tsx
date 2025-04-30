import * as THREE from 'three';
import { useEffect, useState } from 'react';

const Home = () => {
  const width = 640;
  const height = 480;

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
      console.log('tick!');
      mesh.rotation.x += 0.1;
      mesh.rotation.y += 0.1;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }

    tick();
  }, []);

  return (
    <>
      <h1>Naname Shooting</h1>
      <canvas id="game" width="640" height="480"></canvas>
    </>
  );
}

export default Home;
