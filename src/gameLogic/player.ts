import * as THREE from 'three';
import * as CONST from '@/constants/game'
import { IEnemy } from './enemy/base';
import { Position } from './type';

const WIDTH = CONST.WIDTH;
const HEIGHT = CONST.HEIGHT;
const SIGHT_RANGE = CONST.SIGHT_RANGE;
const MAX_I_FRAME = 0.5 * CONST.FPS;

class Player {
  radius = 15;
  velocity = 8;
  position: Position;
  life = CONST.INITIAL_PLAYER_LIFE;
  private restIFrame = 0; // invincibility frame

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

    this.processDameged(enemyList);
    if (this.isInvincible()) this.restIFrame--;
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

  private processDameged(enemyList: IEnemy[]) {
    if (!this.isInvincible() && this.detectAttacked(enemyList)) {
      this.life--;
      this.restIFrame = MAX_I_FRAME;
    }

    for (let mesh of this.graphics.children) {
      if (this.isInvincible()) {
        (mesh as THREE.Line).material = this.materialAttacked;
      } else {
        (mesh as THREE.Line).material = this.material;
      }
    }
  }

  detectAttacked(enemyList: IEnemy[]): boolean {
    for (const enemy of enemyList) {
      if (enemy.attacks(this.position, this.radius)) return true;
    }
    return false;
  }

  private isInvincible() {
    return (this.restIFrame > 0);
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
