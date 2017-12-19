'use strict';
const midi = require('midi');
const Node = require('./Node');

class MidiNode extends Node {
  constructor() {
    super();

    this.notes = new Set();

    let input = new midi.input();
    input.getPortCount();
    input.getPortName(0);
    input.on('message', function(deltaTime, message) {
      if(message[0] === 144 && message[2] !== 0) {
        this.notes.delete(message[1]);
      } else if(message[0] == 144) {
        this.notes.add(message[1]);
      }
    });
    
    input.openPort(0);
    input.ignoreTypes(false, false, false);
  }

  value() {
    return this.notes;
  }
}

module.exports = MidiNode;
