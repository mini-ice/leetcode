// /**
//  * @param {number[][]} matrix
//  * @return {number[]}
//  */
// var spiralOrder = function (matrix) {
//   let ylen = matrix.length,
//     xlen = matrix[0].length,
//     step = [1, 1, -1, -1],
//     x = 0,
//     y = 0;
//   let arr = new Array(xlen * ylen).fill();
//   let res = [];
//   // console.log(arr[y * ylen + x], xlen, ylen, x, y);
//   // while (x !== xlen >> 1 && y !== ylen >> 1) {
//   for (let i = 0; i < step.length; i++) {
//     while (x < xlen && x >= 0 && y < ylen && y >= 0) {
//       arr[y * ylen + x] = 1;
//       // console.log(i % 2 === 1);
//       //   // res.push(matrix[y][x]);
//       console.log(x);
//       if (y === 0 || x === 0 || x === xlen - 1 || y === ylen - 1) break;
//       if (i % 2 === 1) {
//         y += step[i];
//       } else {
//         x += step[i];
//       }
//     }
//     // console.log(x, y);
//   }
//   // }
//   console.log(res);
//   return res;
// };
// spiralOrder([
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ]);

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let vertical = matrix.length,
    horizontal = matrix[0].length,
    result = [];

  let dp = new Array(vertical).fill().map(() => new Array(horizontal).fill(0));

  function dfs(y, x, speed, direction) {
    // console.log(y, x, speed, direction, vertical, horizontal);
    if (y >= vertical || y < 0 || x < 0 || x >= horizontal) return;
    if (dp[y][x] === 1) return;

    if (direction === 'horizontal') {
      while (x >= 0 && x < horizontal) {
        dp[y][x] = 1;
        result.push(matrix[y][x]);
        if (x + speed < 0 || x + speed >= horizontal || dp[y][x + speed] === 1) break;
        x += speed;
      }
      dfs(y + speed, x, speed, 'vertical');
    } else if (direction === 'vertical') {
      while (y >= 0 && y < vertical) {
        dp[y][x] = 1;
        result.push(matrix[y][x]);
        if (y + speed < 0 || y + speed >= vertical || dp[y + speed][x] === 1) break;
        y += speed;
      }

      dfs(y, x - speed, -speed, 'horizontal');
    }
  }

  dfs(0, 0, 1, 'horizontal');

  console.log(result);
  return result;
};

spiralOrder([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]);
