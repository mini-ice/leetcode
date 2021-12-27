import LinkedList from '../utils/LinkedList.mjs';

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
var mergeTwoLists = function (l1, l2) {
  let l = new ListNode('head', l1);
  let point = l;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      point.next = l1;
      l1 = l1.next;
    } else {
      point.next = l2;
      l2 = l2.next;
    }
    point = point.next;
  }
  if(l1) point.next = l1
  else if(l2) point.next = l2
  console.log(l.next);
  return l.next;
};

let l1 = new LinkedList([1, 2, 4]);
let l2 = new LinkedList([1, 3, 4]);

mergeTwoLists(l1, l2);

//1-2-4
//1-3-4
