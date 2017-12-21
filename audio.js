'use strict';

const NoiseNode = require('./nodes/NoiseNode');
const OscillatorNode = require('./nodes/OscillatorNode');
const SpeakerNode = require('./nodes/SpeakerNode');
const MidiNode = require('./nodes/MidiNode');

let noise = new NoiseNode();
let oscillator = new OscillatorNode();
let lfo = new OscillatorNode();
let speaker = new SpeakerNode();

lfo.waveform = 'sine';
lfo.amplitude = () => 0.1;
lfo.carrier = () => 10;

oscillator.waveform = 'square';
oscillator.carrier = () => 220;
oscillator.modulation = lfo.value;

speaker.input = oscillator.value;
