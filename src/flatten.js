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
 * @return {void} Do not return anything, modify root in-place instead.
 */
// var flatten = function (root) {
//   if (!root.val) return null
//   debugger
//   const dfs = (tree) => {
//     if (!tree.left && !tree.right) {
//       return tree
//     }
//     let leftLeaf = null
//     if (tree.left) {
//       let t = tree.right
//       tree.right = tree.left
//       tree.left = null

//       leftLeaf = dfs(tree.right)
//       leftLeaf.right = t
//       return leftLeaf.right ? dfs(leftLeaf.right) : leftLeaf
//       // }
//     } else {
//       return tree.right ? dfs(tree.right) : tree
//     }
//   }
//   dfs(root)
//   console.log(root)
// }
var flatten = function (root) {
  let curr = root
  while (curr !== null) {
    if (curr.left !== null) {
      const next = curr.left
      let predecessor = next
      while (predecessor.right !== null) {
        predecessor = predecessor.right
      }
      predecessor.right = curr.right
      curr.left = null
      curr.right = next
    }
    curr = curr.right
  }
}
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

let a = new TreeNode(1, new TreeNode(2))
// let a = new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(5, undefined, new TreeNode(6)))
// console.log(a)
flatten(a)
