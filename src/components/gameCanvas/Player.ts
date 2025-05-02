import * as THREE from 'three';
import * as CONST from './Const'

const WIDTH = CONST.WIDTH;
const HEIGHT = CONST.HEIGHT;
const SIGHT_RANGE = CONST.SIGHT_RANGE;

class Player {
  VELOCITY = 8;

  material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  graphics;

  constructor() {
    this.graphics = this.buildGraphics();
  }

  tick(keysPressed: { [index: string]: boolean }) {
    // 上下 (z-direction)
    if (keysPressed['w'] || keysPressed['ArrowUp']) {
      this.graphics.position.z = Math.min(this.graphics.position.z + this.VELOCITY, HEIGHT);
    }
    if (keysPressed['s'] || keysPressed['ArrowDown']) {
      this.graphics.position.z = Math.max(this.graphics.position.z - this.VELOCITY, -HEIGHT);
    }
    // 左右 (y-direction)
    if (keysPressed['a'] || keysPressed['ArrowLeft']) {
      this.graphics.position.y = Math.min(this.graphics.position.y + this.VELOCITY, WIDTH);
    }
    if (keysPressed['d'] || keysPressed['ArrowRight']) {
      this.graphics.position.y = Math.max(this.graphics.position.y - this.VELOCITY, -WIDTH);
    }
    // 前後 (x-direction)
    if (keysPressed['e'] || keysPressed['z']) {
      this.graphics.position.x = Math.min(this.graphics.position.x + this.VELOCITY, SIGHT_RANGE);
    }
    if (keysPressed['x'] || keysPressed['Shift']) {
      this.graphics.position.x = Math.max(this.graphics.position.x - this.VELOCITY, -SIGHT_RANGE);
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

  buildWing() {
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

  buildBody() {
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
