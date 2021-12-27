/**
 * @param {number} n
 * @return {number}
 */
var getMoneyAmount = function (n) {
  let dp = new Array(n + 1).fill().map(() => new Array(n + 1).fill(0));

  const dfs = (l, r) => {
    if (l >= r) return 0;
    if (dp[l][r] !== 0) return dp[l][r];
    let result = Number.MAX_SAFE_INTEGER;

    for (let i = l; i < r; i++) {
      let ans = Math.max(dfs(l, i - 1), dfs(i + 1, r)) + i;
      result = Math.min(ans, result);
    }
    dp[l][r] = result;
    return result;
  };

  console.log(dfs(1, n));
  return dfs(1, n);
};
getMoneyAmount(11);
