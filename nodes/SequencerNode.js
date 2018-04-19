'use strict';

const Node = require('./Node');

class SequencerNode extends Node {
  constructor() {
    super();

    this.sequence = [440];
    this.length = () => 0.5;
  }

  value(t) {
    var index = Math.floor(t / this.length(t)) % this.sequence.length;
    return this.sequence[index];
  }
}

module.exports = SequencerNode;
