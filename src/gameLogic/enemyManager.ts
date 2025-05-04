import { IEnemy } from "./enemy/base";
import EnemyBase from "./enemy/base";

class EnemyManager {
  list: IEnemy[] = [];

  constructor() { }

  tick() {
    for (let enemy of this.list) {
      enemy.tick();
    }
  }

  generate() {
    this.list.push(new EnemyBase);
  }
}

export default EnemyManager;
