/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxAncestorDiff = function (root) {
  let result = 0
  if (!root) return result
  const dfs = (tree, min, max) => {
    if (tree.val < min) {
      min = tree.val
    }
    if (tree.val > max) {
      max = tree.val
    }
    result = result < max - min ? max - min : result
    if (tree.left) dfs(tree.left, min, max)
    if (tree.right) dfs(tree.right, min, max)
  }
  dfs(root, root.val, root.val)
  return result
}
