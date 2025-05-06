import * as THREE from 'three';
import * as CONST from '@/constants/game'

class PlayerGraphics {
  private material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  private materialAttacked = new THREE.LineBasicMaterial({ color: 0xffffff });
  private group = new THREE.Group();

  buildGraphics() {
    this.group.add(this.buildWing());
    this.group.add(this.buildBody());
    return this.group;
  }

  private buildWing() {
    let geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(this.buildWingEdges());
    return new THREE.Line(geometry, this.material);
  }

  private buildWingEdges() {
    const r = 20;
    const z = 0;
    return [
      new THREE.Vector3(r * Math.cos(0.0), r * Math.sin(0.0), z),
      new THREE.Vector3(r * Math.cos(2 * Math.PI / 3), r * Math.sin(2 * Math.PI / 3), z),
      new THREE.Vector3(r * Math.cos(4 * Math.PI / 3), r * Math.sin(4 * Math.PI / 3), z),
      new THREE.Vector3(r * Math.cos(0.0), r * Math.sin(0.0), z),
    ];
  }

  private buildBody() {
    let geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(this.buildBodyEdges());
    return new THREE.Line(geometry, this.material);
  }

  private buildBodyEdges() {
    const r = 20;
    const y = 0;
    return [
      new THREE.Vector3(r * Math.cos(0.0), y, r * Math.sin(0.0)),
      new THREE.Vector3(r * Math.cos(2 * Math.PI / 3), y, 0.0),
      new THREE.Vector3(r * Math.cos(4 * Math.PI / 3), y, r * Math.sin(4 * Math.PI / 3)),
      new THREE.Vector3(r * Math.cos(0.0), y, r * Math.sin(0.0)),
    ];
  }

  colorNormal(): void {
    for (let mesh of this.group.children) {
      (mesh as THREE.Line).material = this.material;
    }
  }

  colorAttacked(): void {
    for (let mesh of this.group.children) {
      (mesh as THREE.Line).material = this.materialAttacked;
    }
  }
}

export default PlayerGraphics;
