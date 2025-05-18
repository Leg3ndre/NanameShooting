import * as THREE from 'three';
import * as CONST from '@/constants/game';
import EnemyBase from './base';
import PlayerShots from '@/gameLogic/playerShots';
import Shot from '@/gameLogic/shot';

class EnemyRed extends EnemyBase {
  constructor() {
    super(0xf04040);
    this.SHOT_COLOR = 0xffd0d0;
    this.SHOOT_PER_SEC = 5;
    // this.SHOOT_SPEED = 240.0 / CONST.FPS;
  }

  tick(playerShots: PlayerShots, playerPosition: THREE.Vector3): void {
    this.updateVelocity(playerPosition);
    super.tick(playerShots);
  }

  private updateVelocity(playerPosition: THREE.Vector3) {
    const scale = 0.5 / CONST.FPS;
    this.velocity.y = -scale * (this.position.y - playerPosition.y);
    this.velocity.z = -scale * (this.position.z - playerPosition.z);
  }

  protected buildNewShot(playerPosition: THREE.Vector3) {
    const shotVelocity = new THREE.Vector3;
    shotVelocity.x = -Math.abs(this.position.x - playerPosition.x);
    shotVelocity.y = -(this.position.y - playerPosition.y);
    shotVelocity.z = -(this.position.z - playerPosition.z);
    shotVelocity.normalize().multiplyScalar(this.SHOOT_SPEED);
    return new Shot(this.position, shotVelocity, this.SHOT_COLOR);
  }
}

export default EnemyRed;
