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
    for (let i = 0; i <= 2 * this.SIGHT_RANGE / this.MESH_SIZE; ++i) {
      this.wLines[i].geometry.setFromPoints([
        new THREE.Vector3(this.MESH_SIZE * i - this.SIGHT_RANGE - this.count, -this.WIDTH, -this.HEIGHT),
        new THREE.Vector3(this.MESH_SIZE * i - this.SIGHT_RANGE - this.count, this.WIDTH, -this.HEIGHT),
      ]);
    }
  }

  getLines() {
    return this.sLines.concat(this.wLines);
  }

  private buildSLines() {
    let lines = [];
    for (let i = 0; i <= 2 * this.WIDTH / this.MESH_SIZE; ++i) {
      let geometry = new THREE.BufferGeometry();
      geometry.setFromPoints([
        new THREE.Vector3(-this.SIGHT_RANGE, this.MESH_SIZE * i - this.WIDTH, -this.HEIGHT),
        new THREE.Vector3(this.SIGHT_RANGE, this.MESH_SIZE * i - this.WIDTH, -this.HEIGHT),
      ]);
      lines.push(new THREE.Line(geometry, this.material));
    }
    return lines;
  }

  private buildWLines() {
    let lines = [];
    for (let i = 0; i <= 2 * this.SIGHT_RANGE / this.MESH_SIZE; ++i) {
      let geometry = new THREE.BufferGeometry();
      geometry.setFromPoints([
        new THREE.Vector3(this.MESH_SIZE * i - this.SIGHT_RANGE, -this.WIDTH, -this.HEIGHT),
        new THREE.Vector3(this.MESH_SIZE * i - this.SIGHT_RANGE, this.WIDTH, -this.HEIGHT),
      ]);
      lines.push(new THREE.Line(geometry, this.material));
    }
    return lines;
  }
}

export default Field;
