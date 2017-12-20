'use strict';
const Node = require('./Node');
const constants = require('../constants');
const util = require('../util');

class OscillatorNode extends Node {
  constructor() {
    super();

    this.waveform = 'sine';
    this.amplitude = () => 1;
    this.carrier = () => 440;
    this.modulation = () => 0;
  }

  value(t) {
    let carrier = this.carrier(t);
    let modulation = this.modulation(t);

    if(this.waveform === 'sine') {
      let inner = 2 * Math.PI * carrier * t + modulation;
      return 0.5 * this.amplitude(t) * (1 + Math.sin(inner));
    } else if(this.waveform === 'square') {
      let period = 1 / carrier;
      let x = ((t + modulation) % period) / period;

      if(x < 0.5) {
        return 0;
      } else {
        return 1.0;
      }
    }

    // TODO: Support Triangle and sawtooth
  }
}

module.exports = OscillatorNode;
