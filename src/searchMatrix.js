/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let m = matrix.length,
    n = matrix[0].length;
  let i = 0,
    j = m * n - 1;
  while (i < j) {
    let mid = (i + j + 1) >> 1;
    if (matrix[parseInt(mid / n)][mid % n] <= target) {
      i = mid;
    } else {
      j = mid - 1;
    }
  }
  return matrix[parseInt(j / n)][j % n] == target;
};

console.log(searchMatrix([[1, 3, 5]], 3));
console.log(searchMatrix([[1, 3, 5]], 10));
console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
      [61, 62, 63, 63],
    ],
    23
  )
);

