'use strict';
const Node = require('./Node');
const constants = require('../constants');

class OscillatorNode extends Node {
  constructor() {
    super();

    this.waveform = 'sine';
    this.amplitude = () => 1;
    this.carrier = () => 440;

    this.lastCarrier = this.carrier(0);
    this.lastFrame = null;
    this.localT = 0;
  }

  value(t) {
    if(this.lastFrame == null) {
      this.lastFrame = t;
    }
    
    let dt = t - this.lastFrame;
    this.lastFrame = t;
    this.localT += dt;

    let outputValue = 0;
    if(this.waveform === 'sine') {
      outputValue = this.sine(this.localT, t);
    } else if(this.waveform === 'square') {
      outputValue = this.square(this.localT, t);
    }

    // if we're at the end of a cycle for this carrier frequency, let's switch to the next carrier
    if(this.localT * this.lastCarrier > 1 || this.lastCarrier === 0) {
      this.localT = 0;
      this.lastCarrier = this.carrier(t);
    }

    return outputValue;

    // TODO: Support Triangle and sawtooth
  }

  sine(t, globalT) {
    let inner = 2 * Math.PI * this.lastCarrier * t;
    return 0.5 * this.amplitude(globalT) * (1 + Math.sin(inner));
  }

  square(t, globalT) {
    let period = 1 / this.lastCarrier;
    let x = (t % period) / period;
    const d = 0.01;
    if(x < 0.5 - d) {
      return 0;
    } else if(x > 0.5 - d && x < 0.5 + d) {
      let slope = this.amplitude(globalT) / 2 / d;
      let intercept = -(0.5 - d) * slope;
      return slope * x + intercept;
    } else {
      return this.amplitude(globalT);
    }
  }
}

module.exports = OscillatorNode;
