/* Used Garrit's examples for particles, tone.js and vectors
and got help from ChatGPT to manage them to work, to work together
for my liking. 
Wanted to test out another take on the previoos tone.js example I did
*/

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

let balls = []; // Array to hold multiple balls
let diameter = 100; //Size on bouncing balls
let centerX, centerY; // Location of the center ellipse
let centerEllipseDiameter = 100; // Size of the center ellipse
let startText = true; // Control to show/hide text
let gravityActive = false; /* Control whether gravity is active or not -
Implemented because I had a problem with the bouncing balls disappearing when sound wasn't on */
let particles = []; // Array to hold particles

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create the synth
  synth = new Tone.MonoSynth().toDestination();

  // Center ellipse position
  centerX = width / 2;
  centerY = height / 2;

  // Create 3 balls with random start positions
  for (let i = 0; i < 3; i++) {
    let position = createVector(
      random(diameter / 2, width - diameter / 2),
      random(diameter / 2, height - diameter / 2)
    );
    let velocity = createVector(0, 0);
    balls.push({ position, velocity });
  }
}

function playNote() {
  // Play a random note from the notes array
  let index = floor(random(notes.length));
  synth.triggerAttackRelease(notes[index], "8n");
}

//Used Garrit's Particle example and got help from ChatGPT to get it to work
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

  // Draw the center ellipse
  fill(0, 0, 0);
  noStroke();
  ellipse(centerX, centerY, centerEllipseDiameter, centerEllipseDiameter);

  // ChatGPT Helped me with this whole for-loop:
  // Loop through all balls
  for (let ball of balls) {
    let { position, velocity } = ball;
    if (gravityActive) {
      // Calculate vector acceleration towards the center ellipse
      const center = createVector(centerX, centerY);
      let acceleration = p5.Vector.sub(center, position);
      acceleration.normalize();
      acceleration.mult(0.1);

      // Update velocity and position
      velocity.add(acceleration);
      velocity.limit(10);
      position.add(velocity);

      // Check if the ball collides with the center ellipse
      let distanceToCenter = dist(position.x, position.y, centerX, centerY);
      if (distanceToCenter < (centerEllipseDiameter + diameter) / 2) {
        // Reverse the velocity when colliding with the ellipse
        let normal = p5.Vector.sub(position, center);
        normal.normalize();
        velocity.reflect(normal);

        playNote(); // Play sound
        generateParticles(position.x, position.y); // Generate particles
      }
    }

    // Draw the ball
    fill(255, 0, 0);
    ellipse(position.x, position.y, diameter, diameter);
  }

  if (startText) {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Click on the screen to start the magic.", width / 2, height / 2);
  }
}

function mousePressed() {
  // Start Tone.js
  Tone.start();

  // Set initial velocity towards the center ellipse for all balls
  for (let ball of balls) {
    let { position, velocity } = ball;
    const center = createVector(centerX, centerY);
    velocity = p5.Vector.sub(center, position);
    velocity.limit(5); // Set initial speed
    ball.velocity = velocity; // Update ball velocity
  }

  // Hide the start text and activate gravity
  startText = false;
  gravityActive = true; // Activate gravity on click
}
