/**
 *
 */
function cuttingRope(n) {
  if (n < 3) return n - 1;

  let dp = new Array(n + 1).fill(0);

  dp[2] = 2;
  dp[3] = 3;

  for (let i = 4; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      console.log(dp[i - j], dp[j]);
      dp[i] = Math.max(dp[i], dp[i - j] * dp[j]);
    }
  }

  return dp[n];
}
cuttingRope(12);
