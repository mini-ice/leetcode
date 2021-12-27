/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  let list = []
  const recusive = (n, k, ans, x) => {
    if (k === 0) {
      list.push(ans)
      return
    }
    for (let i = x; i <= n - k + 1; i++) {
      recusive(n, k - 1, [...ans, i], i + 1)
    }
  }
  recusive(n, k, [], 1)
  console.log(list)
  return list
}
combine(4, 3)
