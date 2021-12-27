Array.prototype.map1 = function (cb, thisArg) {
  if (this === null || this === undefined) throw new TypeError('this is not null or not undefined');
  if (typeof cb !== 'function') throw new TypeError('');

  let _this = Object(this),
    len = _this.length >>> 0,
    k = 0,
    _thisArg,
    result = [];

  if (thisArg) {
    _thisArg = thisArg;
  }

  while (k < len) {
    let kValue;
    if (k in _this) {
      kValue = _this[k];
      let val = cb.call(_thisArg, kValue, k, _this);
      result.push(val);
    }

    k++;
  }

  return result;
};

let x = { a: 2 };

console.log([1, 2, 3, 4].map((item) => item + 1));
console.log([1, 2, 3, 4].map1((item) => item + 1));

[1, 2, 3, 4].map(function (item) {
  return item + this.a;
}, x);
[1, 2, 3, 4].map1(function (item) {
  return item + 1;
}, x);

Array.prototype.map2 = function (cb, thisArgs) {
  if (this === null || this === undefined) throw new TypeError();
  if (typeof cb !== 'function') throw new TypeError('');

  let _this = Object(this),
    len = _this.length || 0,
    k = 0,
    _thisArg,
    result = [];

  if (thisArgs) {
    _thisArg = thisArgs;
  }

  while (k < len) {
    let kValue;
    if (k in _this) {
      kValue = _this[k];
      let val = cb.call(_thisArg, kValue, k, _this);
      result.push(val);
    }
    k++;
  }

  return result;
};
