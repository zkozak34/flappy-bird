import Bird from "./bird.js";
import Pipe from "./pipe.js";

class Game {
  constructor() {
    this.canvas = document.querySelector("#flappy");
    this.ctx = this.canvas.getContext("2d");
    this.width = 800;
    this.height = 512;

    this.FPS = 60;
    this.frameCount = 0;
    this.score = 0;

    this.assets = {
      background: {
        path: "../assets/Objects/background-day.png",
        width: 288,
        height: 512,
      },
      base: {
        path: "../assets/../assets/Objects/base.png",
        width: 336,
        height: 112,
      },
    };

    this.pipes = [new Pipe(this.width)];
    this.birds = [new Bird()];
  }

  drawPlayground(source, y = 0) {
    for (let x = 0; x < Math.ceil(this.width / source.width); x++) {
      const img = new Image();
      img.src = source.path;
      this.ctx.drawImage(img, x * source.width, y);
    }
  }

  draw() {
    this.drawPlayground(this.assets.background);
    this.pipes.forEach((pipe) => pipe.draw(this.ctx));
    this.birds.forEach((bird) => bird.draw(this.ctx, this.frameCount));
    this.drawPlayground(this.assets.base, this.canvas.height - this.assets.base.height);
  }

  update() {
    this.frameCount++;
    if (this.frameCount % 240 === 0) {
      this.pipes.push(new Pipe(this.width));
    }
    this.pipes.forEach((pipe) => pipe.update());
    this.birds.forEach((bird, index) => {
      bird.update(this.pipes);
      if (bird.isDead) this.birds.splice(index, 1);
    });
    if (!this.birds.length) {
      this.restart();
    }
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    this.draw();
    this.update();
  }

  restart() {
    this.score = 0;
    this.frameCount = 0;
    this.pipes = [new Pipe(this.width)];
    this.birds = [new Bird()];
  }

  start() {
    this.loop();
  }
}

export default Game;
