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

/* dfs */
// var maxDepth = function (root) {
//   let max = 1
//   if (!root) return 0
//   const dfs = (tree, dep) => {
//     if (!tree.left && !tree.right) {
//       max = Math.max(dep, max)
//     }
//     if (tree.left) {
//       dfs(tree.left, dep + 1)
//     }
//     if (tree.right) {
//       dfs(tree.right, dep + 1)
//     }
//   }
//   dfs(root, 1)
//   console.log(max)
//   return max
// }

/* bfs */
var maxDepth = function (root) {
  if (!root) return 0
  let max = 0
  let stack = [root]
  while (stack.length > 0) {
    let newStack = []
    stack.forEach((node) => {
      node.left && newStack.push(node.left)
      node.right && newStack.push(node.right)
    })
    stack = newStack
    max++
  }
  return max
}
