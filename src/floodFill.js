/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image = [], sr, sc, newColor) {
  const color = image[sr][sc]
  if (color === undefined) return []
  const dfs = (sr, sc) => {
    if (
      image[sr] === undefined ||
      image[sr][sc] === undefined ||
      image[sr][sc] !== color ||
      image[sr][sc] === newColor
    ) {
      return
    }
    image[sr][sc] = newColor
    dfs(sr - 1, sc)
    dfs(sr + 1, sc)
    dfs(sr, sc - 1)
    dfs(sr, sc + 1)
  }
  dfs(sr, sc)
  console.log(image)
  return image
}

// floodFill(
//   [
//     [1, 1, 1],
//     [1, 1, 0],
//     [1, 0, 1],
//   ],
//   1,
//   1,
//   2
// )
floodFill(
  [
    [0, 0, 0],
    [0, 1, 1],
  ],
  1,
  1,
  1
)

/**
 * 1 1 1
 * 1 1 0
 * 1 0 1
 */
