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
var sumOfLeftLeaves = function (root, left) {
  // let ans = 0
  // if (!root) return 0
  // const dfs = (root, left) => {
  //   if (!root.left && !root.right && left) {
  //     ans += root.val
  //     return
  //   }
  //   root.left && dfs(root.left, true)
  //   root.right && dfs(root.right, false)
  // }
  // dfs(root, false)
  // return ans
  let ans = 0
  if (!root) return ans
  if (!root.left && !root.right && left) {
    ans += root.val
  } else {
    root.left && (ans += sumOfLeftLeaves(root.left, true))
    root.right && (ans += sumOfLeftLeaves(root.right, false))
  }
  return ans
}

console.log(sumOfLeftLeaves(createTree([3, 9, 20, null, null, 15, 7])))
