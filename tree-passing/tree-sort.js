module.exports = function(tree) {
  var nodeNames = tree.nodes.map(node => node.name);

  var getInputNodes = function(nodeName) {
    var nodes = { };

    tree.connections
      .filter(connection => connection[1] === nodeName)
      .forEach(connection => nodes[connection[2]] = connection[0]);

    // convert object into array, sorted by ports
    var ports = Object.keys(nodes);
    ports.sort();
    return ports.map(port => nodes[port])
  }

  // get the first root node
  var interiorNodes = tree.connections.map(connection => connection[0]);
  var rootNode = nodeNames.filter(nodeName => interiorNodes.indexOf(nodeName) === -1)[0];

  if(rootNode === undefined) {
    throw new Error('No root node found');
  }

  var layers = { };
  var toVisit = [];
  toVisit.push({ name: rootNode, layer: 0 });
  var visited = new Set();

  while(toVisit.length > 0) {
    var current = toVisit.shift();

    if(visited.has(current.name)) {
      continue;
    }

    if(layers[current.layer] === undefined) {
      layers[current.layer] = [];
    }

    layers[current.layer].push(current.name);

    getInputNodes(current.name).forEach(name => {
      toVisit.push({ name, layer: current.layer + 1 });
    });

    visited.add(current.name);
  }

  return layers;
};
