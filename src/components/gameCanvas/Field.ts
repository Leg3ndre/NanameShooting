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

export default fieldLineEdges;
