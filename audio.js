'use strict';

const NoiseNode = require('./nodes/NoiseNode');
const OscillatorNode = require('./nodes/OscillatorNode');
const SpeakerNode = require('./nodes/SpeakerNode');
const MidiNode = require('./nodes/MidiNode');

let noise = new NoiseNode();
let oscillator = new OscillatorNode(220, 'sine');
let speaker = new SpeakerNode();

oscillator.frequency = (t) => {
  return 220 + 10 * Math.sin(t * Math.PI * 2);
};

speaker.input = oscillator.value;
