'use strict';

const Readable = require('stream').Readable;

class Node {
  constructor() {
    this.streams = {};
    this.outputStream = new Readable();
  }

  receive(streamId, otherNode) {
    otherNode.outputStream.pipe(this.streams[streamId]);
  }
}
