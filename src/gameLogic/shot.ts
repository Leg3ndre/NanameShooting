import * as THREE from 'three';

class Shot {
  radius = 10;
  relPosition; // relative to parent
  velocity;

  private VELOCITY_INTENSITY = 4.0;

  private color = 0xffffff;
  private material = new THREE.MeshBasicMaterial({ color: this.color });
  private graphics;

  constructor() {
    this.relPosition = new THREE.Vector3(0, 0, 0);
    this.velocity = (new THREE.Vector3).randomDirection().multiplyScalar(this.VELOCITY_INTENSITY);
    this.velocity.x = -Math.abs(this.velocity.x);
    this.graphics = this.buildGraphics();
  }

  tick(): void {
    this.relPosition.add(this.velocity);
    Object.assign(this.graphics.position, this.relPosition);
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

  isAttacking(parentPosition: THREE.Vector3, objPosition: THREE.Vector3, objRadius: number): boolean {
    const radius = this.radius + objRadius;
    const ownPosition = parentPosition.clone().add(this.relPosition);
    const diffVec = ownPosition.sub(objPosition);
    return (Math.abs(diffVec.x) < radius && Math.abs(diffVec.y) < radius && Math.abs(diffVec.z) < radius);
  }
}

export default Shot;
