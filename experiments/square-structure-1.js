function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB); //Color mode changed for easier color change
  // frameRate(5); //Speed of flickering
  noLoop();
}

const size = 100;
const layers = 20;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 0.2, -variance, variance);
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

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const baseHue = Math.floor(Math.random() * 255);
      const hue = getRandomColor(baseHue, 50);
      stroke(hue, 100, 100);
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }
}
