/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function (nums, k) {
  let sum = 0,
    len = nums.length,
    maxNum = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < len; i++) {
    sum += nums[i];
    maxNum = Math.max(maxNum, nums[i]);
  }

  const target = Math.floor(sum / k);

  if (target !== sum / k || maxNum > target) return false;

  const dp = new Array(target + 1).fill(0);

  for (let i = 0; i < len; i++) {
    dp[nums[i]] += 1;
  }

  console.log(dp);
};

console.log(
  // canPartitionKSubsets([4, 3, 2, 3, 5, 2, 1], 4),
  canPartitionKSubsets([4, 4, 6, 2, 3, 8, 10, 2, 10, 7], 4) // true
  // canPartitionKSubsets([2, 2, 2, 2, 3, 4, 5], 4) // false
);
