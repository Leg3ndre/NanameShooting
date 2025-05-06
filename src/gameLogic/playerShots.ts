import * as THREE from 'three';
import Shot from './shot';

class PlayerShots {
  graphics;
  list: Shot[] = [];
  velocity = 10;

  private SHOT_COLOR = 0xd0d000;

  constructor() {
    this.graphics = new THREE.Group;
  }

  tick(): void {
    for (const shot of this.list) {
      shot.tick();
    }
    this.removeDeadShot();
  }

  generate(playerPosition: THREE.Vector3): void {
    const newShot = new Shot(playerPosition, new THREE.Vector3(this.velocity, 0, 0), this.SHOT_COLOR);
    this.list.push(newShot);
    this.graphics.add(newShot.graphics);
  }

  isAttacking(position: THREE.Vector3, radius: number): boolean {
    for (const shot of this.list) {
      if (shot.isAttacking(position, radius)) return true;
    }
    return false;
  }

  private removeDeadShot() {
    for (const shot of this.list) {
      if (!shot.isAlive) {
        this.graphics.remove(shot.graphics);
        shot.dispose();
      }
    }
    this.list = this.list.filter((s) => s.isAlive);
  }
}

export default PlayerShots;
