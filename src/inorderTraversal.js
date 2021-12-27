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
var inorderTraversal = function (root) {
  // let a = []
  // const dfs = (tree) => {
  //   if (!tree) return
  //   dfs(tree.left)
  //   a.push(tree.val)
  //   dfs(tree.right)
  // }
  // console.log(a)
  // return a

  let stack = [],
    res = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    let x = stack.pop();
    res.push(x.val);
    root = x.right;
  }
  return res;
};
