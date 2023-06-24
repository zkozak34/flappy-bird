class Bird {
  constructor(x = 100, y = 200) {
    this.x = x;
    this.y = y;

    this.score = 0;
    this.gravity = 0;
    this.velocity = 0.1;
    this.jump = -3;
    this.isDead = false;

    this.assetsIndex = 0;
    this.assets = {
      birdDownFlap: {
        path: "../assets/Objects/yellowbird-downflap.png",
        width: 34,
        height: 24,
      },
      birdMidFlap: {
        path: "../assets/Objects/yellowbird-midflap.png",
        width: 34,
        height: 24,
      },
      birdUpFlap: {
        path: "../assets/Objects/yellowbird-upflap.png",
        width: 34,
        height: 24,
      },
    };
  }

  checkIsLive(pipes) {
    const closePipe = pipes.filter((pipe) => pipe.x + pipe.diameter > this.x)[0];
    if (
      this.x + 34 > closePipe.x &&
      this.x + 34 < closePipe.x + closePipe.diameter &&
      (this.y < closePipe.top.y || this.y > closePipe.bottom.y)
    ) {
      this.isDead = true;
    }
  }

  draw(ctx, frameCount) {
    if (frameCount % 15 === 0) this.assetsIndex++;
    this.assetsIndex = this.assetsIndex % 3;
    const birdPNG = new Image();
    birdPNG.src = Object.values(this.assets)[this.assetsIndex].path;
    ctx.drawImage(birdPNG, this.x, this.y);
  }

  update(pipes) {
    this.y += this.gravity;
    this.gravity += this.velocity;
    this.gravity = Math.min(3, this.gravity);
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.gravity = this.jump;
      }
    });
    this.checkIsLive(pipes);
  }
}

export default Bird;
