'use strict';

const Node = require('./Node');

class NoiseNode extends Node {
  value() {
    return Math.random();
  }
}

module.exports = NoiseNode;
