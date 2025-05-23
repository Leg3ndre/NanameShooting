import * as THREE from 'three';
import * as CONST from '@/constants/game';
import { IEnemy } from './enemy/base';
import Shot from './shot';
import PlayerGraphics from './graphics/player';
import PlayerShots from './playerShots';

const WIDTH = CONST.WIDTH;
const HEIGHT = CONST.HEIGHT;
const SIGHT_RANGE = CONST.SIGHT_RANGE;
const MAX_I_FRAME = 0.5 * CONST.FPS;

class Player {
  graphics;
  shadowGraphics;

  radius = 15;
  velocity = 480 / CONST.FPS;
  position: THREE.Vector3;
  life = CONST.INITIAL_PLAYER_LIFE;
  shotList = new PlayerShots;

  private SHOOT_PER_SEC = 3;
  private restSFrame = 0; // shooting frame
  private restIFrame = 0; // invincibility frame
  private builder;

  constructor() {
    this.builder = new PlayerGraphics;
    this.graphics = this.builder.buildGraphics();
    this.shadowGraphics = this.builder.buildShadow();
    this.position = this.graphics.position;
  }

  tick(
    keysPressed: { [index: string]: boolean },
    enemyList: IEnemy[],
    enemyShotList: Shot[],
  ): void {
    this.updatePosition(keysPressed);

    this.shoot(keysPressed);
    this.shotList.tick();

    this.processDameged(enemyList, enemyShotList);
    if (this.isInvincible()) this.restIFrame--;
  }

  private updatePosition(keysPressed: { [index: string]: boolean }) {
    const position = this.position;
    // 上下 (z-direction)
    if (keysPressed['w'] || keysPressed['ArrowUp']) position.z += this.velocity;
    if (keysPressed['s'] || keysPressed['ArrowDown']) position.z -= this.velocity;
    // 左右 (y-direction)
    if (keysPressed['a'] || keysPressed['ArrowLeft']) position.y += this.velocity;
    if (keysPressed['d'] || keysPressed['ArrowRight']) position.y -= this.velocity;
    // 前後 (x-direction)
    if (keysPressed['e'] || keysPressed['x']) position.x += this.velocity;
    if (keysPressed['q'] || keysPressed['z']) position.x -= this.velocity;

    this.regularizePosition();

    this.shadowGraphics.position.x = position.x;
    this.shadowGraphics.position.y = position.y;
    this.shadowGraphics.position.z = -HEIGHT;
  }

  private regularizePosition() {
    this.position.x = Math.max(Math.min(this.position.x, SIGHT_RANGE), -SIGHT_RANGE);
    this.position.y = Math.max(Math.min(this.position.y, WIDTH), -WIDTH);
    this.position.z = Math.max(Math.min(this.position.z, HEIGHT), -HEIGHT);
  }

  private shoot(keysPressed: { [index: string]: boolean }) {
    if (this.restSFrame > 0) {
      this.restSFrame -= 1;
      return;
    }

    if (keysPressed[' '] || keysPressed['Enter']) {
      this.shotList.generate(this.position);
      this.restSFrame = CONST.FPS / this.SHOOT_PER_SEC;
    }
  }

  private processDameged(enemyList: IEnemy[], enemyShotList: Shot[]) {
    if (!this.isInvincible() && this.detectAttacked(enemyList, enemyShotList)) {
      this.life--;
      this.restIFrame = MAX_I_FRAME;
    }

    if (this.isInvincible()) {
      this.builder.colorAttacked();
    } else {
      this.builder.colorNormal();
    }
  }

  private detectAttacked(enemyList: IEnemy[], enemyShotList: Shot[]) {
    for (const enemy of enemyList) {
      if (enemy.isAttacking(this.position, this.radius)) return true;
    }
    for (const shot of enemyShotList) {
      if (shot.isAttacking(this.position, this.radius)) return true;
    }
    return false;
  }

  private isInvincible() {
    return (this.restIFrame > 0);
  }
}

export default Player;
