import * as THREE from 'three';

class Field {
  WIDTH = 400;
  HEIGHT = 400;
  SIGHT_RANGE = 800;
  MESH_SIZE = 40;
  VELOCITY = 3;

  count = 0;
  material = new THREE.LineBasicMaterial({ color: 0xffffff });
  sLines;
  wLines;

  constructor() {
    this.sLines = this.buildSLines();
    this.wLines = this.buildWLines();
  }

  tick() {
    this.count += this.VELOCITY;

    for (let [i, line] of this.wLines.entries()) {
      line.geometry.setFromPoints(this.buildWLineEdges(i));
    }
  }

  getLines() {
    return this.sLines.concat(this.wLines);
  }

  private buildSLines() {
    let lines = [];
    for (let i = 0; i <= 2 * this.WIDTH / this.MESH_SIZE; ++i) {
      let geometry = new THREE.BufferGeometry();
      geometry.setFromPoints(this.buildSLineEdges(i));
      lines.push(new THREE.Line(geometry, this.material));
    }
    return lines;
  }

  private buildWLines() {
    let lines = [];
    for (let i = 0; i <= 2 * this.SIGHT_RANGE / this.MESH_SIZE; ++i) {
      let geometry = new THREE.BufferGeometry();
      geometry.setFromPoints(this.buildWLineEdges(i));
      lines.push(new THREE.Line(geometry, this.material));
    }
    return lines;
  }

  private buildSLineEdges(i: number) {
    const y = this.MESH_SIZE * i - this.WIDTH;
    const z = -this.HEIGHT;
    return [
      new THREE.Vector3(-this.SIGHT_RANGE, y, z),
      new THREE.Vector3(this.SIGHT_RANGE, y, z),
    ];
  }

  private buildWLineEdges(i: number) {
    const x = this.MESH_SIZE * i - this.SIGHT_RANGE;
    const diffX = this.count % this.MESH_SIZE;
    const z = -this.HEIGHT;
    return [
      new THREE.Vector3(x - diffX, -this.WIDTH, z),
      new THREE.Vector3(x - diffX, this.WIDTH, z),
    ];
  }
}

export default Field;
