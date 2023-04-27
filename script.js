const cv = document.getElementById("canvas");
const ctx = cv.getContext("2d");

cv.width = 1000;
cv.height = 500;

const nbCols = 5;
const nbRows = 10;

const bricksArray = [];

const info = {
  dx: cv.width / nbRows,
  dy: 20,
};

let currentX = 0;
let currentY = 0;

let playerX = 0;

class Brick {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.show = true;
  }

  draw() {
    ctx.fillStyle = "lightblue";

    if (this.show) {
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fill();
      ctx.stroke();
    }
  }
}

class Player {
  constructor(x) {
    this.width = 200;
    this.height = 20;
    this.x = x;
    this.y = cv.height - info.dy;
    this.dx = 10;
  }

  draw() {
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
  }

  update(direction) {
    if (direction === "right") {
      this.x += this.dx;
      playerX = this.x;
    }

    if (direction === "left") {
      this.x -= this.dx;
      playerX = this.x;
    }
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 3;
    this.dy = 2;
    this.size = 20;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

const player = new Player(playerX);
const ball = new Ball(cv.width / 2, cv.height / 2);

/**
 * Rendering all bricks
 */
const renderBricks = () => {
  for (let k = 0; k < bricksArray.length; k++) {
    bricksArray[k].draw();
  }
};

/**
 * Initialize everything
 */
const init = () => {
  /**
   * Outer loop to spawn brick columns
   */
  for (let i = 0; i < nbCols; i++) {
    /**
     * Inner loop will spaw bricks in rows
     */
    for (let j = 0; j < nbRows; j++) {
      bricksArray.push(new Brick(currentX, currentY, cv.width / nbRows, 20));
      currentX += info.dx;
    }

    // Resetting x after each inner loop
    currentX = 0;

    // Incrementing y after each inner loop
    currentY += info.dy;
  }

  renderBricks();

  player.draw();
  ball.draw();
};

// Calling init function
init();

const handleBall = () => {
  ball.update();
};

const animate = () => {
  ctx.clearRect(0, 0, cv.width, cv.height);

  // draw bricks
  renderBricks();

  handleBall();

  player.draw();
  ball.draw();

  requestAnimationFrame(animate);
};

animate();

window.addEventListener("keydown", (e) => {
  /**
   * Detecting key presses and wall collision
   */
  if (e.key === "ArrowRight") {
    if (!(player.x + player.width >= cv.width)) {
      player.update("right");
    }
  }

  if (e.key === "ArrowLeft") {
    if (!player.x <= 0) {
      player.update("left");
    }
  }
});
