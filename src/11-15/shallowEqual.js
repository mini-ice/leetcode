function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(x, y) {
  if (is(x, y)) return true;

  if (typeof x !== 'object' || x === null || typeof y !== 'object' || y === null) {
    return false;
  }

  const xKeys = Object.keys(x);
  const yKeys = Object.keys(y);

  if (xKeys.length !== yKeys.length) return false;

  for (let i = 0; i < xKeys.length; i++) {
    const key = xKeys[i];

    if (!Object.prototype.hasOwnProperty.call(y, key) || !is(x[key], y[key])) return false;
  }

  return true;
}
