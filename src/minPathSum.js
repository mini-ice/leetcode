/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  if (grid.length === 0) return 0
  let m = grid.length
  let n = grid[0].length
  const memo = [...Array(m)].map(() => [...Array(n)])
  // let min = 0
  // let i = 0
  // let j = 0
  const calcPath = function (i, j) {
    if (i + 1 === m && j + 1 === n) {
      return grid[i][j]
    }
    // if (memo[i][j]) {
    //   return memo[i][j]
    // }
    // 计算往右走以及往下走的步数，取最小值
    let min = Infinity
    if (i + 1 < m) {
      min = Math.min(min, calcPath(i + 1, j))
    }
    if (j + 1 < n) {
      min = Math.min(min, calcPath(i, j + 1))
    }

    memo[i][j] = min + grid[i][j]

    return memo[i][j]
  }
  return calcPath(0, 0)
}

minPathSum([
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
])

/*  
[
  [1,3,1],
  [1,5,1],
  [4,2,1],
]              1
          3    5
      1                  1
          1
 */
