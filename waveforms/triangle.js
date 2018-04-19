module.exports = function(t, carrier, amplitude) {
  let period = 1 / carrier;
  let localT = (t % period) / period;

  return Math.abs(localT - 0.5);
}
