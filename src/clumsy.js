/**
 * @param {number} N
 * @return {number}
 */
//  示例 1：

//  输入：4
//  输出：7
//  解释：7 = 4 * 3 / 2 + 1
//  示例 2：

//  输入：10
//  输出：12
//  解释：12 = 10 * 9 / 8 + 7 - 6 * 5 / 4 + 3 - 2 * 1
// 0 ,  1 , 2,  3   4
var clumsy = function (N) {
  let stack = [];
  let i = 0;
  while (i < N) {
    let n = N - i;
    if (i % 4 === 0) {
      stack.push(n);
    } else if (i % 4 === 1) {
      stack.push(stack.pop() * n);
    } else if (i % 4 === 2) {
      stack.push(Math.floor(stack.pop() / n));
    } else if (i % 4 === 3) {
      stack.push(i < 4 ? stack.pop() + n : stack.pop() - n);
    }
    i++;
  }
  return stack.reduce((res, item) => (res === '' ? item : res - item), '');
};

// clumsy(10);
console.log(clumsy(10));
