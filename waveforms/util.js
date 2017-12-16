'use strict';

const constants = require('../constants');

module.exports = {
  waveformOutputsToBinary: function(outputs) {
    let total = 0;
    for(let i = 0; i < outputs.length; i++) {
      total += outputs[i];
    }
    total /= outputs.length;

    let asByte = Math.floor(total * 127);
    return String.fromCharCode(asByte);
  },

  sampleIndexToTime: function(sampleIndex) {
    return sampleIndex / constants.SAMPLE_RATE;
  }
};
