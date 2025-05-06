import * as THREE from 'three';
import * as CONST from '@/constants/game'
import { IEnemy } from './enemy/base';
import EnemyBase from './enemy/base';
import Shot from './shot';

class EnemyManager {
  graphics;
  list: IEnemy[] = [];
  shotList: Shot[] = [];

  private count = 0;

  constructor() {
    this.graphics = this.buildGraphics();
  }

  tick(playerShots: Shot[]): void {
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
    const newEnemy = new EnemyBase;
    this.list.push(newEnemy);
    this.graphics.add(newEnemy.graphics);
  }

  private removeDeadEnemies() {
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
