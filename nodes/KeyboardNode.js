'use strict';
const Node = require('./Node');
const fork = require('child_process').fork;

class KeyboardNode extends Node {
  constructor() {
    super();

    this.currentPitch = null;

    const program = require.resolve('../keyboard-processor.js');
    const child = fork(program, [], {
      stdio: [0, 1, 2, 'ipc']
    });

    console.log(child);

    child.on('message', message => this.currentPitch = Number(message));
  }

  value(t) {
    if(this.currentPitch !== null) {
      return this.currentPitch;
    }

    return 0;
  }
}

module.exports = KeyboardNode;
