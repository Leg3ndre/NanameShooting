import * as THREE from 'three';
import * as CONST from '@/constants/game';

const WIDTH = CONST.WIDTH;
const HEIGHT = CONST.HEIGHT;
const SIGHT_RANGE = CONST.SIGHT_RANGE;
const MESH_SIZE = 50;

class FieldGraphics {
  private material = new THREE.LineBasicMaterial({ color: 0xc0d0e0 });
  private sLines;
  private wLines;

  constructor() {
    this.sLines = this.buildSLines();
    this.wLines = this.buildWLines();
  }

  buildGraphics() {
    const group = new THREE.Group();
    for (const line of this.wLines) {
      group.add(line);
    }
    for (const line of this.sLines) {
      group.add(line);
    }
    return group;
  }

  private buildSLines() {
    const lines = [];
    for (let i = 0; i <= 2 * WIDTH / MESH_SIZE; ++i) {
      const geometry = new THREE.BufferGeometry();
      geometry.setFromPoints(this.buildSLineEdges(i));
      lines.push(new THREE.Line(geometry, this.material));
    }
    return lines;
  }

  private buildWLines() {
    const lines = [];
    for (let i = 0; i <= 2 * SIGHT_RANGE / MESH_SIZE; ++i) {
      const geometry = new THREE.BufferGeometry();
      geometry.setFromPoints(this.buildWLineEdges(i));
      lines.push(new THREE.Line(geometry, this.material));
    }
    return lines;
  }

  private buildSLineEdges(i: number) {
    const y = MESH_SIZE * i - WIDTH;
    const z = -HEIGHT;
    return [
      new THREE.Vector3(-SIGHT_RANGE, y, z),
      new THREE.Vector3(SIGHT_RANGE, y, z),
    ];
  }

  private buildWLineEdges(i: number, count: number = 0) {
    const x = MESH_SIZE * i - SIGHT_RANGE;
    const diffX = (count * (60 / CONST.FPS)) % MESH_SIZE;
    const z = -HEIGHT;
    return [
      new THREE.Vector3(x - diffX, -WIDTH, z),
      new THREE.Vector3(x - diffX, WIDTH, z),
    ];
  }

  moveWLines(count: number): void {
    for (const [i, line] of this.wLines.entries()) {
      line.geometry.setFromPoints(this.buildWLineEdges(i, count));
    }
  }
}

export default FieldGraphics;
