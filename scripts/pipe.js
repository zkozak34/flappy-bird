class Pipe {
  constructor(x = 0, y = 0, diameter = 52, space = 50) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.space = space;
    this.minPipeHeight = 75;

    this.top = {
      y: this.minPipeHeight + Math.floor(Math.random() * 150),
    };
    this.bottom = {
      y: this.top.y + this.space * 2,
    };
  }

  draw(ctx, { top, bottom }) {
    ctx.drawImage(top.img, this.x, -top.height + this.top.y);
    ctx.drawImage(bottom.img, this.x, this.bottom.y);
  }

  update() {
    this.x--;
  }
}

export default Pipe;
