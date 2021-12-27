// console.log(__dirname)




function ListNode(val) {
  this.val = val;
  this.next = null;
}

function List() {
  this.head = null
  this.length = 0
   this.insert = (node) =>{
    if(this.head){
      node.next = this.head
    }else{
      node.next = null
    }
    this.length++
    this.head = node
  }
  this.insertEnd = (node) => {
    if(!this.head){
      this.head = node
    }else{
      let curNode = this.head
      let lastNode = null
      while(curNode){
        if(!curNode.next) lastNode = curNode
        curNode = curNode.next
      }
      lastNode.next = node
    }
  }
}

const l1  = new List()
l1.insertEnd(new ListNode(2))
l1.insertEnd(new ListNode(2))
l1.insertEnd(new ListNode(3))

const l2  = new List()
l2.insertEnd(new ListNode(5))
l2.insertEnd(new ListNode(6))
l2.insertEnd(new ListNode(4))



var addTwoNumbers = function(l1, l2) {
  var sum = 0
  var head = {} 
  var curNode = head
  while(l1 || l2 || sum ){
    sum += (l1 && l1.val || 0) + (l2 && l2.val || 0)
    // console.log(sum,curNode)
    // if(Object.keys(curNode).length === 0) curNode = new ListNode(sum % 10)
    // else  {
    //   curNode.next = new ListNode(sum % 10)
    //   curNode = curNode.next
    // }
    curNode.next = new ListNode(sum%10)
    curNode = curNode.next 
    l1 = l1 && l1.next || null
    l2 = l2&& l2.next || null
    sum = Math.floor(sum/10)
  }
  return head
}


console.log(addTwoNumbers(l1.head,l2.head))