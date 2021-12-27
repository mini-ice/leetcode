/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  const len = nums.length;
  const res = new Array(nums.length).fill(-1);
  const stack = [];
  for (let i = 0; i < len * 2 - 1; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i % len]) {
      res[stack[stack.length - 1]] = nums[i % len];
      stack.pop();
    }
    stack.push(i % len);
  }
  console.log(res);
  return res;
};

// nextGreaterElements([1, 2, 1]);
// nextGreaterElements([5, 4, 3, 2, 1]);
nextGreaterElements([3, 5, 2]);
