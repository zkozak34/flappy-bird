class Pipe {
  constructor(x = 0, y = 0, diameter = 52, space = 50) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.space = space;
    this.minPipeHeight = 75;

    this.assets = {
      pipeTop: {
        path: "../assets/Objects/pipe-top.png",
        width: 52,
        height: 320,
      },
      pipeBottom: {
        path: "../assets/Objects/pipe-bottom.png",
        width: 52,
        height: 320,
      },
    };

    this.top = {
      y: this.minPipeHeight + Math.floor(Math.random() * 150),
    };
    this.bottom = {
      y: this.top.y + this.space * 2,
    };
  }

  draw(ctx) {
    const imgTop = new Image();
    imgTop.src = this.assets.pipeTop.path;
    ctx.drawImage(imgTop, this.x, -this.assets.pipeTop.height + this.top.y);

    const imgBottom = new Image();
    imgBottom.src = this.assets.pipeBottom.path;
    ctx.drawImage(imgBottom, this.x, this.bottom.y);
  }

  update() {
    this.x--;
  }
}

export default Pipe;
