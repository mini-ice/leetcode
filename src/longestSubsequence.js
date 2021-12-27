/**
 * @param {number[]} arr
 * @param {number} difference
 * @return {number}
 */
var longestSubsequence = function (arr, difference) {
  const len = arr.length,
    dp = new Map();

  let ans = 0;

  for (let i = 0; i < len; i++) {
    const value = (dp.get(arr[i] - difference) || 0) + 1;
    dp.set(arr[i], value);
    ans = Math.max(ans, value);
  }

  return ans;
};

longestSubsequence([1, 2, 3, 4], 1);
longestSubsequence([4, 12, 10, 0, -2, 7, -8, 9, -9, -12, -12, 8, 8], 0);
