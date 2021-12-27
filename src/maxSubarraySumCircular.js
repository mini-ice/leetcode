/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
  if (nums.length === 1) return nums[0];

  let len = nums.length,
    sum = 0,
    preMax = 0,
    max = nums[0],
    preMin = 0,
    min = nums[0],
    isMinus = true;

  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) isMinus = false;
    sum += nums[i];
    preMax = Math.max(nums[i] + preMax, nums[i]);
    max = Math.max(preMax, max);

    preMin = Math.min(nums[i] + preMin, nums[i]);
    min = Math.min(preMin, min);
  }

  if (isMinus) return max;
  console.log(sum, min, max);
  return Math.max(sum - min, max);
};
// maxSubarraySumCircular([1, -2, 3, -2]); // 3
// maxSubarraySumCircular([5, -3, 5]); // 10
// maxSubarraySumCircular([3, -1, 2, -1]); // 4
maxSubarraySumCircular([-5, 4, -6]); // 4
