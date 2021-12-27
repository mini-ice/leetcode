Array.prototype.reduce1 = function (cb, initialValue) {
  if (this === null || this === undefined) throw new TypeError('');

  if (typeof cb !== 'function') throw new TypeError('');

  let _this = Object(this),
    k = 1,
    len,
    previousValue = _this[0] || undefined;

  if (arguments.length > 1) {
    previousValue = initialValue;
    k = 0;
  }

  len = _this.length >>> 0;

  let kValue;
  while (k < len) {
    if (k in _this) {
      kValue = _this[k];
      previousValue = cb(previousValue, kValue, k, _this);
    }

    k++;
  }

  return previousValue;
};

console.log([1, 2, 3, 4].reduce1((a, b) => a + b));
// console.log([1, 2, 3, 4].reduce1((a, b) => a + b, 0));
