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

  /**
   * Rendering all bricks
   */
  for (let k = 0; k < bricksArray.length; k++) {
    bricksArray[k].draw();
  }
};

init();
