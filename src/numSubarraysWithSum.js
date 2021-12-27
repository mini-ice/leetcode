/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 *
 * @description 前缀和 x[i] + sum[i - 1]
 */
var numSubarraysWithSum = function (nums, goal) {
  let len = nums.length,
    ans = 0;

  const dp = new Array(len).fill().map((item) => new Array(len).fill(-1));

  const sum = new Array(len + 1).fill(0);
  for (let i = 1; i <= len; i++) {
    sum[i] = sum[i - 1] + nums[i - 1];
  }
  console.log(sum);
};

numSubarraysWithSum([1, 0, 1, 0, 1], 2);
// numSubarraysWithSum([0, 0, 0, 0, 0], 0);
