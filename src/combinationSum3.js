/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  let list = []
  const recursive = (k, n, start, ans) => {
    if (k === 0 && n === 0) {
      let a = Array.prototype.slice.call(ans)
      list.push(a)
      return
    } else if (k <= 0 || start > n) return
    else {
      for (let i = start; i <= 9; i++) {
        ans.push(i)
        recursive(k - 1, n - i, i + 1, ans)
        ans.pop()
      }
    }
  }
  recursive(k, n, 1, [])
  console.log(list)
  return list
}
combinationSum3(3, 15)
