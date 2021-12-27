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
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function (root, sum) {
  let ans = []
  const recursive = (root, sum, list) => {
    if (!root) return
    else if (root.left || root.right) {
      root.left && recursive(root.left, sum - root.val, [...list, root.val])
      root.right && recursive(root.right, sum - root.val, [...list, root.val])
    } else if (!root.left && !root.right && root.val === sum) {
      ans.push([...list, root.val])
      return
    }
  }
  recursive(root, sum, [])
  console.log(ans)
  return ans
}

let root = createTree([5,4,8,11,null,13,4,7,2,null,null,5,1])
// console.dir(root)
pathSum(root, 22)
