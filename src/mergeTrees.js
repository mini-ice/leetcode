import createTree from '../utils/createTree.mjs'
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function (t1, t2) {
  if (!t1 && !t2) return t1
  else if (t1 && !t2) return t1
  else if (!t1 && t2) return t2
  else {
    t1.val = t1.val + t2.val
    t1.left = mergeTrees(t1.left, t2.left)
    t1.right = mergeTrees(t1.right, t2.right)
  }
  return t1
}

let t1 = createTree([1, 3, 2, 5])
let t2 = createTree([2, 1, 3, null, 4, null, 7])
console.dir(t1)
console.dir(t2)


console.log(mergeTrees(t1, t2))
