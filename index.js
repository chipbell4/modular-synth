'use strict';

const Speaker = require('speaker');
const Readable = require('stream').Readable;

const constants = require('./constants');

let stream = new Readable();
let t = 0.0
stream._read = function() {
  t += 0.02;

  let f = 30 + 5 * Math.sin(t);
  for(let k = 0; k < f; k++) {
    stream.push(String.fromCharCode(0));
  }

  for(let k = 0; k < f; k++) {
    stream.push(String.fromCharCode(127));
  }
};

// Create the Speaker instance
const speaker = new Speaker({
  channels: constants.CHANNELS,
  bitDepth: constants.BIT_DEPTH,
  sampleRate: constants.SAMPLE_RATE
});

// PCM data from stdin gets piped into the speaker
stream.pipe(speaker);
