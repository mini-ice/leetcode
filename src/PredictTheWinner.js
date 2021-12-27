/**
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function (nums) {
  // let dp = new Array(nums.length).fill(new Array(nums.len).fill())
  const dfs = (nums, start, end) => {
    if (start >= end) return nums[start]
    // if (dp[start][end]) return dp[start][end]
    let left = nums[start] - dfs(nums, start + 1, end)
    let right = nums[end] - dfs(nums, start, end - 1)
    let ans = Math.max(left, right)
    // dp[start][end] = ans
    return ans
  }

  return dfs(nums, 0, nums.length - 1) >= 0
}

console.log(PredictTheWinner([1, 5, 2]))
console.log(PredictTheWinner([1,567,1,1]))
