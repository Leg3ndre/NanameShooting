import * as THREE from 'three';

class Shot {
  radius = 10;
  position;
  velocity;

  private material;
  private graphics;

  constructor(position: THREE.Vector3, velocity: THREE.Vector3, color: number) {
    this.material = new THREE.MeshBasicMaterial({ color: color })
    this.graphics = this.buildGraphics();
    Object.assign(this.graphics.position, position.clone());

    this.position = this.graphics.position;
    this.velocity = velocity.clone();
  }

  tick(): void {
    this.position.add(this.velocity);
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

  isAttacking(objPosition: THREE.Vector3, objRadius: number): boolean {
    const radius = this.radius + objRadius;
    const diffVec = this.position.clone().sub(objPosition);
    return (Math.abs(diffVec.x) < radius && Math.abs(diffVec.y) < radius && Math.abs(diffVec.z) < radius);
  }

  dispose(): void {
    this.graphics.material.dispose();
    this.graphics.geometry.dispose();
  }
}

export default Shot;
