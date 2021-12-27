/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  if (!head) return null
  let slow = head,
    fast = head
  let preslow
  while (fast && fast.next) {
    preslow = slow
    slow = slow.next
    fast = fast.next.next
  }
  let tree = new TreeNode(slow.val) // 根结点
  if (preslow) {
    // 左边子节点
    preslow.next = null
    tree.left = sortedListToBST(head)
  }
  tree.right = sortedListToBST(slow.next)
  // console.log(tree)
  return tree
}

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

function createList(list) {
  let head, point
  list.forEach((val) => {
    if (!head) {
      head = point = new ListNode(val)
    } else {
      point.next = new ListNode(val)
      point = point.next
    }
  })
  return head
}

sortedListToBST(createList([-10, -3, 0, 5, 9]))
