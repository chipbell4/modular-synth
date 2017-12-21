'use strict';

const NoiseNode = require('./nodes/NoiseNode');
const OscillatorNode = require('./nodes/OscillatorNode');
const LowPassFilterNode = require('./nodes/LowPassFilterNode');
const SpeakerNode = require('./nodes/SpeakerNode');
const MidiNode = require('./nodes/MidiNode');

let noise = new NoiseNode();
let oscillator = new OscillatorNode();
let lfo = new OscillatorNode();
let lpf = new LowPassFilterNode();
let midi = new MidiNode();
let speaker = new SpeakerNode();

lfo.waveform = 'sine';
lfo.amplitude = () => 0.1;
lfo.carrier = () => 10;

oscillator.waveform = 'square';
oscillator.carrier = midi.value;

let lfo2 = new OscillatorNode();
lfo2.amplitude = () => 100;
lfo2.carrier = () => 8;

lpf.filterWidth = lfo2.value;
lpf.input = oscillator.value;

speaker.input = lpf.value;
