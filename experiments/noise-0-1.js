function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255, 255, 255);

  const originalY = 300;
  const divider = 60;
  noiseSeed(1);
  beginShape();
  for (let x = 0; x < 600; x++) {
    // const y = originalY + Math.random() * 10;
    const y = originalY + noise(x / divider) * 100;
    vertex(x, y);
  }
  endShape();
  noLoop();
}
