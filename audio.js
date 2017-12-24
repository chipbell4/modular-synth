'use strict';

const NoiseNode = require('./nodes/NoiseNode');
const OscillatorNode = require('./nodes/OscillatorNode');
const LowPassFilterNode = require('./nodes/LowPassFilterNode');
const SpeakerNode = require('./nodes/SpeakerNode');
const MidiNode = require('./nodes/MidiNode');
const SequencerNode = require('./nodes/SequencerNode');

const Synth = {
  noise: new NoiseNode(),
  lfo1: new OscillatorNode(),
  lfo2: new OscillatorNode(),
  sequencer1: new SequencerNode(),
  sequencer2: new SequencerNode(),
  lpf: new LowPassFilterNode(),
  speaker: new SpeakerNode()
};

module.exports = Synth;
