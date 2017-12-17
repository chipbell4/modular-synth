'use strict';

const NoiseNode = require('./nodes/NoiseNode');
const SpeakerNode = require('./nodes/SpeakerNode');

let noise = new NoiseNode();
let speaker = new SpeakerNode();

speaker.receive('speaker', noise);
