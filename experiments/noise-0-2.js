function setup() {
  createCanvas(600, 600);
}

const size = 10;
const divider = 20;
const numRows = 45;
const numCols = 45;

function draw() {
  background(255);
  noStroke();
  fill(200, 50, 50);
  // noiseSeed(12);
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numRows; x++) {
      const value = noise(x / divider, y / divider) * size;
      ellipse(size / 2 + x * size, size / 2 + y * size, value);
    }
  }
  noLoop();
}
