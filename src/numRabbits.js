/**
 * 
 * 示例:
输入: answers = [1, 1, 2]
输出: 5
解释:
两只回答了 "1" 的兔子可能有相同的颜色，设为红色。
之后回答了 "2" 的兔子不会是红色，否则他们的回答会相互矛盾。
设回答了 "2" 的兔子为蓝色。
此外，森林中还应有另外 2 只蓝色兔子的回答没有包含在数组中。
因此森林中兔子的最少数量是 5: 3 只回答的和 2 只没有回答的。

输入: answers = [10, 10, 10]
输出: 11

输入: answers = []
输出: 0
说明:

answers 的长度最大为1000。
answers[i] 是在 [0, 999] 范围内的整数。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/rabbits-in-forest
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} answers
 * @return {number}
 */
var numRabbits = function (answers) {
  let hash = new Map();
  let count = 0;
  for (let i = 0; i < answers.length; i++) {
    let val = answers[i];
    hash.has(val) ? hash.set(val, hash.get(val) + 1) : hash.set(val, 1);
  }
  hash.forEach((value, key) => {
    count += Math.ceil(value / (key + 1)) * (key + 1);
  });
  console.log(count);
  return count;
};

numRabbits([0, 0, 1, 1, 1]);
numRabbits([1, 1, 2]);
numRabbits([10, 10, 10]);
numRabbits([]);
