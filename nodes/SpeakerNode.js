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
    let totalSamples = 0;
    reader._read = () => {
      for(let i = 0; i < 2000; i++) {
        let t = totalSamples / constants.SAMPLE_RATE;
        let rawValue = Math.max(this.input(t), 0.9999);
        let clampedValue = ((rawValue + 1) * 128) % 128;
        let byteValue = String.fromCharCode(Math.floor(clampedValue))
        reader.push(byteValue);

        totalSamples++;
      }
    };

    reader.pipe(this.speaker);
  }
}

module.exports = SpeakerNode;
