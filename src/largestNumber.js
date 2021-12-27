/**
 * @param {number[]} cost
 * @param {number} target
 * @return {string}
 */
var largestNumber = function (cost, target) {
  const dp = new Array(target + 1).fill();
  const n = cost.length;
  const orderCost = cost.slice().sort((a, b) => a - b);
  let result = '0';

  for (let i = 0; i < n; i++) {
    dp[cost[i]] = i + 1;
  }

  console.log(dp);
  return result;
};

largestNumber([4, 3, 2, 5, 6, 7, 2, 5, 5], 9);
