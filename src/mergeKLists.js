/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  let ans = new ListNode(-1)
  let cur = ans
  lists = lists.filter(item => item)
  while (lists.length > 0) {
    let minIndex = 0
    for (let i = 1; i < lists.length; i++) {
      minIndex = lists[i].val > lists[minIndex].val ? minIndex : i
    }
    cur.next = lists[minIndex]
    if (lists[minIndex].next) {
      lists[minIndex] = lists[minIndex].next
    } else {
      lists.splice(minIndex, 1)
    }
    cur = cur.next
  }
  return ans.next
}

function ListNode(val) {
  this.val = val
  this.next = null
}

let a = new ListNode(1)
a.next = new ListNode(4)
a.next.next = new ListNode(5)

let b = new ListNode(1)
b.next = new ListNode(3)
b.next.next = new ListNode(4)

let c = new ListNode(2)
c.next = new ListNode(6)

// mergeKLists([a, b, c])
mergeKLists([[]])

/*
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6
*/
