/**
 * Initialize your data structure here.
 */
var MyHashSet = function () {
  // this.hash = new Set();
  this.map = {};
  this.values = [];
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function (key) {
  // let index = this.map[key];
  // this.hash.add(key);
  // if (!(index + '')) {
  //   this.map[key] = this.values.length;
  //   this.values.push(key);
  // } else {
  //   this.values[index] = key;
  // }
  const index = this.map[key];
  if (index || index === 0) {
    this.values[index] = key;
    return;
  }
  this.map[key] = this.values.length;
  this.values.push(key);
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function (key) {
  // this.hash.delete(key);
  const index = this.map[key];
  if (index || index === 0) {
    delete this.map[key];
    this.values.splice(index, 1);
  }
};

/**
 * Returns true if this set contains the specified element
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function (key) {
  const index = this.map[key];
  return index || index === 0;
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */

let hash = new MyHashSet();

hash.add(1);
hash.add(2);
hash.add(1);
hash.add(1);
