/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
  let stack = [];
  this.tree = [];
  this.key = -1;
  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    let x = stack.pop();
    this.tree.push(x.val);
    root = x.right;
  }
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  this.key++;
  return this.tree[this.key];
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.tree[this.key + 1] === 0 || !!this.tree[this.key + 1];
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
