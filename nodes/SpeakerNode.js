'use strict';

const Readable = require('stream').Readable;
const Node = require('./Node');
const Speaker = require('speaker');
const constants = require('../constants');

class SpeakerNode extends Node {
  constructor() {
    super();

    // Create the Speaker instance
    this.speaker = new Speaker({
      channels: constants.CHANNELS,
      bitDepth: constants.BIT_DEPTH,
      sampleRate: constants.SAMPLE_RATE
    });

    this.input = () => 0;

    var reader = new Readable();
    reader._read = () => {
      for(let i = 0; i < constants.SAMPLES_PER_READ; i++) {
        let rawValue = this.input();
        let byteValue = String.fromCharCode(Math.floor((rawValue * 127) % 128))
        reader.push(byteValue);
      }
    };

    reader.pipe(this.speaker);
  }
}

module.exports = SpeakerNode;
