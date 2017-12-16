'use strict';

const Waveform = require('./waveform');

class Sine extends Waveform {
  value(t) {
    return (Math.sin(t * this.frequency * 2 * Math.PI) + 1) * 0.5;
  }
}

module.exports = Sine;
