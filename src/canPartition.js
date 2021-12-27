/**
 * @param {number[]} nums
 * @return {boolean}
 * @description  动态规划推导公式
 * dp[i][j] = dp[i - 1][j] | dp[i - 1][j - nums[i]] j > nums[i]
 * dp[i][j] = dp[i - 1][j] j < nums[i]
 * dp[i][j] = nums[i] j === nums[i]
 *
 * 记录数字总@constant {number} sum, 最大值 @constant {number} maxNum, 目标值 @constant {number} target
 * 但总和 @constant {number} sum 为奇数时 或 @constant {number} maxNum 大于 @constant {number} target 时 无结果 @returns {false}
 *
 *  [1, 5, 11, 5]
 *  i\j  0 1 2 3 4 5 6 7 8 9 10 11
 *  0    0 1 0 0 0 0 0 0 0 0  0  0
 *  1    0 1 0 0 0 1 1 0 0 0  0  0
 *  2    0 1 0 0 0 1 1 0 0 0  0  1
 *  3    0 1 0 0 0 1 1 0 0 0  1  1
 *
 */
var canPartition = function (nums) {
  let sum = 0,
    len = nums.length,
    maxNum = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < len; i++) {
    sum += nums[i];
    maxNum = Math.max(maxNum, nums[i]);
  }

  let target = Math.floor(sum / 2);

  if (target !== sum / 2 || maxNum > target) return false;

  // const dp = new Array(len).fill(false).map(() => new Array(target + 1).fill(false));
  // dp[0][nums[0]] = true;

  // for (let i = 1; i < len; i++) {
  //   for (let j = 1; j <= target; j++) {
  //     dp[i][j] = dp[i - 1][j];
  //     if (j === nums[i]) dp[i][nums[i]] = true;
  //     else if (j > nums[i]) {
  //       dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]];
  //     }
  //   }
  //   if (dp[i][target]) return true;
  // }
  // return dp[len - 1][target];

  // 优化空间复杂度
  const dp = new Array(target + 1).fill(false);

  dp[0] = true; // j - nums[i] === 0 => true

  for (let i = 0; i < len; i++) {
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = dp[j] || dp[j - nums[i]];
    }
    if (dp[target]) return true;
  }
  return dp[target];
};
// 1 2 3 4

console.log(
  canPartition([2, 2, 3, 5]),
  canPartition([3, 3, 3, 4, 5]),
  canPartition([1, 3, 4, 4]),
  canPartition([1, 5, 11, 5]),
  canPartition([1, 5, 10, 6])
);
