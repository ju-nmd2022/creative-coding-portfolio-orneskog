function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB); //Color mode changed for easier color change
  frameRate(5); //Speed of flickering
  // noLoop();
}

const size = 100;
const layers = 10;
const divider = 1;
const numRows = 10;
const numCols = 10;

let counter = 0;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 2, -variance, variance);
}
// Took help from chatGPT to get color variation to work
function getRandomColor(baseColor, variance) {
  let hue = baseColor + map(Math.random(), 0, 1, -variance, variance);
  hue = constrain(hue, 0, 255);
  return hue;
}

function drawLayers(x, y, size, layers) {
  const variance = size / layers;
  noFill();

  for (let i = 0; i < layers; i++) {
    const s = (size / layers) * i;
    const half = s / 2;

    const baseHue = Math.floor(Math.random() * 20);
    const hue = getRandomColor(baseHue, 50);
    const thickness = Math.floor(Math.random() * 6);

    stroke(hue, 100, 100);
    strokeWeight(thickness);

    beginShape();
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y + half, variance)
    );
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y + half, variance)
    );
    endShape(CLOSE);
  }
}

function draw() {
  background(240, 100, 20);

  // Rita ut alla lager i ett rutnät

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numRows; x++) {
      const value = noise(x / divider, y / divider, counter) * size;
      noFill();
      ellipse(size / 2 + x * size, size / 2 + y * size, value);
    }
  }
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }
  counter += 0.1;
}
