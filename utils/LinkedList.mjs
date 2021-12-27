function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function LinkedList(nodes) {
  let linked = new ListNode(0);
  let point = linked;
  nodes.forEach((node) => {
    point.next = new ListNode(node);
    point = point.next;
  });
  return linked.next;
}

export default LinkedList;
