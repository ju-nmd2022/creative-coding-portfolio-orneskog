function setup() {
  createCanvas(600, 600);
}

const size = 100;
const divider = 10;
const numRows = 2;
const numCols = 2;
const innerRows = 10;
const innerCols = 10;

function draw() {
  background(255);
  //   noStroke();
  fill(200, 50, 50);
  //   noiseSeed(12);
  for (let y = 0; y < numCols; y++) {
    for (let x = 0; x < numRows; x++) {
      const value = noise(x / divider, y / divider) * size;

      square(size / 2 + x * size, size / 2 + y * size, value);
    }
  }
  noLoop();
}
