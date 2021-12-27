/**
 * Definition for a binary tree node.
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (preorder.length === 0) return null;
  if (preorder.length === 1) return new TreeNode(preorder[0], null, null);

  let val = preorder[0];
  let index = inorder.indexOf(val);
  const preorderWithLeft = preorder.slice(1, index + 1),
    preorderWithRight = preorder.slice(index + 1);

  const inorderWithLeft = inorder.slice(0, index),
    inorderWithRight = inorder.slice(index + 1);

  const root = new TreeNode(
    val,
    buildTree(preorderWithLeft, inorderWithLeft),
    buildTree(preorderWithRight, inorderWithRight)
  );

  return root;
};
console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
