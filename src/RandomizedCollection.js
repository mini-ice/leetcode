/**
 * Initialize your data structure here.
 */
var RandomizedCollection = function() {
  this.collection = []
  this.collectionMap = new Map()
};

/**
* Inserts a value to the collection. Returns true if the collection did not already contain the specified element. 
* @param {number} val
* @return {boolean}
*/
RandomizedCollection.prototype.insert = function(val) {
  this.collection.push(val)
  let result = this.collectionMap.has(val)
  result ? this.collectionMap.set(val,[...this.collectionMap.get(val),this.collection.length - 1]) : this.collectionMap.set(val,[this.collection.length - 1])
return !result
};

/**
* Removes a value from the collection. Returns true if the collection contained the specified element. 
* @param {number} val
* @return {boolean}
*/
RandomizedCollection.prototype.remove = function(val) {
  let index = this.collectionMap.has(val) ? this.collectionMap.get(val)[0] : undefined
  if(index === undefined)return false
  this.collection.splice(index,1)
  this.collectionMap.clear()
  for (let i = 0; i < this.collection.length; i++) {
    let result = this.collectionMap.has(this.collection[i])
    result ? this.collectionMap.set(this.collection[i],[...this.collectionMap.get(this.collection[i]),this.collection.length - 1]) : this.collectionMap.set(this.collection[i],[this.collection.length - 1])
  }
  return true
};

/**
* Get a random element from the collection.
* @return {number}
*/
RandomizedCollection.prototype.getRandom = function() {
let index = Math.floor(Math.random() * this.collection.length)
return this.collection[index]
};

/**
* Your RandomizedCollection object will be instantiated and called as such:
* var obj = new RandomizedCollection()
* var param_1 = obj.insert(val)
* var param_2 = obj.remove(val)
* var param_3 = obj.getRandom()
*/
// ["RandomizedCollection","insert","insert","insert","insert","insert","insert","remove","remove","remove","insert","remove"]
// [[],[9],[9],[1],[1],[2],[1],[2],[1],[1],[9],[1]]
let a = new RandomizedCollection()
console.log(a.insert(9))
console.log(a.insert(9))
console.log(a.insert(1))
console.log(a.insert(1))
console.log(a.insert(2))
console.log(a.insert(1))

console.log(a.remove(2))
console.log(a.remove(1))
console.log(a.remove(1))

console.log(a.insert(9))
console.log(a.remove(1))

