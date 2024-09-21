function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB); //Color mode changed for easier color change
  frameRate(5); //Speed of flickering
  noLoop();
}

const size = 100;
const layers = 3;
const divider = 5;
const numRows = 10;
const numCols = 10;

let counter = 0;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 2, -variance, variance);
}
// Took help from chatGPT to get color variation to work
function getRandomColor(baseColor, variance) {
  let hue = baseColor + map(Math.random(), 0, 0.3, -variance, variance);
  hue = constrain(hue, 0, 255);
  return hue;
}

// Got help from chatGPT to implement the increase of vertexes
let vertexCount = 2;

function drawLayers(x, y, size, layers) {
  const variance = size / layers;
  noFill();

  for (let i = 0; i < layers; i++) {
    const s = (size / layers) * i;
    const half = s / 2;

    const baseHue = Math.floor(Math.random() * 20);
    const hue = getRandomColor(baseHue, 50);
    const thickness = Math.floor(Math.random() * 4);

    stroke(hue, 100, 100);
    strokeWeight(thickness);
    beginShape();
    for (let j = 0; j < vertexCount; j++) {
      const angle = (TWO_PI / vertexCount) * j; // Calculate angle for each vertex
      const xOffset = cos(angle) * half;
      const yOffset = sin(angle) * half;

      vertex(
        getRandomValue(x + xOffset, variance),
        getRandomValue(y + yOffset, variance)
      );
    }
    endShape(CLOSE);

    vertexCount++; // Increase vertex count for the next layer
  }
}

function draw() {
  background(0);

  //display all layers in the grid
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }
  counter += 0.1;
}
