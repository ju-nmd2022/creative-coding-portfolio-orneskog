let flowerSize = 20;
let amount = 4;
let gap = 80;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0, 0, 255);
  colorMode(HSB);
}

function flower() {
  noStroke();
  let petals = 19;

  for (let y = 0; y < petals; y++) {
    for (let x = 0; x < petals; x++) {
      //Gult
      fill(60, 255, 255);
      rect(x, y, 40, 5);
      // rött
      fill(10, 255, 255);
      rect(x, y, 20, 10);
      // center
      fill(25, 60, 20);
      ellipse(x, y, 3);
      rotate(PI / 5);
    }
  }
}
function draw() {
  // translate(100,100);
  let y = (height - flowerSize * amount - gap * (amount - 1)) / 2;
  for (let i = 0; i < amount; i++) {
    let x = (width - flowerSize * amount - gap * (amount - 1)) / 2;
    for (let j = 0; j < amount; j++) {
      push();
      translate(x, y);
      flower();
      pop();
      x += flowerSize + gap;
    }
    y += flowerSize + gap;
  }
  //   flower();
}
