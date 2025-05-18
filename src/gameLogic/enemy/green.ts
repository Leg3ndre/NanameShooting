import * as THREE from 'three';
import * as CONST from '@/constants/game';
import EnemyBase from './base';
import Shot from '../shot';

class EnemyGreen extends EnemyBase {
  constructor() {
    super(0x00e000);
    this.SHOT_COLOR = 0xd0ffd0;
    this.SHOOT_PER_SEC = 15;
    this.SHOOT_SPEED = 60.0 / CONST.FPS;
  }

  protected buildNewShot() {
    const theta = this.count * 0.6 / CONST.FPS;
    const shotVelocity = new THREE.Vector3(
      -0.5,
      Math.sin(theta * 5) * Math.cos(theta),
      Math.sin(theta * 5) * Math.sin(theta),
    );
    shotVelocity.normalize().multiplyScalar(this.SHOOT_SPEED);
    shotVelocity.add(this.velocity);
    return new Shot(this.position, shotVelocity, this.SHOT_COLOR);
  }
}

export default EnemyGreen;
