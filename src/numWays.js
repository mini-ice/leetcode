/**
 * @param {number} n
 * @param {number[][]} relation
 * @param {number} k
 * @return {number}
 */
var numWays = function (n, relation, k) {
  let dp = new Array(n).fill('').map(() => []);

  for (let i = 0; i < relation.length; i++) {
    const [key, value] = relation[i];
    dp[key].push(value);
  }

  let res = 0;

  function dfs(i, k) {
    const direction = dp[i];

    if (k === 0 && i === n - 1) {
      res++;
      return;
    }

    if (k < 0) {
      return;
    }

    for (let i = 0; i < direction.length; i++) {
      dfs(direction[i], k - 1);
    }
  }

  dfs(0, k);
  console.log(res);
  return res;
};

numWays(
  3,
  [
    [0, 2],
    [2, 1],
  ],
  2
);
