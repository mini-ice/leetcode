/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function (m, n, k) {
  let dp = new Array(m).fill().map(() => new Array(n).fill()),
    dp1 = new Array(Math.max(m, n)).fill(-1),
    result = 0;

  function computed(value) {
    if (dp1[value] !== -1) return dp1[value];
    dp1[value] = value < 10 ? value : Math.floor(value / 10) + (value % 10);
    return dp1[value];
  }

  function dfs(i, j, k) {
    if (i < 0 || i >= m || j < 0 || j >= n || dp[i][j] !== undefined) return;
    dp[i][j] = true;
    let x = computed(i);
    let y = computed(j);
    if (x + y > k) {
      dp[i][j] = -1;
    } else {
      if (i === 0 || (i > 0 && dp[i - 1][j] !== -1)) {
        result++;

        x <= k && dfs(i + 1, j, k);
        y <= k && dp[i][j] && dfs(i, j + 1, k);
      } else {
        dp[i][j] = -1;
      }
    }

    return dp[i][j];
  }

  dfs(0, 0, k);
  console.log(result);
  return result;
};

movingCount(11, 8, 11); // 73
movingCount(100, 100, 35); // 9999
movingCount(17, 17, 13); // 261
movingCount(2, 3, 1); // 3
movingCount(3, 1, 0); // 1
movingCount(16, 8, 4); // 15
movingCount(38, 15, 9); // 135
