//Used Garrit's code about the MonoSynth
//Used ChatGPT to get the mousePressed command to work

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

function setup() {
  createCanvas(windowWidth, windowHeight);
  synth = new Tone.MonoSynth().toDestination();
  Tone.start();
  noLoop();
}

function draw() {
  background(220);
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
}

function mousePressed() {
  //Got help from ChatGPT to do this:
  //Playing the tone depending on the space the mouse is clicking in
  let index = floor(map(mouseX, 0, width, 0, notes.length));
  synth.triggerAttackRelease(notes[index], "4n");
}
