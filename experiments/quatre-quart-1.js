// Generative Artistry Used as base https://generativeartistry.com/tutorials/un-deux-trois/
// Had to take help from ChatGPT to get it to work in p5.js
let step = 20;
let aThirdOfHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  strokeCap(ROUND);
  aThirdOfHeight = height / 3;
}

function draw() {
  background(255);

  for (let y = step; y < height - step; y += step) {
    for (let x = step; x < width - step; x += step) {
      if (y < aThirdOfHeight) {
        stroke(255, 0, 0);
        drawLines(x, y, step, [0.5]);
      } else if (y < aThirdOfHeight * 2) {
        stroke(180, 0, 0);
        step = 30;
        strokeWeight(3);
        drawLines(x, y, step, [0.3, 0.7]);
        drawLines(x, y, step, [0.2, 0.8]);
      } else {
        stroke(0, 0, 0);
        step = 40;
        strokeWeight(4);
        drawLines(x, y, step, [0.1, 0.5, 0.9]);
        drawLines(x, y, step, [0.2, 0.5, 0.8]);
        drawLines(x, y, step, [0.3, 0.5, 0.7]);
      }
    }
  }
  noLoop(); // Stops draw() from looping
}

function drawLines(x, y, step, positions) {
  push();
  translate(x + step / 2, y + step / 2);
  translate(-step / 2, -step / 2);

  positions.forEach((pos) => {
    rotate(random(-2, 0)); // Random small rotation
    line(pos * step, 0, pos * step, step);
  });

  pop();
}
