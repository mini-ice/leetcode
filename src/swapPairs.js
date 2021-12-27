/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  let head01 = new ListNode(-1)
  head01.next = head
  let node = head01

  while (node.next && node.next.next) {
    let head = node.next
    let curNode = head.next
    head.next = curNode.next
    curNode.next = head
    node.next = curNode
    node = node.next.next
  }
  return head01.next
}

function ListNode(val) {
  this.val = val
  this.next = null
}

let a = new ListNode(1)
let b = (a.next = new ListNode(2))
let c = (b.next = new ListNode(3))
let d = (c.next = new ListNode(4))

console.log(swapPairs(a))
