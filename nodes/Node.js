'use strict';

class Node {
  constructor() {
    // so this.value can be assigned more easily
    this.value = this.value.bind(this);
  }

  value(t) {
    return 0;
  }
}

module.exports = Node;
