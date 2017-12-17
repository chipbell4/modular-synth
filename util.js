'use strict';

module.exports = {
  encodeValueAs16Bit: function(value) {
    value = Math.floor(value) % 65536;

    let upperBits = Math.floor(value / 0x100);
    let lowerBits = value % 0x100;
    return String.fromCharCode(upperBits) + String.fromCharCode(lowerBits);
  },

  decodeValueFrom16Bit: function(string) {
    let upperBits = string.charCodeAt(0);
    let lowerBits = string.charCodeAt(1);

    return (upperBits << 8) + lowerBits;
  },
  
  byteToFrequency: function(value) {
    let halfStepDifference = value.charCodeAt(0) - 69;
    return 440 * Math.pow(2, halfStepDifference / 12);
  },

  frequencyToByte: function(frequency) {
    let frequencyRatio = frequency / 440;
    let halfSteps = Math.round(12 * Math.log(frequencyRatio) / Math.log(2));
    return String.fromCharCode(halfSteps + 69);
  },
};
