Array.prototype.filter1 = function (cb, thisArg) {
  if (this === null || this === undefined) throw new TypeError('');

  if (typeof cb !== 'function') throw new TypeError('');

  let _this = Object(this),
    k = 0,
    len,
    _thisArg;

  len = _this.length >>> 0;

  if (thisArg) {
    _thisArg = thisArg;
  }

  let kValue,
    result = [];
  while (k < len) {
    if (k in _this) {
      kValue = _this[k];

      let val = cb.call(thisArg, kValue, k, _this);

      if (!!val) result.push(kValue);
    }

    k++;
  }

  return result;
};

console.log([1, 2, 3, 4].filter((x) => x > 2));
console.log([1, 2, 3, 4].filter1((x) => x > 2));
