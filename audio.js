'use strict';

const NoiseNode = require('./nodes/NoiseNode');
const OscillatorNode = require('./nodes/OscillatorNode');
const SpeakerNode = require('./nodes/SpeakerNode');
const MidiNode = require('./nodes/MidiNode');

let noise = new NoiseNode();
let midi = new MidiNode();
let oscillator = new OscillatorNode(220, 'sine');
let speaker = new SpeakerNode();

oscillator.streams.frequency = midi.outputStream;

speaker.receive('speaker', oscillator);
