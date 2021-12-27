import LinkedList from '../utils/LinkedList.mjs';
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
var rotateRight = function (head, k) {
  let len = 0;
  let linked = new ListNode('head', head);
  while (head) {
    len++;
    head = head.next;
  }
  let move = k % len;
  if (len <= 1 || move === 0 || move === len) return linked.next;
  let fast = linked.next,
    slow = linked.next;
  while (move > 0) {
    fast = fast.next;
    move--;
  }
  while (fast.next && slow.next) {
    fast = fast.next;
    slow = slow.next;
  }
  // console.log(fast, slow);

  let header = slow.next;
  slow.next = null;
  fast.next = linked.next;
  linked.next = header;
  console.log(linked.next);
  return linked.next;
};

// 1,2,3,4,5
rotateRight(LinkedList([1, 2, 3, 4, 5]), 2);
