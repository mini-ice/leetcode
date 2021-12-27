var removeNthFromEnd = function (head, n) {
  let fast = head,
    slow = head
  while (--n) {
    fast = fast.next
  }
  if (!fast.next) return head.next
  fast = fast.next
  while (fast && fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  console.log(head)
  return head
}

let list = {
  val: 1,
  next: null,
}
let list01 = {
  val: 1,
  next: {
    val: 2,
    next: null,
    // next: {
    //   val: 3,
    //   next: {
    //     val: 4,
    //     next: null,
    //   },
    // },
  },
}
removeNthFromEnd(list, 1)

removeNthFromEnd(list01, 2)
