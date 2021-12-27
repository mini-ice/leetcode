/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  if (nums.length < 2) return nums[0];

  nums.sort((a, b) => a - b);

  let len = nums.length,
    max = nums[len - 1],
    size = new Array(max + 1).fill(0),
    dp = new Array(max + 1).fill(0);

  for (let i = 0; i < len; i++) {
    size[nums[i]]++;
  }

  dp[nums[0]] = nums[0] * size[nums[0]];

  for (let i = 0; i <= max; i++) {
    dp[i] = Math.max(dp[i - 1] || 0, (dp[i - 2] || 0) + i * size[i]);
  }

  return dp[max];
};

console.log(deleteAndEarn([3, 1]));
console.log(deleteAndEarn([3, 4]));
console.log(deleteAndEarn([3, 4, 2]));
console.log(deleteAndEarn([2, 2, 3, 3, 3, 4]));
console.log(deleteAndEarn([3, 4, 2, 5, 8, 3, 6, 9, 3, 4]));
