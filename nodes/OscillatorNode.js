'use strict';

const Node = require('./Node');
const constants = require('../constants');

class OscillatorNode extends Node {
  constructor(frequency, waveform) {
    super();

    this.frequency = frequency || 440;
    this.waveform = waveform || 'sine';

    let dt = 1 / constants.SAMPLE_RATE;
    this.outputStream._read = function() {
      let period = 1 / this.frequency; 
      for(let t = 0; t < period; t += dt) {
        let rawValue = this.sine(t);
        this.outputStream.push(this.rawValueToByte(rawValue));
      }
    }.bind(this);
  }

  sine(t) {
    return Math.sin(t * this.frequency * 2 * Math.PI);
  }

  rawValueToByte(rawValue) {
    var value = Math.floor((rawValue + 1) * 64);

    return String.fromCharCode(value);
  }
}

module.exports = OscillatorNode;
