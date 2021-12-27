Array.prototype.forEach1 = function (cb, thisArg) {
  if (this === null || this === undefined) throw new TypeError('');

  if (typeof cb !== 'function') throw new TypeError('');

  let _this = Object(this),
    k = 0,
    len,
    _thisArg;

  if (thisArg) {
    _thisArg = thisArg;
  }

  len = _this.length >>> 0;

  while (k < len) {
    let kValue;
    if (k in _this) {
      kValue = _this[k];
      cb.call(_thisArg, kValue, k, _this);
    }

    k++;
  }
};

let obj = { a: 1 };

[1, 2, 3, 4].forEach((...args) => {
  console.group('------- forEach -------');
  console.log(...args, this);
  console.groupEnd();
});

[1, 2, 3, 4].forEach(function (...args) {
  console.group('------- forEach this = obj -------');
  console.log(...args);
  console.log(this);
  console.groupEnd();
}, obj);

[1, 2, 3, 4].forEach1((...args) => {
  console.group('------- forEach1 -------');
  console.log(...args, this);
  console.groupEnd();
});

[1, 2, 3, 4].forEach1(function (...args) {
  console.group('------- forEach1 this = obj -------');
  console.log(...args);
  console.log(this);
  console.groupEnd();
}, obj);
