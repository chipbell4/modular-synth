'use strict';
const Node = require('./Node');
const constants = require('../constants');
const util = require('../util');

class OscillatorNode extends Node {
  constructor(frequency) {
    super();

    this.t = 0;
    this.dt = 1 / constants.SAMPLE_RATE;

    this.frequency = () => frequency;
  }

  value(t) {
    let frequency = this.frequency(this.t);
    let returnValue = 0.5 * (1 + Math.sin(this.t * frequency * 2 * Math.PI));

    this.t += this.dt;
    return returnValue;
  }
}

module.exports = OscillatorNode;
