/**
 * @param {number} n
 * @return {number}
 */
// var integerBreak = function (n) {
//   let map = new Map([
//     [2, 1],
//     [3, 2],
//     [4, 4],
//     [5, 6],
//   ])

//   if (n < 6) return map.get(n)

//   let pow = Math.floor(n / 3)
//   let rest = n % 3
//   if (rest === 0) {
//     return Math.pow(3, pow)
//   } else {
//     return Math.pow(3, pow - 1) * map.get(n - (pow - 1) * 3)
//   }
// }
var integerBreak = function (n) {
  let dp = [0, 0]
  for (let i = 2; i <= n; i++) {
    let max = 0
    for (let j = 1; j < i; j++) {
      if (dp[i - j]) {
        max = Math.max(Math.max(j * (i - j), j * dp[i - j]), max)
      } else {
        max = Math.max(j * (i - j), max)
      }
    }
    dp[i] = max
  }
  return dp[n]
}

// console.log(integerBreak(2))
// console.log(integerBreak(7))
// console.log(integerBreak(8))
console.log(integerBreak(12))

/*
  3: 1,2
  4: 2,2
  5: 2,3
  6: 3,3
  7: 3,2,2
  8: 3,3,2
  9: 3,3,3
  10:3,3,2,2
  11:3,3,3,2
  12:3,3,3,3
  13:3,3,3,2,2
*/
