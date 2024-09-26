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

function draw() {
  background(0);
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
    } else if (x < diameter / 2) {
      xSpeed *= -1; // Reverse direction
      playNote(); // Play sound
    }

    if (y > height - diameter / 2) {
      y = height - diameter / 2; // Clamp position to prevent disappearing
      ySpeed *= -1; // Reverse direction
      playNote(); // Play sound
    } else if (y < diameter / 2) {
      y = diameter / 2; // Clamp position to prevent disappearing
      ySpeed *= -1; // Reverse direction
      playNote(); // Play sound
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
