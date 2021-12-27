// [1,[2,[3,[4,[5,null]]]]]

let arr = [1, [2, [3, [4, [5, null]]]]];

function reverseArr(arr) {
  let quene = [arr],
    child = null;

  while (quene.length) {
    const val = quene.shift();
    if (val) {
      quene.push(val[1]);
      val[1] = child;
      child = val;
    }
  }

  console.log(child);
  return child;
}

reverseArr(arr);
