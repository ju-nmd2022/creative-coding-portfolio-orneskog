/* Used Garrit's examples for particles, tone.js and vectors
and got help from ChatGPT to manage them to work and to work together
for my liking
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

let position;
let velocity;
let diameter = 50;
let startText = true; // Control to show/hide text
let particles = []; // Array to hold particles

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the synth
  synth = new Tone.MonoSynth().toDestination();
  // Set start position
  position = createVector(
    random(diameter / 2, width - diameter / 2),
    random(diameter / 2, height - diameter / 2)
  );
  velocity = createVector(0, 0);
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

  // Calculate vector acceleration towards the mouse
  const mouse = createVector(mouseX, mouseY);
  let acceleration = p5.Vector.sub(mouse, position);
  acceleration.normalize();
  acceleration.mult(0.2);

  // Velocity and position update
  velocity.add(acceleration);
  velocity.limit(10);
  position.add(velocity);

  // Check for collisions with walls
  if (position.x > width - diameter / 2) {
    position.x = width - diameter / 2; // Stop from moviing outside of canvas
    velocity.x *= -1; // Reverse direction
    playNote(); // Play sound
    generateParticles(position.x, position.y); // Generate particles
  } else if (position.x < diameter / 2) {
    position.x = diameter / 2; // Stop from moving outside of canvas
    velocity.x *= -1; // Reverse direction
    playNote(); // Play sound
    generateParticles(position.x, position.y); // Generate particles
  }

  if (position.y > height - diameter / 2) {
    position.y = height - diameter / 2; // Stop from moving outside of canvas
    velocity.y *= -1; // Reverse direction
    playNote(); // Play sound
    generateParticles(position.x, position.y); // Generate particles
  } else if (position.y < diameter / 2) {
    position.y = diameter / 2; // Stop from moving outside of canvas
    velocity.y *= -1; // Reverse direction
    playNote(); // Play sound
    generateParticles(position.x, position.y); // Generate particles
  }

  // Draw the ball
  ellipse(position.x, position.y, diameter, diameter);

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

  // Set initial velocity to move towards mouse
  const mouse = createVector(mouseX, mouseY);
  velocity = p5.Vector.sub(mouse, position);
  velocity.limit(3); // Set initial speed

  // Hide the start text
  startText = false;
}
