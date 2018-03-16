'use strict';

const yaml = require('node-yaml');
const resolveValue = require('./nodes/resolve-value');

var nodeTypes = ['Noise', 'Envelope', 'Adder', 'Oscillator', 'LowPassFilter', 'Speaker', 'Sequencer', 'Keyboard', 'Multiplier'].reduce((a, b) => {
  a[b] = require(`./nodes/${b}Node`);
  return a;
}, {});

if(process.argv.length !== 3) {
  console.log('Usage: node index.js file.yml');
  process.exit(1);
}

let results = yaml.readSync(process.argv[2]);

// TODO: Validation

// Build nodes
let nodes = {};
Object.keys(results.nodes).forEach(nodeName => {
  let nodeType = results.nodes[nodeName];
  nodes[nodeName] = new nodeTypes[nodeType];
});
nodes.speaker = new nodeTypes.Speaker();

// Set constant values
Object.keys(results.values).forEach(key => {
  let nodeName, property;
  nodeName = key.split('.')[0];
  property = key.split('.')[1];
  nodes[nodeName][property] = resolveValue(results.values[key]);
});

// build connections
Object.keys(results.connections).forEach(sender => {
  let receiver = results.connections[sender];
  let nodeName, property;
  nodeName = receiver.split('.')[0];
  property = receiver.split('.')[1];

  nodes[nodeName][property] = nodes[sender].value;
});
