'use strict';

const Speaker = require('speaker');
const Readable = require('stream').Readable;

const constants = require('./constants');
const Sine = require('./waveforms/sine');
const util = require('./waveforms/util');

let stream = new Readable();
let sampleIndex = 0;
let oscillator = new Sine(440);
stream._read = function() {
  for(let k = 0; k < constants.SAMPLES_PER_READ; k++) {
    let t = util.sampleIndexToTime(sampleIndex);
    let outputs = [oscillator.value(t)];
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
