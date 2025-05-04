import * as THREE from 'three';
import * as CONST from '../constants/game'

const WIDTH = CONST.WIDTH;
const HEIGHT = CONST.HEIGHT;
const SIGHT_RANGE = CONST.SIGHT_RANGE;

class Player {
  velocity = 8;
  position: { [index: string]: number };

  private material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  private graphics;

  constructor() {
    this.position = {
      x: 0,
      y: 0,
      z: 0,
    };
    this.graphics = this.buildGraphics();
  }

  tick(keysPressed: { [index: string]: boolean }) {
    this.updatePosition(keysPressed);
    Object.assign(this.graphics.position, this.position);
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

  getGraphics() {
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
