import * as THREE from 'three';
import * as CONST from '../constants/game'
import { IEnemy } from './enemy/base';

const WIDTH = CONST.WIDTH;
const HEIGHT = CONST.HEIGHT;
const SIGHT_RANGE = CONST.SIGHT_RANGE;

class Player {
  velocity = 8;
  position: { [index: string]: number };
  radius = 15;

  private material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  private materialAttacked = new THREE.LineBasicMaterial({ color: 0xffffff });
  private graphics;

  constructor() {
    this.position = {
      x: 0,
      y: 0,
      z: 0,
    };
    this.graphics = this.buildGraphics();
  }

  tick(
    keysPressed: { [index: string]: boolean },
    enemyList: IEnemy[],
  ): void {
    this.updatePosition(keysPressed);
    Object.assign(this.graphics.position, this.position);

    this.processCollision(enemyList);
  }

  private updatePosition(keysPressed: { [index: string]: boolean }) {
    // 上下 (z-direction)
    if (keysPressed['w'] || keysPressed['ArrowUp']) {
      this.position.z = Math.min(this.position.z + this.velocity, HEIGHT);
    }
    if (keysPressed['s'] || keysPressed['ArrowDown']) {
      this.position.z = Math.max(this.position.z - this.velocity, -HEIGHT);
    }
    // 左右 (y-direction)
    if (keysPressed['a'] || keysPressed['ArrowLeft']) {
      this.position.y = Math.min(this.position.y + this.velocity, WIDTH);
    }
    if (keysPressed['d'] || keysPressed['ArrowRight']) {
      this.position.y = Math.max(this.position.y - this.velocity, -WIDTH);
    }
    // 前後 (x-direction)
    if (keysPressed['e'] || keysPressed['z']) {
      this.position.x = Math.min(this.position.x + this.velocity, SIGHT_RANGE);
    }
    if (keysPressed['x'] || keysPressed['Shift']) {
      this.position.x = Math.max(this.position.x - this.velocity, -SIGHT_RANGE);
    }
  }

  private processCollision(enemyList: IEnemy[]) {
    for (let mesh of this.graphics.children) {
      (mesh as THREE.Line).material = this.material;
    }
    if (!this.detectCollistion(enemyList)) return;

    for (let mesh of this.graphics.children) {
      (mesh as THREE.Line).material = this.materialAttacked;
    }
  }

  detectCollistion(enemyList: IEnemy[]): boolean {
    for (const enemy of enemyList) {
      const radius = this.radius + enemy.radius;
      if (
        Math.abs(this.position.x - enemy.position.x) < radius
        && Math.abs(this.position.y - enemy.position.y) < radius
        && Math.abs(this.position.z - enemy.position.z) < radius
      ) {
        return true;
      }
    }
    return false;
  }

  getGraphics(): THREE.Group {
    return this.graphics;
  }

  private buildGraphics() {
    const group = new THREE.Group();
    group.add(this.buildWing());
    group.add(this.buildBody());
    return group;
  }

  private buildWing() {
    let geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(this.buildWingEdges());
    return new THREE.Line(geometry, this.material);
  }

  private buildWingEdges() {
    const r = 20;
    const z = 0;
    return [
      new THREE.Vector3(r * Math.cos(0.0), r * Math.sin(0.0), z),
      new THREE.Vector3(r * Math.cos(2 * Math.PI / 3), r * Math.sin(2 * Math.PI / 3), z),
      new THREE.Vector3(r * Math.cos(4 * Math.PI / 3), r * Math.sin(4 * Math.PI / 3), z),
      new THREE.Vector3(r * Math.cos(0.0), r * Math.sin(0.0), z),
    ];
  }

  private buildBody() {
    let geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(this.buildBodyEdges());
    return new THREE.Line(geometry, this.material);
  }

  private buildBodyEdges() {
    const r = 20;
    const y = 0;
    return [
      new THREE.Vector3(r * Math.cos(0.0), y, r * Math.sin(0.0)),
      new THREE.Vector3(r * Math.cos(2 * Math.PI / 3), y, 0.0),
      new THREE.Vector3(r * Math.cos(4 * Math.PI / 3), y, r * Math.sin(4 * Math.PI / 3)),
      new THREE.Vector3(r * Math.cos(0.0), y, r * Math.sin(0.0)),
    ];
  }
}

export default Player;
