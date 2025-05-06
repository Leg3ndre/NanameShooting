import FieldGraphics from './graphics/field';

class Field {
  private VELOCITY = 3;

  graphics;

  private count = 0;
  private builder;

  constructor() {
    this.builder = new FieldGraphics;
    this.graphics = this.builder.buildGraphics();
  }

  tick() {
    this.count += this.VELOCITY;
    this.builder.moveWLines(this.count);
  }
}

export default Field;
