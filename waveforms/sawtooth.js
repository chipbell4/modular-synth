module.exports = function(t, carrier, amplitude) {
  let period = 1 / carrier;
  return (t % period) / period - 1;
};
