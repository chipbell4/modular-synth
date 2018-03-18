var yaml = require('node-yaml');
var treeSort = require('./tree-passing/tree-sort');
var ctx = require('axel');
const fs = require('fs');

var nodeColorMap = {
  Adder: [255, 127, 127],
  Envelope: [255, 255, 0],
  LowPassFilter: [255, 0, 255],
  Multiplier: [255, 127, 127],
  Noise: [127, 127, 127],
  Oscillator: [127, 127, 255],
  Sequencer: [127, 255, 127],
  Speaker: [255, 255, 255]
};

if(process.argv.length !== 3) {
  console.log('Usage: node index.js file.yml');
  process.exit(1);
}

let k = 0; // TODO: Remove
let rawResults = yaml.readSync(process.argv[2]);
let tree = {
  nodes: Object.keys(rawResults.nodes).map(name => {
    return { name };
  }),
  connections: Object.keys(rawResults.connections).map(input => {
    var output = rawResults.connections[input].split('.')[0];
    return [input, output, ++k]; // TODO: Don't use k here
  })
}

tree.nodes.push({ name: 'speaker' });

var layers = treeSort(tree);

// the max spread of the tree
var spread = Object.keys(layers)
  .map(index => layers[index].length)
  .reduce((a, b) => Math.max(a, b), 0);

var nodeLength = Object.keys(rawResults.nodes).reduce((a, b) => Math.max(a, b.length), 0);

const TOTAL_HEIGHT = 20;

var nodePositions = {};

ctx.clear();
Object.keys(layers)
  .forEach(layer => {
    var nodes = layers[layer];

    var x = layer * (nodeLength + 2);
    
    nodes.forEach((node, index) => {
      var center = TOTAL_HEIGHT / 2;
      var y = Math.round(center + (index - nodes.length / 2) * TOTAL_HEIGHT / spread);

      // store the node position too
      nodePositions[node] = { x, y };

      var nodeType = rawResults.nodes[node];
      if(nodeType === undefined) {
        nodeType = 'Speaker';
      }
      var color = nodeColorMap[nodeType];

      ctx.bg(color[0], color[1], color[2]);
      ctx.fg(0, 0, 0);
      ctx.text(x, y, node);
    });
  });

// now draw connections
ctx.bg(127, 127, 127);
tree.connections.forEach(connection => {
  var node1 = connection[0];
  var node2 = connection[1];
  var startX = nodePositions[node1].x - 1;
  var startY = nodePositions[node1].y;
  var endX = nodePositions[node2].x + node2.length;
  var endY = nodePositions[node2].y;
  ctx.line(startX, startY, endX, endY);
});

ctx.cursor.restore();
