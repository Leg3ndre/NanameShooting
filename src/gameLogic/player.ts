import * as THREE from 'three';
import * as CONST from '@/constants/game'
import { IEnemy } from './enemy/base';
import Shot from './shot';
import PlayerGraphics from './graphics/player';

const WIDTH = CONST.WIDTH;
const HEIGHT = CONST.HEIGHT;
const SIGHT_RANGE = CONST.SIGHT_RANGE;
const MAX_I_FRAME = 0.5 * CONST.FPS;

class Player {
  graphics;

  radius = 15;
  velocity = 8;
  position: THREE.Vector3;
  life = CONST.INITIAL_PLAYER_LIFE;
  hasNewShot = false;
  shotList: Shot[] = [];

  private SHOT_COLOR = 0xd0d000;
  private SHOOT_INTERVAL = CONST.FPS / 4;
  private restSFrame = 0; // shooting frame
  private restIFrame = 0; // invincibility frame
  private builder;

  constructor() {
    this.builder = new PlayerGraphics;
    this.graphics = this.builder.buildGraphics();
    this.position = this.graphics.position;
  }

  tick(
    keysPressed: { [index: string]: boolean },
    enemyList: IEnemy[],
  ): void {
    this.updatePosition(keysPressed);

    this.shoot(keysPressed);
    for (const shot of this.shotList) {
      shot.tick();
    }

    this.processDameged(enemyList);
    if (this.isInvincible()) this.restIFrame--;
  }

  private updatePosition(keysPressed: { [index: string]: boolean }) {
    let position = this.position;
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
  }

  private regularizePosition() {
    this.position.x = Math.max(Math.min(this.position.x, SIGHT_RANGE), -SIGHT_RANGE);
    this.position.y = Math.max(Math.min(this.position.y, WIDTH), -WIDTH);
    this.position.z = Math.max(Math.min(this.position.z, HEIGHT), -HEIGHT);
  }

  private shoot(keysPressed: { [index: string]: boolean }) {
    this.hasNewShot = false;

    if (this.restSFrame > 0) {
      this.restSFrame--;
      return;
    }

    if (keysPressed[' '] || keysPressed['Enter']) {
      const newShot = new Shot(this.position, new THREE.Vector3(10, 0, 0), this.SHOT_COLOR);
      this.shotList.push(newShot);

      this.hasNewShot = true;
      this.restSFrame = this.SHOOT_INTERVAL;
    }
  }

  private processDameged(enemyList: IEnemy[]) {
    if (!this.isInvincible() && this.detectAttacked(enemyList)) {
      this.life--;
      this.restIFrame = MAX_I_FRAME;
    }

    if (this.isInvincible()) {
      this.builder.colorAttacked();
    } else {
      this.builder.colorNormal();
    }
  }

  detectAttacked(enemyList: IEnemy[]): boolean {
    for (const enemy of enemyList) {
      if (enemy.isAttacking(this.position, this.radius)) return true;
    }
    return false;
  }

  private isInvincible() {
    return (this.restIFrame > 0);
  }

  hasDeadShot(): boolean {
    return (this.shotList.length > 0 && !this.shotList[0].isAlive);
  }

  removeDeadShot(): void {
    if (!this.hasDeadShot()) return;

    const deadShot = this.shotList.shift();
    deadShot!.dispose();
  }
}

export default Player;
