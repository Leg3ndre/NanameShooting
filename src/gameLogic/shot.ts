import * as THREE from 'three';
import * as CONST from '@/constants/game';
import ShotGraphics from './graphics/shot';

const MAX_X = CONST.SIGHT_RANGE;
const MIN_X = -CONST.SIGHT_RANGE;
const MAX_Y = CONST.WIDTH * 1.2;
const MIN_Y = -CONST.WIDTH * 1.2;
const MAX_Z = CONST.HEIGHT * 1.2;
const MIN_Z = -CONST.HEIGHT * 1.2;

class Shot {
  graphics;

  radius = 10;
  position;
  velocity;
  isAlive = true;

  private builder;

  constructor(position: THREE.Vector3, velocity: THREE.Vector3, color: number) {
    this.builder = new ShotGraphics(color, this.radius);
    this.graphics = this.builder.buildGraphics();
    Object.assign(this.graphics.position, position.clone());

    this.position = this.graphics.position;
    this.velocity = velocity.clone();
  }

  tick(): void {
    this.position.add(this.velocity);

    if (this.position.x > MAX_X) this.isAlive = false;
    if (this.position.x < MIN_X) this.isAlive = false;
    if (this.position.y > MAX_Y) this.isAlive = false;
    if (this.position.y < MIN_Y) this.isAlive = false;
    if (this.position.z > MAX_Z) this.isAlive = false;
    if (this.position.z < MIN_Z) this.isAlive = false;
  }

  isAttacking(objPosition: THREE.Vector3, objRadius: number): boolean {
    const radius = this.radius + objRadius;
    const diffVec = this.position.clone().sub(objPosition);
    return (Math.abs(diffVec.x) < radius && Math.abs(diffVec.y) < radius && Math.abs(diffVec.z) < radius);
  }

  dispose(): void {
    this.builder.dispose();
  }
}

export default Shot;
