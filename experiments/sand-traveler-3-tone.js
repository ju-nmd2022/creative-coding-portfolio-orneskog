let synth;
let chordIndex = 0;
const chords = [
  ["C3", "E3"],
  ["G3", "B3"],
  ["A3", "C3"],
];
window.addEventListener("load", () => {
  synth = new Tone.PolySynth().toDestination();
  synth.set({
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.5,
      decay: 0.3,
      sustain: 0.8,
      release: 1.5,
    },
    volume: -30, // Set the volume to a lower preset (in dB)
  });

  // Listen for user interaction to start audio context
  document.body.addEventListener("click", () => {
    Tone.start();
    console.log("Audio started");
  });
});

class Boid {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.triggeredChord = false; // Track if a chord has been triggered
  }

  flock(boids) {
    let separation = this.separate(boids);
    let align = this.align(boids);
    let cohesion = this.cohesion(boids);

    separation.mult(1.0);
    align.mult(0.5);

    this.applyForce(separation);
    this.applyForce(align);
    this.applyForce(cohesion);

    this.triggerChordIfNeeded(); // Check if a chord should be triggered
  }

  triggerChordIfNeeded() {
    // Trigger a chord if the boid moves beyond a certain speed or position change
    if (!this.triggeredChord && this.velocity.mag() > 2.5) {
      this.playChord();
      this.triggeredChord = true; // Avoid multiple triggers in a row
      setTimeout(() => (this.triggeredChord = false), 2000); // Allow retrigger after 2 seconds
    }
  }

  playChord() {
    // Play the current chord and then move to the next
    synth.triggerAttack(chords[chordIndex], "4n");
    synth.triggerRelease("+0.5"); // Release after 0.5 seconds
    chordIndex = (chordIndex + 1) % chords.length; // Cycle through chords
  }

  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;

    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < desiredseparation) {
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 1) {
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].position);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0);
    }
  }

  seek(target) {
    let desiredDirection = p5.Vector.sub(target, this.position);
    desiredDirection.normalize();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.lastPosition = this.position.copy();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
      this.lastPosition.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
      this.lastPosition.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }

  draw() {
    push();
    noStroke();
    fill(hueValue % 300, 100, brightValue % 101);
    ellipse(this.position.x, this.position.y, sizeValue % 20);
    pop();
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  generateAgents();
  colorMode(HSB);
  background(0);
  frameRate(10);
}

function generateAgents() {
  for (let i = 0; i < 100; i++) {
    let boid = new Boid(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      3,
      0.05
    );
    boids.push(boid);
  }
}

let boids = [];
let hueValue = 0;
let sizeValue = 0;
let brightValue = 0;

function draw() {
  hueValue += 0.5;
  sizeValue += 0.1;
  brightValue += 0.5;

  for (let boid of boids) {
    boid.flock(boids);
    boid.update();
    boid.checkBorders();
    boid.draw();
  }
}
