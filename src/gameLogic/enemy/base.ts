import * as THREE from 'three';
import * as CONST from '@/constants/game';
import Shot from '@/gameLogic/shot';
import EnemyGraphics from '@/gameLogic/graphics/enemy';

const MAX_X = CONST.SIGHT_RANGE;
const MIN_X = -CONST.SIGHT_RANGE * 2;
const MAX_Y = CONST.WIDTH;
const MAX_Z = CONST.HEIGHT;

export interface IEnemy {
  graphics: THREE.Group;
  radius: number;
  velocity: THREE.Vector3;
  position: THREE.Vector3;
  isAlive: boolean;
  hasNewShot: boolean;
  shotList: Shot[];

  tick(): void;
  isAttacking(pPosition: THREE.Vector3, pRadius: number): boolean;
  dispose(): void;
}

class EnemyBase implements IEnemy {
  graphics;

  radius = 40;
  position;
  velocity;
  isAlive = true;
  hasNewShot = false;
  shotList: Shot[] = [];

  private SHOT_COLOR = 0xe0e0e0;
  private SHOOT_INTERVAL = CONST.FPS / 6;
  private SHOOT_SPEED = 4.0;

  private count = 0;
  private builder;

  constructor() {
    this.builder = new EnemyGraphics;
    this.graphics = this.builder.buildGraphics(this.radius);
    Object.assign(this.graphics.position, new THREE.Vector3(
      MAX_X,
      (Math.random() * 2.0 - 1.0) * MAX_Y,
      (Math.random() * 2.0 - 1.0) * MAX_Z,
    ));

    this.position = this.graphics.position;
    this.velocity = new THREE.Vector3(-4, 0, 0);
  }

  tick(): void {
    this.count++;

    this.shoot();
    for (const shot of this.shotList) {
      shot.tick();
    }

    this.position.add(this.velocity);
    if (this.position.x < MIN_X) this.isAlive = false;
  }

  private shoot() {
    this.hasNewShot = false;
    if (this.count % this.SHOOT_INTERVAL != 0) return;

    const newShot = this.buildNewShot();
    this.shotList.push(newShot);
    this.graphics.add(newShot.graphics);
    this.hasNewShot = true;
  }

  private buildNewShot() {
    let shotVelocity = new THREE.Vector3;
    shotVelocity.randomDirection().multiplyScalar(this.SHOOT_SPEED);
    shotVelocity.x = -Math.abs(shotVelocity.x);
    shotVelocity.add(this.velocity);
    return new Shot(this.position, shotVelocity, this.SHOT_COLOR);
  }

  isAttacking(pPosition: THREE.Vector3, pRadius: number): boolean {
    const radius = this.radius + pRadius;
    const diffVec = this.position.clone().sub(pPosition);
    if (Math.abs(diffVec.x) < radius && Math.abs(diffVec.y) < radius && Math.abs(diffVec.z) < radius){
      return true;
    }

    for (const shot of this.shotList) {
      if (shot.isAttacking(pPosition, pRadius)) return true;
    }
    return false;
  }

  dispose(): void {
    this.builder.dispose();
    for (let shot of this.shotList) {
      shot.dispose();
    }
  }
}

export default EnemyBase;
