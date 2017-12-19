'use strict';
const Node = require('./Node');
const constants = require('../constants');
const util = require('../util');

class OscillatorNode extends Node {
  constructor(frequency) {
    super();

    this.carrier = () => frequency;
    this.modulation = () => 0;
  }

  value(t) {
    let carrier = this.carrier(t);
    let inner = 2 * Math.PI * carrier * t + this.modulation(t);
    return 0.5 * (1 + Math.sin(inner));
  }
}

module.exports = OscillatorNode;
