'use strict';
const Readable = require('stream').Readable;

const Node = require('./Node');
const constants = require('../constants');
const util = require('../util');

class OscillatorNode extends Node {
  constructor(frequency) {
    super();

    this.streams.frequency = new Readable();
    this.streams.frequency._read = function() {
      this.streams.frequency.push(util.frequencyToByte(frequency));
    }.bind(this);

    let dt = 1 / constants.SAMPLE_RATE;
    this.outputStream._read = function() {
      let bytes = this.streams.frequency.read(1);
      console.log(this.streams.frequency._readableState.buffer);
      let frequency = util.byteToFrequency(bytes.toString());
      let period = 1 / frequency; 

      for(let t = 0; t < period; t += dt) {
        let rawValue = Math.sin(t * frequency * 2 * Math.PI);
        this.outputStream.push(this.rawValueToByte(rawValue));
      }

      // tell the frequency stream we're ready for the next bytes
      this.streams.frequency.read(0);
    }.bind(this);
  }

  rawValueToByte(rawValue) {
    var value = Math.floor((rawValue + 1) * 64);

    return String.fromCharCode(value);
  }
}

module.exports = OscillatorNode;
