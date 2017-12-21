'use strict';
const midi = require('midi');
const Node = require('./Node');

class MidiNode extends Node {
  constructor() {
    super();

    let input = new midi.input();
    input.getPortCount();
    input.getPortName(0);
    input.on('message', function(deltaTime, message) {
      if(message[0] === 144 && message[2] !== 0) {
        console.log(message);
        this.note = message[1];
      } else if(message[0] == 144) {
        delete this.note;
      }
    }.bind(this));
    
    input.openPort(0);
    input.ignoreTypes(false, false, false);
  }

  value() {
    if(this.note === undefined) {
      return 0;
    }

    // map the midi note to a pitch
    let halfStepsFromA440 = this.note - 69;
    return 440 * Math.pow(2, halfStepsFromA440 / 12);
  }
}

module.exports = MidiNode;
