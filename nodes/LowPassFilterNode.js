'use strict';

const Node = require('./Node');

const MAX_LENGTH = 100;

class LowPassFilterNode extends Node {
  constructor() {
    super();

    this.previousValues = [];
    this.filterWidth = () => 1;
    this.input = () => 0;
  }

  value(t) {
    if(this.previousValues.length >= MAX_LENGTH) {
      this.previousValues.shift();
    }

    this.previousValues.push(this.input(t));

    // now average the last (filterWidth) values
    let valuesToProcess = Math.min(this.previousValues.length, this.filterWidth(t));
    valuesToProcess = Math.max(valuesToProcess, 1);
    valuesToProcess = Math.floor(valuesToProcess);
    let average = 0;
    for(let k = 0; k < valuesToProcess; k++) {
      average += this.previousValues[this.previousValues.length - 1 - k];
    }

    return average / valuesToProcess;
  }
}

module.exports = LowPassFilterNode;
