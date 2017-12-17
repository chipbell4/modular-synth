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
  }
};
