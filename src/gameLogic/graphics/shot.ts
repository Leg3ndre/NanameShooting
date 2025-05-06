import * as THREE from 'three';

class ShotGraphics {
  private material;
  private geometry;
  private wSegments = 32;
  private hSegments = 15;

  constructor(color: number, radius: number) {
    this.material = new THREE.MeshBasicMaterial({ color: color });
    this.geometry = new THREE.SphereGeometry(radius, this.wSegments, this.hSegments);
  }

  buildGraphics(): THREE.Mesh {
    return new THREE.Mesh(this.geometry, this.material);
  }

  dispose(): void {
    this.material.dispose();
    this.geometry.dispose();
  }
}

export default ShotGraphics;
