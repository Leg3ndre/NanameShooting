import * as THREE from 'three';
import * as CONST from '@/constants/game';
import Player from './player';
import EnemyManager from './enemyManager';

class GameScene extends THREE.Scene {
  constructor(player: Player, enemies: EnemyManager, difficulty: string) {
    super();
    this.add(player.graphics);
    this.add(player.shotList.graphics);
    this.add(enemies.graphics);
    if (difficulty == CONST.DIFFICULTY_EASY) {
      this.add(player.shadowGraphics);
    }
  }
}

export default GameScene;
