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

    this.pipes = [new Pipe(this.width)];
    this.birds = [new Bird()];
  }

  loadImages() {
    Object.keys(this.assets).forEach((asset) => {
      const source = this.assets[asset];
      const img = new Image();
      img.src = source.path;
      this.assets[asset].img = img;
    });
  }

  drawPlayground(source, y = 0) {
    for (let x = 0; x < Math.ceil(this.width / source.width); x++) {
      this.ctx.drawImage(source.img, x * source.width, y);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawPlayground(this.assets.background);
    this.pipes.forEach((pipe) => pipe.draw(this.ctx, { top: this.assets.pipeTop, bottom: this.assets.pipeBottom }));
    this.birds.forEach((bird) =>
      bird.draw(this.ctx, this.frameCount, [this.assets.birdUpFlap, this.assets.birdMidFlap, this.assets.birdDownFlap])
    );
    this.drawPlayground(this.assets.base, this.canvas.height - this.assets.base.height);
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.score}`, 50, 50);
  }

  update() {
    this.frameCount++;
    if (this.frameCount % 240 === 0) {
      this.pipes.push(new Pipe(this.width));
    }
    this.pipes.forEach((pipe, index) => {
      if (pipe.isDead) {
        this.score++;
        this.pipes.splice(index, 1);
      }
      pipe.update();
      console.log(this.pipes.length);
    });
    this.birds.forEach((bird, index) => {
      bird.update(this.pipes);
      if (bird.isDead) this.birds.splice(index, 1);
    });
    if (!this.birds.length) {
      this.restart();
    }
  }

  loop() {
    this.ctx.save();
    requestAnimationFrame(() => this.loop());
    this.draw();
    this.update();
    this.ctx.restore();
  }

  restart() {
    this.score = 0;
    this.frameCount = 0;
    this.pipes = [new Pipe(this.width)];
    this.birds = [new Bird()];
  }

  start() {
    this.loadImages();
    this.loop();
  }
}

export default Game;
