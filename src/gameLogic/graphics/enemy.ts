import * as THREE from 'three';

class EnemyGraphics {
  private material;
  private group;

  constructor(color: number) {
    this.material = new THREE.MeshLambertMaterial({ color: color });
    this.group = new THREE.Group;
  }

  buildGraphics(radius: number): THREE.Group {
    const detail = 0;
    const geometry = new THREE.TetrahedronGeometry(radius, detail)
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.rotation.z = -Math.PI / 4;
    mesh.rotation.y = -Math.PI / 3;

    this.group.add(mesh);
    return this.group;
  }

  doDeadAction(): void {
    const deadActionSpeed = 0.4;
    this.group.rotation.x += deadActionSpeed;
    this.group.rotation.z += deadActionSpeed;
  }

  dispose(): void {
    for (let mesh of this.group.children) {
      ((mesh as THREE.Mesh).material as THREE.MeshBasicMaterial).dispose();
      (mesh as THREE.Mesh).geometry.dispose();
    }
  }
}

export default EnemyGraphics;
