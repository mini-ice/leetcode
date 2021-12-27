var kthSmallest = function (matrix, k) {
  let arr = matrix.flat(1).sort((a, b) => a - b)
  return arr[k - 1]
}
kthSmallest(
  [
    [1, 5, 9],
    [10, 11, 13],
    [12, 13, 15],
  ],
  8
)
kthSmallest([[-5]], 1)
