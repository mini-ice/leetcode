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
 * @return {number[]}
 */
var findMode = function (root) {
  let ans = []
  let max = 0
  let map = new Map()
  const dfs = (root) => {
    if (root) {
      dfs(root.left)
      map.has(root.val) ? map.set(root.val, map.get(root.val) + 1) : map.set(root.val, 1)
      let count = map.get(root.val)
      if (count > max) {
        ans = [root.val]
        max = count
      } else if (count === max) {
        ans.push(root.val)
      }
      dfs(root.right)
    }
  }
  dfs(root)
  console.log(map, ans)
  return ans
}

let root = createTree([2, 1])
findMode(root)
