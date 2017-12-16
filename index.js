'use strict';

const Speaker = require('speaker');
const Readable = require('stream').Readable;

let stream = new Readable();
let t = 0.0
stream._read = function() {
  for(let k = 0; k < 2000; k++) {
    let amplitude = (Math.sin(t) + 1) * 0.5 * 65535;
    let letter = String.fromCharCode(Math.floor(amplitude));
    stream.push(letter);
    t += 0.1;
  }
};

// Create the Speaker instance
const speaker = new Speaker({
  channels: 1,
  bitDepth: 16,
  sampleRate: 20000
});

// PCM data from stdin gets piped into the speaker
stream.pipe(speaker);
