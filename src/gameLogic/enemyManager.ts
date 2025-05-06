import * as THREE from 'three';
import * as CONST from '@/constants/game'
import { IEnemy } from './enemy/base';
import EnemyBase from './enemy/base';

class EnemyManager {
  list: IEnemy[] = [];
  graphics;

  private count = 0;

  constructor() {
    this.graphics = this.buildGraphics();
  }

  tick(): void {
    this.count++;
    // spawn table
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
      if (enemy.hasNewShot && enemy.shotList.length > 0) {
        this.graphics.add(enemy.shotList.at(-1)!.getGraphics());
      }
    }
    this.removeDeadEnemies();
  }

  private generate() {
    const newEnemy = new EnemyBase;
    this.list.push(newEnemy);
    this.graphics.add(newEnemy.graphics);
  }

  private removeDeadEnemies() {
    for (const enemy of this.list) {
      if (!enemy.isAlive) {
        this.graphics.remove(enemy.graphics);
        for (const shot of enemy.shotList) {
          this.graphics.remove(shot.getGraphics());
        }
        enemy.dispose();
      }
    }
    this.list = this.list.filter((e) => e.isAlive);
  }

  private buildGraphics() {
    return new THREE.Group;
  }
}

export default EnemyManager;
