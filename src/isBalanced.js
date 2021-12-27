/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  if (!root) return true
  const dfs = (tree, depth = 0) => {
    if (!tree) return depth
    let left = dfs(tree.left, depth + 1)
    console.log(left)
    if (left === false) return false
    let right = dfs(tree.right, depth + 1)
    if (right === false) return false
    return Math.abs(left - right) < 2 ? Math.max(left, right) : false
  }
  return dfs(root)
}
// [3,9,20,null,null,15,7]
function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

const tree = new TreeNode(3)
let a = (tree.left = new TreeNode(9))
let b = (tree.right = new TreeNode(20))
let c = (b.left = new TreeNode(15))
let d = (b.right = new TreeNode(7))
// let c = (a.left = new TreeNode(3))
// let d = (a.right = new TreeNode(3))
// let e = (c.left = new TreeNode(4))
// let f = (c.right = new TreeNode(4))

console.dir(tree)
isBalanced(tree)
console.log(isBalanced(tree))
