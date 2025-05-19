import * as THREE from 'three';
import * as CONST from '@/constants/game';
import Player from './player';
import EnemyManager from './enemyManager';
import Field from './field';

class GameScene extends THREE.Scene {
  private light = new THREE.HemisphereLight(0xffffff, 0x606060, 5.0);

  constructor() {
    super();
    this.add(this.light);
  }

  addObejects(field: Field, player: Player, enemies: EnemyManager): void {
    this.add(player.graphics);
    this.add(player.shotList.graphics);
    this.add(enemies.graphics);
    this.add(field.graphics);
  }

  changeDifficulty(player: Player, enemies: EnemyManager, difficulty: string): void {
    if (difficulty == CONST.DIFFICULTY_EASY) {
      this.add(player.shadowGraphics);
      this.add(enemies.shadowGraphics);
    } else {
      this.remove(player.shadowGraphics);
      this.remove(enemies.shadowGraphics);
    }
  }
}

export default GameScene;
