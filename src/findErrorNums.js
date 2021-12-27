/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  const len = nums.length;

  nums.sort();

  for (let i = 0; i < len; i++) {}
};

console.log(findErrorNums([1, 1]), findErrorNums([1, 2, 2, 4]), findErrorNums([2, 2, 3]), findErrorNums([3, 2, 2]));
