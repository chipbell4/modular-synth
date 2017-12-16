'use strict';

const Speaker = require('speaker');
const Readable = require('stream').Readable;

let stream = new Readable();
let t = 0.0
stream._read = function() {
  t += 0.01;

  let f = 30 + 10 * Math.sin(t);
  for(let k = 0; k < f; k++) {
    stream.push(String.fromCharCode(0));
  }

  for(let k = 0; k < f; k++) {
    stream.push(String.fromCharCode(127));
  }
};

// Create the Speaker instance
const speaker = new Speaker({
  channels: 1,
  bitDepth: 8,
  sampleRate: 20000
});

// PCM data from stdin gets piped into the speaker
stream.pipe(speaker);
