'use strict';

const NoiseNode = require('./nodes/NoiseNode');
const OscillatorNode = require('./nodes/OscillatorNode');
const LowPassFilterNode = require('./nodes/LowPassFilterNode');
const SpeakerNode = require('./nodes/SpeakerNode');
const MidiNode = require('./nodes/MidiNode');
const SequencerNode = require('./nodes/SequencerNode');

let noise = new NoiseNode();
let oscillator = new OscillatorNode();
let lfo = new OscillatorNode();
let lpf = new LowPassFilterNode();
//let midi = new MidiNode();
let sequencer = new SequencerNode();
let speaker = new SpeakerNode();

lfo.waveform = 'sine';
lfo.amplitude = () => 1;
lfo.carrier = () => 0.5;

sequencer.sequence = [110, 110, 220, 220, 150, 150, 110, 150];
sequencer.length = lfo.value;

oscillator.waveform = 'square';
oscillator.carrier = sequencer.value;

let lfo2 = new OscillatorNode();
lfo2.amplitude = () => 100;
lfo2.carrier = () => 8;

lpf.filterWidth = lfo2.value;
lpf.input = oscillator.value;

speaker.input = lpf.value;
