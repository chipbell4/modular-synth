'use strict';

const Node = require('./Node');

module.exports = function(value) {
  if(typeof value === 'string') {
    return value;
  }
  
  if(value instanceof Array) {
    return value;
  }

  if(typeof value === 'number') {
    return () => value;
  }

  if(typeof value === 'function') {
    return value;
  }

  if(value instanceof Node) {
    return value.value;
  }
}
