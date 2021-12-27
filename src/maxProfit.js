/**
 * @param {number[]} prices
 * @return {number}
 */
// function maxProfit(prices) {
//   // dp[0][0] = 0;
//   // dp[0][1] = -prices[0];
//   let cash = 0;
//   let stock = -prices[0];

//   for (let i = 1; i < prices.length; i++) {
//     cash = Math.max(stock + prices[i], cash);
//     stock = Math.max(cash - prices[i], stock);
//   }

//   console.log(cash);
//   return cash;
// }
// maxProfit([7, 1, 5, 3, 6, 4]);
// maxProfit([1, 2, 3, 4, 5]);
// maxProfit([7, 6, 4, 3, 1]);

/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  let cash = 0;
  let stock = -prices[0];

  for (let i = 1; i < prices.length; i++) {
    cash = Math.max(stock + prices[i] - fee, cash);
    stock = Math.max(cash - prices[i], stock);
  }

  return cash;
};

console.log(maxProfit([1, 3, 2, 8, 4, 9], 2));
console.log(maxProfit([1, 3, 7, 5, 10, 3], 3));
