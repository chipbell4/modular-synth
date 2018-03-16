'use strict';
const Node = require('./Node');

class MultiplierNode extends Node {
  constructor() {
    super();

    this.input1 = () => 0;
    this.input2 = () => 0;
  }

  value(t) {
    return this.input1(t) * this.input2(t);
  }
}

module.exports = MultiplierNode;
