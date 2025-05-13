import EnemyBase from './base';

class EnemyRed extends EnemyBase {
  constructor() {
    super(0xf04040);
    this.SHOT_COLOR = 0xffd0d0;
  }
}

export default EnemyRed;
