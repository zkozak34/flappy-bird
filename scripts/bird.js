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
  }

  checkIsLive(pipes) {
    const closePipe = pipes.filter((pipe) => pipe.x + pipe.diameter > this.x)[0];
    if (
      this.x + 34 > closePipe.x &&
      this.x + 34 < closePipe.x + closePipe.diameter &&
      (this.y < closePipe.top.y || this.y + 24 > closePipe.bottom.y)
    ) {
      this.isDead = true;
    }
  }

  draw(ctx, frameCount, assets) {
    if (frameCount % 15 === 0) this.assetsIndex++;
    this.assetsIndex = this.assetsIndex % 3;
    ctx.drawImage(assets[this.assetsIndex].img, this.x, this.y);
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
