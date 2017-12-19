'use strict';

const midi = require('midi');
const Readable = require('stream').Readable;

const Node = require('./Node');
const util = require('../util');

class MidiNode extends Node {
  constructor() {
    super();

    let currentValue = 70;

    let input = new midi.input();
    input.getPortCount();
    input.getPortName(0);
    input.on('message', function(deltaTime, message) {
      if(message[0] === 144) {
        currentValue = message[1];
      }
    });
    
    input.openPort(0);
    input.ignoreTypes(false, false, false);
    
    this.outputStream = new Readable({ highWaterMark: 1 });
    this.outputStream._read = function() {
      this.outputStream.push(String.fromCharCode(currentValue));
    }.bind(this);
  }
}

module.exports = MidiNode;
