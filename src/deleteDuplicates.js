import LinkedList from '../utils/LinkedList.mjs';

/**
 * Definition for singly-linked list.

 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
var deleteDuplicates = function (head) {
  let linked = new ListNode('head', head);
  let dp = new Map();
  while (head) {
    !dp.has(head.val) && dp.set(head.val, 0);
    let point = head.next;
    while (point && dp.has(point.val)) {
      point = point.next;
    }
    head.next = point;
    head = head.next;
  }
  return linked.next;
};

console.dir(deleteDuplicates(LinkedList([1, 1, 2, 3, 3])));
