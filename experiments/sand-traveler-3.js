// Used Garrit's example of Boids Model as a base
// Used some code from Daniel Shiffmans Nature of code: https://github.com/nature-of-code/noc-examples-p5.js/blob/master/chp06_agents/NOC_6_09_Flocking/boid.js

class Boid {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  flock(boids) {
    let separation = this.separate(boids);
    let align = this.align(boids);
    let cohesion = this.cohesion(boids);

    // You can play with this values to change the behavior
    separation.mult(1.0);
    align.mult(0.5);
    //   cohesion.mult(1.0);

    this.applyForce(separation);
    this.applyForce(align);
    this.applyForce(cohesion);
  }

  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < desiredseparation) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 1) {
      // Implement Reynolds: Steering = Desired - Velocity
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
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
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
    // Got help from chatGPT to get the colors to loop with % + max value, a modulo operator
    fill(hueValue % 300, 100, brightValue % 101);
    ellipse(this.position.x, this.position.y, sizeValue % 20);
    pop();
  }
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  generateAgents();
  colorMode(HSB); // Color mode changed for easy smooth color variations
  background(0);
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
let hueValue = 0; // Global variable for color change
let sizeValue = 0; // Global variable for color change
let brightValue = 0; // Global variable for color change

function draw() {
  hueValue += 0.5; // Increment hueValue each frame
  sizeValue += 0.1; // Increment satValue each frame
  brightValue += 0.5;

  for (let boid of boids) {
    boid.flock(boids);
    boid.update();
    boid.checkBorders();
    boid.draw();
  }
}
