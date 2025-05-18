import * as THREE from 'three';
import * as CONST from '@/constants/game';
import Shot from '@/gameLogic/shot';
import EnemyGraphics from '@/gameLogic/graphics/enemy';
import PlayerShots from '@/gameLogic/playerShots';

const MAX_X = CONST.SIGHT_RANGE;
const MIN_X = -CONST.SIGHT_RANGE * 1.5;
const MAX_Y = CONST.WIDTH;
const MAX_Z = CONST.HEIGHT;
const PERIOD_BEFORE_DEAD = CONST.FPS / 2;

export interface IEnemy {
  graphics: THREE.Group;
  radius: number;
  velocity: THREE.Vector3;
  position: THREE.Vector3;
  isAlive: boolean;
  isShotDown: boolean;

  tick(playerShots: PlayerShots, playerPosition?: THREE.Vector3): void;
  shoot(playerPosition?: THREE.Vector3): Shot | null;
  isAttacking(pPosition: THREE.Vector3, pRadius: number): boolean;
  dispose(): void;
}

class EnemyBase implements IEnemy {
  graphics;

  radius = 40;
  position;
  velocity;
  isAlive = true;
  isShotDown = false;

  protected SHOT_COLOR = 0xe0e0e0;
  protected SHOOT_PER_SEC = 10;
  protected SHOOT_SPEED = 240.0 / CONST.FPS;

  protected count = 0;
  protected countBeforeDead = 0;
  protected builder;

  constructor(color = 0xe0e0e0) {
    this.builder = new EnemyGraphics(color);
    this.graphics = this.builder.buildGraphics(this.radius);
    Object.assign(this.graphics.position, new THREE.Vector3(
      MAX_X,
      (Math.random() * 2.0 - 1.0) * MAX_Y,
      (Math.random() * 2.0 - 1.0) * MAX_Z,
    ));

    this.position = this.graphics.position;
    this.velocity = new THREE.Vector3(-3.0, 0, 0).multiplyScalar(60.0 / CONST.FPS);
  }

  tick(playerShots: PlayerShots, _playerPosition?: THREE.Vector3): void {
    if (this.isShotDown) return this.tickBeforeDead();

    this.count++;

    this.position.add(this.velocity);
    if (this.position.x < MIN_X) this.isAlive = false;

    if (playerShots.isAttacking(this.position, this.radius)) {
      this.isShotDown = true;
    }
  }

  tickBeforeDead(): void {
    this.countBeforeDead++;

    const deadActionSpeed = 60.0 / CONST.FPS;
    this.position.x += deadActionSpeed;
    this.position.z -= deadActionSpeed * this.countBeforeDead;
    this.builder.doDeadAction();

    if (this.countBeforeDead >= PERIOD_BEFORE_DEAD) this.isAlive = false;
  }

  shoot(playerPosition?: THREE.Vector3): Shot | null {
    if (!this.isAlive || this.isShotDown) return null;
    if ((this.count * this.SHOOT_PER_SEC) % CONST.FPS != 0) return null;

    return this.buildNewShot(playerPosition);
  }

  protected buildNewShot(_playerPosition?: THREE.Vector3) {
    const shotVelocity = new THREE.Vector3;
    shotVelocity.randomDirection().multiplyScalar(this.SHOOT_SPEED);
    shotVelocity.x = -Math.abs(shotVelocity.x);
    shotVelocity.add(this.velocity);
    return new Shot(this.position, shotVelocity, this.SHOT_COLOR);
  }

  isAttacking(pPosition: THREE.Vector3, pRadius: number): boolean {
    if (!this.isAlive) return false;

    const radius = this.radius + pRadius;
    const diffVec = this.position.clone().sub(pPosition);
    return (Math.abs(diffVec.x) < radius && Math.abs(diffVec.y) < radius && Math.abs(diffVec.z) < radius);
  }

  dispose(): void {
    this.builder.dispose();
  }
}

export default EnemyBase;
