const Node = require('./node');
const constants = require('../constants');

class EnvelopeNode extends Node {
  constructor() {
    super();

    this.trigger = () => 0;
    this.attack = () => 0.1;
    this.decay = () => 0.2;
    this.sustain = () => 0.5;
    this.release = () => 0.2;

    this.mode = 'release';
    this.currentValue = 0;
  }

  value(t) {
    this.doStateTransition(t);
    switch(this.mode) {
      case 'attack':
        this.doAttack(t);
        break;
      case 'decay':
        this.doDecay(t);
        break;
      case 'release':
        this.doRelease(t);
    }

    return this.currentValue;
  }

  doStateTransition(t) {
    if(this.mode === 'release' && this.trigger(t) !== 0) {
      this.mode = 'attack';
    } else if(this.mode === 'attack' && this.trigger(t) === 0) {
      this.mode = 'release';
    } else if(this.mode === 'attack' && this.trigger(t) !== 0 && this.currentValue >= 1.0) {
      this.mode = 'decay';
    } else if(this.mode === 'decay' && this.trigger(t) === 0) {
      this.mode = 'release';
    } else if(this.mode === 'decay' && this.trigger(t) !== 0 && this.currentValue <= this.sustain()) {
      this.mode = 'sustain';
    } else if(this.mode === 'sustain' && this.trigger(t) === 0) {
      this.mode = 'release';
    }
  }

  doAttack(t) {
    this.currentValue += 1.0 / this.attack(t) / constants.SAMPLE_RATE;
    this.currentValue = Math.min(1.0, this.currentValue);
  }

  doDecay(t) {
    this.currentValue -= 1.0 / this.decay(t) / constants.SAMPLE_RATE;
    this.currentValue = Math.max(this.currentValue, this.sustain(t));
  }

  doRelease(t) {
    this.currentValue -= this.sustain(t) / this.release(t)  / constants.SAMPLE_RATE;
    this.currentValue = Math.max(0, this.currentValue);
  }
}

module.exports = EnvelopeNode;
