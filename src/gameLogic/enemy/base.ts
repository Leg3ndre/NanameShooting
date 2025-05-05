import * as THREE from 'three';
import * as CONST from '@/constants/game';

const MAX_X = CONST.SIGHT_RANGE;
const MIN_X = -CONST.SIGHT_RANGE;
const MAX_Y = CONST.WIDTH;
const MAX_Z = CONST.HEIGHT;

export interface IEnemy {
  radius: number;
  velocity: number;
  position: { [index: string]: number };
  isAlive: boolean;

  tick(): void;
  getGraphics(): THREE.Mesh;
  attacks(pPosition: { [index: string]: number }, pRadius: number): boolean;
  dispose(): void;
}

class EnemyBase implements IEnemy {
  radius = 40;
  velocity = 4;
  position;
  isAlive = true;

  private material = new THREE.MeshLambertMaterial({ color: 0xe0e0e0 });
  private graphics;

  constructor() {
    this.position = {
      x: MAX_X,
      y: (Math.random() * 2.0 - 1.0) * MAX_Y,
      z: (Math.random() * 2.0 - 1.0) * MAX_Z,
    }
    this.graphics = this.buildGraphics();
    Object.assign(this.graphics.position, this.position);
  }

  tick(): void {
    this.position.x -= this.velocity;
    Object.assign(this.graphics.position, this.position);

    if (this.position.x < MIN_X) this.isAlive = false;
  }

  getGraphics(): THREE.Mesh {
    return this.graphics;
  }

  private buildGraphics() {
    const detail = 0;
    const geometry = new THREE.TetrahedronGeometry(this.radius, detail)
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.rotation.z = -Math.PI / 4;
    mesh.rotation.y = -Math.PI / 3;
    return mesh;
  }

  attacks(pPosition: { [index: string]: number }, pRadius: number): boolean {
    const radius = this.radius + pRadius;
    if (
      Math.abs(this.position.x - pPosition.x) < radius
      && Math.abs(this.position.y - pPosition.y) < radius
      && Math.abs(this.position.z - pPosition.z) < radius
    ) {
      return true;
    }
    return false;
  }

  dispose(): void {
    this.graphics.material.dispose();
    this.graphics.geometry.dispose();
  }
}

export default EnemyBase;
