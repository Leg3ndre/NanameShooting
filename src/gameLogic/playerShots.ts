import * as THREE from 'three';
import Shot from './shot';

class PlayerShots {
  graphics;
  list: Shot[] = [];

  constructor() {
    this.graphics = new THREE.Group;
  }

  tick(): void {
    for (const shot of this.list) {
      shot.tick();
    }
    this.removeDeadShot();
  }

  add(shot: Shot): void {
    this.list.push(shot);
    this.graphics.add(shot.graphics);
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
