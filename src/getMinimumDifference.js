import createTree from '../utils/createTree.mjs'
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

var getMinimumDifference = function (root) {
  let ans = []
  const inOrder = (root) => {
    if (!root) return
    root.left && inOrder(root.left)
    ans.push(root.val)
    root.right && inOrder(root.right)
  }
  inOrder(root)
  if (!ans.length) return
  let min = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < ans.length - 1; i++) {
    min = Math.min(min, Math.abs(ans[i] - ans[i + 1]))
  }

  return min
}

let root = createTree([4, 1, null, null, 3])
// console.log(root)
getMinimumDifference(root)
