const cv = document.getElementById("canvas");
const ctx = cv.getContext("2d");

cv.width = 1000;
cv.height = 500;

const nbCols = 5;
const nbRows = 10;

let bricksArray = [];

const info = {
  dx: cv.width / nbRows,
  dy: 20,
};

let currentX = 0;
let currentY = 0;

let playerX = cv.width / 2;

let animationId = null;

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

const player = new Player(playerX);

class Cube {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 3;
    this.dy = 2;
    this.size = 20;
  }

  draw() {
    ctx.beginPath();
    // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
    ctx.stroke();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    /**
     * Detect side wall collision
     */
    if (this.x + this.size > cv.width || this.x - this.size < 0) {
      this.dx *= -1;
    }

    if (this.y - this.size < 0) {
      this.dy *= -1;
    }

    if (this.y + this.size > cv.height) {
      gameOver();
    }

    /**
     * Collision with player
     */
    if (
      player.x < cube.x + cube.size &&
      player.x + player.width > cube.x &&
      player.y < cube.y + cube.size &&
      player.y + player.height > cube.y
    ) {
      this.dy *= -1;
    }
  }
}

const cube = new Cube(cv.width / 2, cv.height / 2);

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
const start = () => {
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
  cube.draw();
};

/**
 * Simple game over function
 */
const gameOver = () => {
  alert("GAME OVER");
  document.location.reload();
  clearInterval(animationId);
};

// Calling init function
start();

const handleBrick = () => {
  cube.update();
};

const update = () => {
  ctx.clearRect(0, 0, cv.width, cv.height);

  // draw bricks
  renderBricks();

  handleBrick();

  player.draw();
  cube.draw();

  for (let i = 0; i < bricksArray.length; i++) {
    if (
      bricksArray[i].x < cube.x + cube.size &&
      bricksArray[i].x + bricksArray[i].width > cube.x &&
      bricksArray[i].y < cube.y + cube.size &&
      bricksArray[i].y + bricksArray[i].height > cube.y
    ) {
      bricksArray[i].show = false;
      bricksArray.splice(i, 1);
      cube.dy *= -1;
      cube.dx *= -1;
    }
  }
};

animationId = setInterval(() => {
  update();
}, 20);

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
