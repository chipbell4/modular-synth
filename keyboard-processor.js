'use strict';

console.log('Keyboard process up!');

// build out our map
let keys = "awsedftgyhujkolp;'";
let fundamental = 261.6;
let keyMap = {};
for(let i = 0; i < keys.length; i++) {
  let frequency = fundamental * Math.pow(2, i / 12);
  let letter = keys[i];
  keyMap[letter] = frequency;
}

const stdin = process.openStdin();
stdin.setRawMode(true);
stdin.resume();
stdin.on('data', (key) => {
  key = key.toString();

  // preserve ctrl-c behavior
  if(key === '\u0003') {
    process.exit();
  }

  if(key in keyMap && process.send) {
    process.send(keyMap[key]);
  }
});
