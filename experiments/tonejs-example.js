//Garrit's example on a synth from presentation "Generative Sound"

const selectedElement = document.getElementById("selected");
const sineButton = document.getElementById("sine");
const squareButton = document.getElementById("square");
const sawButton = document.getElementById("sawtooth");
const triangleButton = document.getElementById("triangle");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const attackInput = document.getElementById("attack");
const decayInput = document.getElementById("decay");
const sustainInput = document.getElementById("sustain");
const releaseInput = document.getElementById("release");
const buttonC = document.getElementById("buttonC");
const buttonD = document.getElementById("buttonD");
const buttonE = document.getElementById("buttonE");
const buttonF = document.getElementById("buttonF");
const buttonG = document.getElementById("buttonG");
const buttonA = document.getElementById("buttonA");
const buttonB = document.getElementById("buttonB");
const buttonC2 = document.getElementById("buttonC2");
let synth;

window.addEventListener("load", () => {
  synth = new Tone.PolySynth().toDestination();
});

sineButton.addEventListener("click", () => {
  synth.set({
    oscillator: {
      type: "sine",
    },
  });
  selectedElement.innerText = "Selected: Sine";
});

squareButton.addEventListener("click", () => {
  synth.set({
    oscillator: {
      type: "square",
    },
  });
  selectedElement.innerText = "Selected: Square";
});

sawButton.addEventListener("click", () => {
  synth.set({
    oscillator: {
      type: "sawtooth",
    },
  });
  selectedElement.innerText = "Selected: SawTooth";
});

triangleButton.addEventListener("click", () => {
  synth.set({
    oscillator: {
      type: "triangle",
    },
  });
  selectedElement.innerText = "Selected: Triangle";
});

attackInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      attack: attackInput.value,
    },
  });
});

decayInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      decay: decayInput.value,
    },
  });
});

sustainInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      sustain: sustainInput.value,
    },
  });
});

releaseInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      release: releaseInput.value,
    },
  });
});

buttonC.addEventListener("click", () => {
  synth.triggerAttackRelease(["C3", "E3"], "4n");
});

buttonD.addEventListener("click", () => {
  synth.triggerAttackRelease(["D3", "F3"], "4n");
});

buttonE.addEventListener("click", () => {
  synth.triggerAttackRelease(["E3", "G3"], "4n");
});

buttonF.addEventListener("click", () => {
  synth.triggerAttackRelease(["F3", "A3"], "4n");
});

buttonG.addEventListener("click", () => {
  synth.triggerAttackRelease(["G3", "B3"], "4n");
});

buttonA.addEventListener("click", () => {
  synth.triggerAttackRelease(["A3", "C4"], "4n");
});

buttonB.addEventListener("click", () => {
  synth.triggerAttackRelease(["B3", "D4"], "4n");
});

buttonC2.addEventListener("click", () => {
  synth.triggerAttackRelease(["C4", "E4"], "4n");
});

window.addEventListener("click", () => {
  Tone.start();
});
