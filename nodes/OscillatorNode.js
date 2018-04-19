'use strict';
const Node = require('./Node');
const waveforms = {
  sine: require('../waveforms/sine'),
  square: require('../waveforms/square'),
  sawtooth: require('../waveforms/sawtooth'),
  triangle: require('../waveforms/triangle'),
};

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

    let carrier = this.carrier(t);
    let amplitude = this.amplitude(t);
    let outputValue = waveforms[this.waveform](this.localT, carrier, amplitude);

    // if we're at the end of a cycle for this carrier frequency, let's switch to the next carrier
    if(this.localT * this.lastCarrier > 1 || this.lastCarrier === 0) {
      this.localT = 0;
      this.lastCarrier = this.carrier(t);
    }

    return outputValue;
  }
}

module.exports = OscillatorNode;
