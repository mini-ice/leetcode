/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  // let map = new Map()
  const dfs = (tree1, tree2) => {
    if (tree1 && tree2) {
      if (tree1.val === tree2.val) {
        if (dfs(tree1.left, tree2.left)) {
          return dfs(tree1.right, tree2.right)
        }
        return false
      }
      return false
    } else if (!tree1 && !tree2) {
      return true
    } else {
      return false
    }
  }
  return dfs(p, q)
}

// [10,5,15]
// [10,5,null,null,15]
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

let p = new TreeNode(10, new TreeNode(5), new TreeNode(15))
let q = new TreeNode(10, new TreeNode(5, null, new TreeNode(15)))

console.log(isSameTree(p, q))
