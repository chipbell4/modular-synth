'use strict';

const Speaker = require('speaker');
const Readable = require('stream').Readable;

const constants = require('./constants');
const Sine = require('./waveforms/sine');
const util = require('./waveforms/util');

let stream = new Readable();
let sampleIndex = 0;
let oscillators = [
  new Sine(220),
  new Sine(220 * 5 / 4),
  new Sine(220 * 3 / 2)
];

stream._read = function() {
  for(let k = 0; k < constants.SAMPLES_PER_READ; k++) {
    let t = util.sampleIndexToTime(sampleIndex);
    let outputs = [];
    for(let i = 0; i < oscillators.length; i++) {
      outputs.push(oscillators[i].value(t));
    }

    stream.push(util.waveformOutputsToBinary(outputs));
    sampleIndex++;
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
