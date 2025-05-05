import * as THREE from 'three';
import * as CONST from '@/constants/game';
import { Position, Velocity } from '@/gameLogic/type';
import Shot from '../shot';

const MAX_X = CONST.SIGHT_RANGE;
const MIN_X = -CONST.SIGHT_RANGE;
const MAX_Y = CONST.WIDTH;
const MAX_Z = CONST.HEIGHT;

export interface IEnemy {
  radius: number;
  velocity: Velocity;
  position: Position;
  isAlive: boolean;

  tick(): void;
  getGraphics(): THREE.Group;
  isAttacking(pPosition: Position, pRadius: number): boolean;
  dispose(): void;
}

class EnemyBase implements IEnemy {
  radius = 40;
  position;
  velocity;
  isAlive = true;

  private SHOOT_INTERVAL = CONST.FPS / 4;

  private count = 0;
  private shotList: Shot[] = [];
  private material = new THREE.MeshLambertMaterial({ color: 0xe0e0e0 });
  private graphics;

  constructor() {
    this.position = {
      x: MAX_X,
      y: (Math.random() * 2.0 - 1.0) * MAX_Y,
      z: (Math.random() * 2.0 - 1.0) * MAX_Z,
    };
    this.velocity = {
      x: -4,
      y: 0,
      z: 0,
    };
    this.graphics = this.buildGraphics();
    Object.assign(this.graphics.position, this.position);
  }

  tick(): void {
    this.count++;
    this.shoot();
    for (const shot of this.shotList) {
      shot.tick();
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
    Object.assign(this.graphics.position, this.position);

    if (this.position.x < MIN_X) this.isAlive = false;
  }

  getGraphics(): THREE.Group {
    return this.graphics;
  }

  private buildGraphics() {
    const detail = 0;
    const geometry = new THREE.TetrahedronGeometry(this.radius, detail)
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.rotation.z = -Math.PI / 4;
    mesh.rotation.y = -Math.PI / 3;

    const group = new THREE.Group;
    group.add(mesh);
    return group;
  }

  private shoot(): void {
    if (this.count % this.SHOOT_INTERVAL != 0) return;

    const newShot = new Shot(this.position);
    this.shotList.push(newShot);
    this.graphics.add(newShot.getGraphics());
  }

  isAttacking(pPosition: Position, pRadius: number): boolean {
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
    for (let mesh of this.graphics.children) {
      ((mesh as THREE.Mesh).material as THREE.MeshBasicMaterial).dispose();
      (mesh as THREE.Mesh).geometry.dispose();
    }
  }
}

export default EnemyBase;
