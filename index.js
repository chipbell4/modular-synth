'use strict';

const yaml = require('node-yaml');
const resolveValue = require('./nodes/resolve-value');
const fs = require('fs');

console.log('Loading nodes...')
const nodeTypes = fs.readdirSync('./nodes').reduce((a, filename) => {
  if(/.Node\.js$/.test(filename)) {
    const nodeType = filename.replace(/Node\.js/, '');
    console.log(`  ${nodeType} -> ${filename}`);
    a[nodeType] = require('./nodes/' + filename);
  }

  return a;
}, {});
console.log('Done');

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
