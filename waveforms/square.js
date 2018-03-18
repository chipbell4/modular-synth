module.exports = function(t, carrier, amplitude) {
  let period = 1 / carrier;
  let x = (t % period) / period;
  const d = 0.01;
  if(x < 0.5 - d) {
    return 0;
  } else if(x > 0.5 - d && x < 0.5 + d) {
    let slope = amplitude / 2 / d;
    let intercept = -(0.5 - d) * slope;
    return slope * x + intercept;
  } else {
    return amplitude;
  }
}
