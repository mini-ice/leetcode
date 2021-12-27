/**
 * {@link https://leetcode-cn.com/problems/super-egg-drop/solution/ji-dan-diao-luo-by-leetcode-solution-2/}
 * @param {number} k 鸡蛋数
 * @param {number} n 最大楼层
 * @return {number}
 * dp
 * 有K个鸡蛋 N层楼
 * 选择第 X 层楼
 * 1. 鸡蛋不碎 状态为 (N - X, K);
 * 2. 鸡蛋碎 状态为 (N - 1, K - 1);
 * dp(K, N) = Math.min(dp(N - 1, K - 1), dp(N - X, K)) + 1   1 <= X <= N
 */
var superEggDrop = function (k, n) {
  // 1. O(kn^2)
  let dp = new Array(n + 1).fill().map(() => new Array(k + 1).fill(0));

  for (let i = 0; i <= n; i++) {
    dp[i][1] = i;
  }

};

superEggDrop(2, 100);
