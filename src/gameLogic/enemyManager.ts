import * as CONST from '@/constants/game'
import { IEnemy } from './enemy/base';
import EnemyBase from './enemy/base';

class EnemyManager {
  hasNewEnemy = false;

  readonly list: IEnemy[] = [];
  private count = 0;

  constructor() { }

  tick() {
    if (this.hasNewEnemy) this.hasNewEnemy = false;

    this.count++;
    if (this.count <= CONST.FPS * 30) {
      if (this.count % (CONST.FPS * 3) == 0) {
        this.generate();
      }
    } else if (this.count <= CONST.FPS * 60) {
      if (this.count % (CONST.FPS * 2) == 0) {
        this.generate();
      }
    } else {
      if (this.count % CONST.FPS == 0) {
        this.generate();
      }
    }

    for (let enemy of this.list) {
      enemy.tick();
    }
  }

  generate() {
    this.hasNewEnemy = true;
    const newEnemy = new EnemyBase;
    this.list.push(newEnemy);
    return newEnemy;
  }
}

export default EnemyManager;
