import EnemyBase from './base';
import PlayerShots from '../playerShots';

class EnemyBlue extends EnemyBase {
  constructor() {
    super(0x5050f0);
    this.SHOT_COLOR = 0xc0d0ff;
  }

  tick(playerShots: PlayerShots): void {
    this.randomizeVelocity();
    super.tick(playerShots);
  }

  private randomizeVelocity() {
    const amplitude = 4 + 6 * Math.random();
    const posiOrNega = 1 - 2 * Math.floor(Math.random() * 2);
    const theta = (this.count * 0.1 + Math.random()) * posiOrNega;
    this.velocity.y = amplitude * Math.cos(theta);
    this.velocity.z = amplitude * Math.sin(theta);
  }
}

export default EnemyBlue;
