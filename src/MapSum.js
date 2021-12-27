function MapSumIterator(keys, data) {
  let index = 0,
    len = keys.length;

  this.next = function () {
    let val,
      result = {},
      key;

    while (true) {
      if (index < len) {
        result.done = false;
        key = keys[index++];
        val = data[key];
        if (val === undefined && !Object.prototype.hasOwnProperty.call(data, val)) {
          continue;
        }
        result.val = val;
      } else {
        result.done = true;
        keys = null;
        data = null;
      }
      return result;
    }
  };
}

function getKeys(data) {
  let result = [];
  for (let key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      result.push(key);
    }
  }

  return result;
}

var MapSum = function () {
  this.size = 0;
  this._data = {};
  if (!(this instanceof MapSum)) return new MapSum();
};

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
  this._data[key] = val;
  return this;
};

MapSum.prototype.keys = function () {
  return new MapSumIterator(getKeys(this.data), this.data);
};

MapSum.prototype[Symbol.iterator] = function () {
  return this.keys();
};

/**
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function (prefix) {
  const keys = this.keys();
  let sum = 0;
  for (let key of keys) {
    if (key.startWith(prefix)) {
      sum += this._data[key];
    }
  }
  return sum;
};

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
let x = new MapSum();
x.insert('apple', 3);
console.log(x.sum());
