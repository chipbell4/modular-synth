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
      const d = 0.01;
      if(x < 0.5 - d) {
        return 0;
      } else if(x > 0.5 - d && x < 0.5 + d) {
        let slope = this.amplitude(t) / 2 / d;
        let intercept = -(0.5 - d) * slope;
        return slope * x + intercept;
      }else {
        return this.amplitude(t);
      }
    }

    // TODO: Support Triangle and sawtooth
  }
}

module.exports = OscillatorNode;
