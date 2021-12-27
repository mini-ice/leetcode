import createTree from '../utils/createTree.mjs'
/**
 * Definition for a binary tree node.

 */
function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function (root, val = 0) {
  let sum = 0
  if (!root) return root
  const inOrder = (root) => {
    if (!root.left && !root.right) {
      root.val = root.val + sum
      sum = root.val
      return
    }

    root.right && inOrder(root.right)
    root.val += sum
    sum = root.val
    root.left && inOrder(root.left)
  }
  inOrder(root)
  return root
}

//[5,6,3,2,6]
const tree = createTree([2, 0, 3, -4, 1])
// console.log(tree)

console.log(convertBST(tree))
