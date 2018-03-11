'use strict';
const Node = require('./Node');

class KeyboardNode extends Node {
  constructor() {
    super();
    
    // build out our map
    let keys = "awsedftgyhujkolp;'";
    let fundamental = 261.6;
    this.keyMap = {};
    for(let i = 0; i < keys.length; i++) {
      let frequency = fundamental * Math.pow(2, i / 12);
      let letter = keys[i];
      this.keyMap[letter] = frequency;
    }

    this.currentKey = null;

    const stdin = process.openStdin();
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on('data', (key) => {
      key = key.toString();

      // preserve ctrl-c behavior
      if(key === '\u0003') {
        process.exit();
      }

      if(key in this.keyMap) {
        this.currentKey = key;
      }
    });
  }

  value(t) {
    if(this.currentKey in this.keyMap) {
      return this.keyMap[this.currentKey];
    }

    return 0;
  }
}

module.exports = KeyboardNode;
