import * as THREE from 'three';

const fieldLineEdges = () => {
  const WIDTH = 400;
  const HEIGHT = 400;
  const SIGHT_RANGE = 800;
  const MESH_SIZE = 40;

  const edges = [];
  for (let i = 0; i <= 2 * WIDTH / MESH_SIZE; ++i) {
    edges.push([
      [-SIGHT_RANGE, MESH_SIZE * i - WIDTH, -HEIGHT],
      [SIGHT_RANGE, MESH_SIZE * i - WIDTH, -HEIGHT]
    ]);
  }
  for (let i = 0; i <= 2 * SIGHT_RANGE / MESH_SIZE; ++i) {
    edges.push([
      [MESH_SIZE * i - SIGHT_RANGE, -WIDTH, -HEIGHT],
      [MESH_SIZE * i - SIGHT_RANGE, WIDTH, -HEIGHT]
    ])
  }
  return edges;
}

const fieldLines = () => {
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const edges = fieldLineEdges();
  return edges.map((edge) => {
    let geometry = new THREE.BufferGeometry();
    geometry.setFromPoints([
      new THREE.Vector3(edge[0][0], edge[0][1], edge[0][2]),
      new THREE.Vector3(edge[1][0], edge[1][1], edge[1][2]),
    ]);
    return new THREE.Line(geometry, material);
  });
}

export default fieldLines;
