function DLinkedNode(key, val, next, prev) {
  this.key = key;
  this.val = val;
  this.next = next;
  this.prev = prev;
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  // this.link = null;
  this.head = new DLinkedNode('head', 'head');
  this.tail = new DLinkedNode('tail', 'tail');
  this.hash = new Map();
  this.size = 0;
  this.capacity = capacity;

  this.head.next = this.tail;
  this.tail.prev = this.head;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.hash.has(key)) return -1;

  const linkedNode = this.hash.get(key);
  linkedNode.prev.next = linkedNode.next;
  linkedNode.next.prev = linkedNode.prev;
  this.tail.prev.next = linkedNode;
  linkedNode.prev = this.tail.prev;
  linkedNode.next = this.tail;
  this.tail.prev = linkedNode;

  // linkedNode.prev.next = linkedNode.next;

  return linkedNode.val;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.get(key) === -1) {
    const linkedNode = new DLinkedNode(key, value, null, null);
    linkedNode.prev = this.tail.prev;
    linkedNode.next = this.tail;
    this.tail.prev = linkedNode;
    linkedNode.prev.next = linkedNode;
    this.hash.set(key, linkedNode);
    this.size++;
    if (this.size > this.capacity) {
      const key = this.head.next.key;
      this.head.next = this.head.next.next;
      this.head.next.prev = this.head;
      this.hash.delete(key);
      this.size--;
    }
  } else {
    this.tail.prev.val = value;
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const cache = new LRUCache(2 /* 缓存容量 */);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 返回  1
cache.put(3, 3); // 该操作会使得密钥 2 作废
console.log(cache.get(2)); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
console.log(cache.get(1)); // 返回 -1 (未找到)
console.log(cache.get(3)); // 返回  3
console.log(cache.get(4)); // 返回  4
