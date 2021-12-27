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
const recoverTree = (root) => {
  let prevNode = new TreeNode(-Infinity)
  let firstError
  let secondError
  const inOrder = (root) => {
    // 中序遍历的顺序 左|根|右
    if (root == null) return
    inOrder(root.left)
    if (prevNode.val >= root.val) {
      if (firstError == null) {
        // 当前找到的是第一个错误
        firstError = prevNode // 第一个错误点是prevNode
      }
      secondError = root // 待交换的第二个错误点，都是当前节点
    }
    prevNode = root // 更新prevNode为当前节点
    inOrder(root.right)
  }
  inOrder(root)
  const temp = firstError.val
  firstError.val = secondError.val
  secondError.val = temp
}
