'use strict';

const Node = require('./Node');

class NoiseNode extends Node {
  constructor() {
    super();

    this.outputStream._read = function() {
      for(var i = 0; i < 2000; i++) {
        let ascii = Math.floor(128 * Math.random());
        this.outputStream.push(String.fromCharCode(ascii));
      }
    }.bind(this);
  }
}

module.exports = NoiseNode;
