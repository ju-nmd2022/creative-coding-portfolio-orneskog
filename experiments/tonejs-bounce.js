let synth;
let notes = [
  "C2",
  "D2",
  "E2",
  "F2",
  "G2",
  "A2",
  "B2",
  "C3",
  "D3",
  "E3",
  "F3",
  "G3",
  "A3",
  "B3",
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C5",
];

let x, y;
let xSpeed = 0; // Start with 0 speed
let ySpeed = 0; // Start with 0 speed
let diameter = 50;
let startText = true; // Control to show/hide text
let particles = []; // Array to hold particles

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the synth
  synth = new Tone.MonoSynth().toDestination();
  // Randomizing the balls starting position
  x = random(diameter / 2, width - diameter / 2);
  y = random(diameter / 2, height - diameter / 2);
}

function playNote() {
  // Play a random note from the notes array
  let index = floor(random(notes.length));
  synth.triggerAttackRelease(notes[index], "8n");
}

//Used Garrit's Particle example combined with the bouncing on the walls
//Got a little help from ChatGPT to get it to work with my previous code
function generateParticles(x, y) {
  for (let i = 0; i < 400; i++) {
    const px = x + random(-10, 10);
    const py = y + random(-10, 10);
    const particle = new Particle(px, py);
    particles.push(particle);
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    const a = Math.random() * Math.PI * 2;
    const v = 0.2 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
    this.lifespan = 100 + Math.random() * 100;
  }

  update() {
    this.lifespan--;
    this.velocity.mult(0.99);
    this.position.add(this.velocity);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(200, 0, 0, 15);
    ellipse(0, 0, 30);
    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

function draw() {
  background(0);

  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.update();
    particle.draw();

    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }

  fill(255, 0, 0); // Red ball
  noStroke();

  // Move the ball if speeds are greater than zero
  if (xSpeed !== 0 || ySpeed !== 0) {
    x += xSpeed;
    y += ySpeed;

    // Check for collision with walls and trigger sound if it hits
    if (x > width - diameter / 2) {
      xSpeed *= -1; // Reverse direction
      playNote(); // Play sound
      generateParticles(x, y); // Generate particles
    } else if (x < diameter / 2) {
      xSpeed *= -1; // Reverse direction
      playNote(); // Play sound
      generateParticles(x, y); // Generate particles
    }

    if (y > height - diameter / 2) {
      ySpeed *= -1; // Reverse direction
      playNote(); // Play sound
      generateParticles(x, y); // Generate particles
    } else if (y < diameter / 2) {
      ySpeed *= -1; // Reverse direction
      playNote(); // Play sound
      generateParticles(x, y); // Generate particles
    }
  }

  // Draw the ball
  ellipse(x, y, diameter, diameter);

  /* Had a problem with the ball disappearing at first bounce when sound was not playing
  Solved it by using this start screen and the following mousePressed function */
  if (startText) {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Click on the screen to start the magic", width / 2, height / 2);
  }
}

function mousePressed() {
  // Start Tone.js
  Tone.start();

  // Set speeds to 3
  xSpeed = 3;
  ySpeed = 3;

  // Hide the instruction text
  startText = false;
}
