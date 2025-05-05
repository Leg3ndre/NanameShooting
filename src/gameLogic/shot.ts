import * as THREE from 'three';
import { Position } from './type';

class Shot {
  radius = 10;
  position;
  // velocity;

  private color = 0xffffff;
  private material = new THREE.MeshBasicMaterial({ color: this.color });
  private graphics;

  constructor(position: Position) {
    this.position = position;
    this.graphics = this.buildGraphics();
  }

  tick(): void {
    // Object.assign(this.graphics.position, this.position);
    this.graphics.position.x = -40;
    this.graphics.position.y = 0;
    this.graphics.position.z = 0;
  }

  getGraphics(): THREE.Mesh {
    return this.graphics;
  }

  private buildGraphics() {
    const wSegments = 32;
    const hSegments = 15
    const geometry = new THREE.SphereGeometry(this.radius, wSegments, hSegments);
    const mesh = new THREE.Mesh(geometry, this.material);
    return mesh;
  }
}

export default Shot;
