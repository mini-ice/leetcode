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
 * @return {boolean}
 */
var isEvenOddTree = function (root) {
  let quene = [root],
    level = 0;

  while (true) {
    let currentQuene = [],
      prevVal;
    while (quene.length) {
      const node = quene.shift();
      if (isOdd(level) && (isOdd(node.val) || (prevVal && prevVal <= node.val))) return false;
      if (!isOdd(level) && (!isOdd(node.val) || (prevVal && prevVal >= node.val))) return false;
      prevVal = node.val;
      node.left && currentQuene.push(node.left);
      node.right && currentQuene.push(node.right);
    }
    if (!currentQuene.length) break;
    quene = currentQuene;
    level++;
  }

  return true;
};

function isOdd(val) {
  return val % 2 === 1;
}
