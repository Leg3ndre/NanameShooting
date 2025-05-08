import * as THREE from 'three';
import * as CONST from '@/constants/game';
import EnemyBase from './base';
import Shot from '../shot';

class EnemyGreen extends EnemyBase {
  constructor() {
    super(0x00e000);
    this.SHOT_COLOR = 0xd0ffd0;
    this.SHOOT_INTERVAL = CONST.FPS / 12;
    this.SHOOT_SPEED = 1.0;
  }

  protected buildNewShot() {
    const theta = this.count * 0.01;
    let shotVelocity = new THREE.Vector3(
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
