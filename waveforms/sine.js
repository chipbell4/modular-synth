module.exports = function(t, carrier, amplitude) {
  let inner = 2 * Math.PI * carrier * t;
  return 0.5 * amplitude * (1 + Math.sin(inner));
};
