import * as THREE from 'three';

class EnemyGraphics {
  private material;
  private group;
  private shadowColor = 0x909090;

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
  
  buildShadow(radius: number): THREE.Group {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints([
      new THREE.Vector3(radius * Math.cos(1 * Math.PI / 3), radius * Math.sin(1 * Math.PI / 3), 0),
      new THREE.Vector3(radius * Math.cos(3 * Math.PI / 3), radius * Math.sin(3 * Math.PI / 3), 0),
      new THREE.Vector3(radius * Math.cos(5 * Math.PI / 3), radius * Math.sin(5 * Math.PI / 3), 0),
    ]);
    const shadowMaterial = new THREE.LineBasicMaterial({ color: this.shadowColor });

    const shadow = new THREE.Group();
    shadow.add(new THREE.Mesh(geometry, shadowMaterial));
    return shadow;
  }

  dispose(): void {
    for (const mesh of this.group.children) {
      ((mesh as THREE.Mesh).material as THREE.MeshBasicMaterial).dispose();
      (mesh as THREE.Mesh).geometry.dispose();
    }
  }
}

export default EnemyGraphics;
