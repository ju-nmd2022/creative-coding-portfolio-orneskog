/*Used Garrit's code about the MonoSynth and also the code example for Fast Fourier Transformation
Used ChatGPT to get the mousePressed command to work
Also used ChatGPT to get the FFT to work together with my previous code and to get it to be displayed and also for it to work with the sound from my keys */

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
let analyser, gain;

function setup() {
  createCanvas(windowWidth, windowHeight);
  synth = new Tone.MonoSynth().toDestination();
  gain = new Tone.Gain(1).toDestination();
  analyser = new Tone.Analyser("fft", 4096);
  synth.connect(gain);
  gain.connect(analyser);
  Tone.start();
}

function draw() {
  background(80);
  noStroke();
  let rectWidth = windowWidth / notes.length;
  //Setting a base color saturation to max to later change it in the for-loop
  colorSat = 255;
  //Tone Buttons
  for (let i = 0; i < notes.length; i++) {
    let x = i * rectWidth;
    gradientSteps = 255 / notes.length;
    colorSat = colorSat - gradientSteps;
    fill(0, 0, 0, colorSat);
    rect(x, 0, rectWidth, windowHeight);
  }

  // Visualize the FFT curve (Got help from ChatGPT and Garrit's FFT Code)
  let fftValues = analyser.getValue();
  noFill();
  strokeWeight(5);
  stroke(0, 255, 0, 100);

  beginShape();
  for (let i = 0; i < fftValues.length; i++) {
    let v = map(fftValues[i], -100, 0, height, 0);
    vertex(i * (width / fftValues.length) * 2, v / 2);
  }
  endShape();
}

function mousePressed() {
  //Got help from ChatGPT to do this:
  //Playing the tone depending on the space the mouse is clicking in
  let index = floor(map(mouseX, 0, width, 0, notes.length));
  synth.triggerAttackRelease(notes[index], "4n");
}
