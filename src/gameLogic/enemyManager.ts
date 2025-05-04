import { IEnemy } from "./enemy/base";
import EnemyBase from "./enemy/base";

class EnemyManager {
  readonly list: IEnemy[] = [];

  constructor() { }

  tick() {
    for (let enemy of this.list) {
      enemy.tick();
    }
  }

  generate() {
    const newEnemy = new EnemyBase;
    this.list.push(newEnemy);
    return newEnemy;
  }
}

export default EnemyManager;
