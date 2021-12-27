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
// var rob = function (root) {
//   let map = new Map()
//   const dfs = (tree, boolean, val) => {
//     if (!tree) return val
//     let index = boolean ? '0' : '1'

//     if (!map.get(tree) || map.get(tree)[index] === undefined) {
//       let result = 0
//       if (boolean) {
//         let a = dfs(tree.left, false, val) + dfs(tree.right, false, val) + tree.val
//         let b = dfs(tree.left, true, val) + dfs(tree.right, true, val)
//         result = Math.max(a, b)
//       } else {
//         result = dfs(tree.left, true, val) + dfs(tree.right, true, val)
//       }
//       map.has(tree) ? map.set(tree, { [index]: result }) : map.set(tree, { ...map.get(tree), [index]: result })
//       return result
//     } else {
//       return map.get(tree)[index]
//     }
//   }
//   console.log(dfs(root, false, 0), dfs(root, true, 0))
//   return Math.max(dfs(root, false, 0), dfs(root, true, 0))
// }
var rob = function (root) {
  const dfs = (node) => {
    if (node === null) {
      return [0, 0]
    }
    const l = dfs(node.left)
    const r = dfs(node.right)
    const selected = node.val + l[1] + r[1]
    const notSelected = Math.max(l[0], l[1]) + Math.max(r[0], r[1])
    return [selected, notSelected]
  }

  const rootStatus = dfs(root)
  return Math.max(rootStatus[0], rootStatus[1])
}

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

let root = new TreeNode(3)
let a = (root.left = new TreeNode(2))
let b = (root.right = new TreeNode(3))
let c = (a.right = new TreeNode(3))
let d = (b.right = new TreeNode(1))

rob(root)
