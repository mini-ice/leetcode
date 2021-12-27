
/**
 * 
 */
function treeRightMove(root, k) {
  const arr = [root], quene = [root];

  while(quene.length) {
    let node = quene.shift();
    if(node) {
      level++;
      arr.push(node.left, node.right);
      quene.push(node.left, node.right)
    }
  }

  let x = 0, ret = [];
  while(arr.length) {
    let count = Math.pow(2, x);
    let newArr = new Array(count).fill(null);
    for(let i = 0; i < count; i++) {
      newArr[(i + k) % count] = arr[i];
    }
    arr.splice(0, count);
    ret.push(...newArr);
  }

  let newTree;
  let level = 0;
  while(ret.length) {
    let count = Math.pow(2, x);
    

  }
}
// treeRightMove()
