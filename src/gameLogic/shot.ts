import * as THREE from 'three';
import ShotGraphics from './graphics/shot';

class Shot {
  graphics;

  radius = 10;
  position;
  velocity;

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
