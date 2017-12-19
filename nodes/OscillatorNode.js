'use strict';
const Node = require('./Node');
const constants = require('../constants');
const util = require('../util');

class OscillatorNode extends Node {
  constructor(frequency) {
    super();

    this.frequency = () => frequency;
  }

  value(t) {
    let frequency = this.frequency(t);
    let returnValue = 0.5 * (1 + Math.sin(t * frequency * 2 * Math.PI));
    return returnValue;
  }
}

module.exports = OscillatorNode;
