'use strict';

const NoiseNode = require('./nodes/NoiseNode');
const OscillatorNode = require('./nodes/OscillatorNode');
const SpeakerNode = require('./nodes/SpeakerNode');
const MidiNode = require('./nodes/MidiNode');

let noise = new NoiseNode();
let oscillator = new OscillatorNode();
let lfo = new OscillatorNode();
let speaker = new SpeakerNode();

lfo.amplitude = () => 100;
lfo.carrier = () => 2;

oscillator.modulation = lfo.value;

speaker.input = oscillator.value;
