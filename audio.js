'use strict';

const NoiseNode = require('./nodes/NoiseNode');
const OscillatorNode = require('./nodes/OscillatorNode');
const SpeakerNode = require('./nodes/SpeakerNode');

let noise = new NoiseNode();
let oscillator = new OscillatorNode(440, 'sine');
let speaker = new SpeakerNode();

speaker.receive('speaker', oscillator);
