'use strict';

const NoiseNode = require('./nodes/NoiseNode');
const OscillatorNode = require('./nodes/OscillatorNode');
const SpeakerNode = require('./nodes/SpeakerNode');
const MidiNode = require('./nodes/MidiNode');

let noise = new NoiseNode();
let oscillator = new OscillatorNode(220, 'sine');
let speaker = new SpeakerNode();

oscillator.modulation = (t) => {
  let lfoFrequency = 5;
  return 50 * Math.cos(lfoFrequency * t * 2 * Math.PI);
};

speaker.input = oscillator.value;
