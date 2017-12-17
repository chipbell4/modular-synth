'use strict';

const Node = require('./Node');
const Speaker = require('speaker');
const constants = require('../constants');

class SpeakerNode extends Node {
  constructor() {
    super();
    
    // Create the Speaker instance
    this.streams.speaker = new Speaker({
      channels: constants.CHANNELS,
      bitDepth: constants.BIT_DEPTH,
      sampleRate: constants.SAMPLE_RATE
    });
  }
}

module.exports = SpeakerNode;
