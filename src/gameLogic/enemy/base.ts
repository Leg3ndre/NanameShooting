import * as THREE from 'three';

export interface IEnemy {
  radius: number;
  velocity: number;

  tick(): void;
  getGraphics(): THREE.Mesh;
}

class EnemyBase implements IEnemy {
  radius = 40;
  velocity = 4;

  private material = new THREE.MeshLambertMaterial({ color: 0xe0e0e0 });
  private graphics;

  constructor() {
    this.graphics = this.buildGraphics();
  }

  tick() {
    this.graphics.position.x -= this.velocity;
  }

  getGraphics() {
    return this.graphics;
  }

  private buildGraphics() {
    const detail = 0;
    const geometry = new THREE.TetrahedronGeometry(this.radius, detail)
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(600, 0, 0);
    mesh.rotation.z = -Math.PI / 4;
    mesh.rotation.y = -Math.PI / 3;
    return mesh;
  }
}

export default EnemyBase;
