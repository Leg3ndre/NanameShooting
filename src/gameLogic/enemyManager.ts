import * as THREE from 'three';
import * as CONST from '@/constants/game'
import { IEnemy } from './enemy/base';
import EnemyBase from './enemy/base';
import Shot from './shot';
import PlayerShots from './playerShots';
import EnemyRed from './enemy/red';
import EnemyBlue from './enemy/blue';
import EnemyGreen from './enemy/green';

class EnemyManager {
  graphics;
  list: IEnemy[] = [];
  shotList: Shot[] = [];
  countShotDown = 0;

  private count = 0;

  constructor() {
    this.graphics = this.buildGraphics();
  }

  tick(playerShots: PlayerShots): void {
    this.count++;

    if (this.canGenerate()) this.generate();

    for (let enemy of this.list) {
      enemy.tick(playerShots);
      const newShot: Shot | null = enemy.shoot();
      if (newShot != null) {
        this.shotList.push(newShot);
        this.graphics.add(newShot.graphics);
      }
    }
    this.removeDeadEnemies();

    for (const shot of this.shotList) {
      shot.tick();
    }
    this.removeDeadShot();
  }

  private generate() {
    let newEnemy;
    const rand = Math.random() * 30000;
    if (rand % 3 == 0) {
      newEnemy = new EnemyRed;
    } else if (rand % 3 == 1) {
      newEnemy = new EnemyBlue;
    } else {
      newEnemy = new EnemyGreen;
    }
    this.list.push(newEnemy);
    this.graphics.add(newEnemy.graphics);
  }

  private canGenerate() {
    // spawn table
    if (this.count <= CONST.FPS * 30) {
      return (this.count % (CONST.FPS * 3) == 0);
    } else if (this.count <= CONST.FPS * 60) {
      return (this.count % (CONST.FPS * 2) == 0);
    } else if (this.count <= CONST.FPS * 120) {
      return (this.count % CONST.FPS == 0);
    } else {
      return (this.count % (CONST.FPS / 2) == 0);
    }
  }

  private removeDeadEnemies() {
    this.countShotDown = this.list.filter((e) => !e.isAlive && e.isShotDown).length;

    for (const enemy of this.list) {
      if (!enemy.isAlive) {
        this.graphics.remove(enemy.graphics);
        enemy.dispose();
      }
    }
    this.list = this.list.filter((e) => e.isAlive);
  }

  private removeDeadShot() {
    for (const shot of this.shotList) {
      if (!shot.isAlive) {
        this.graphics.remove(shot.graphics);
        shot.dispose();
      }
    }
    this.shotList = this.shotList.filter((s) => s.isAlive);
  }

  private buildGraphics() {
    return new THREE.Group;
  }
}

export default EnemyManager;
