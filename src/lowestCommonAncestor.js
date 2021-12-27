/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  let result;

  function dfs(root, p, q) {
    if (result) return;
    if (root === null) return 0;

    const left = dfs(root.left, p, q);
    const right = dfs(root.right, p, q);

    if (left * right === 1) {
      result = root;
      return;
    }

    if (root.val === p.val || root.val === q.val) {
      if (left * right === 1) {
        result = root;
        return;
      }
      return 1;
    }

    return left || right;
  }

  dfs(root, p, q);

  return result;
};
