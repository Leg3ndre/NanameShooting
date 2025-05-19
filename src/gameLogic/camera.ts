import * as THREE from 'three';
import * as CONST from '@/constants/game';

class GameCamera extends THREE.PerspectiveCamera{
  constructor(width: number, height: number, difficulty: string) {
    super(60, width / height);
    this.position.set(0, -800, 800);
    this.lookAt(new THREE.Vector3(0, 0, 0));
    if (difficulty != CONST.DIFFICULTY_HARD) return;

    this.fov = 10;
    this.far = 10000;
    this.updateProjectionMatrix();
    this.position.set(0, -5000, 5000);
  }
}

export default GameCamera;
