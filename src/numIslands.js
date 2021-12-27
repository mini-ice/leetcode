/**
 * @param {character[][]} grid
 * @return {number}
 * @description dfs
 * '0' 海
 * '1' 陆地
 * ‘2’ 已经遍历过的陆地
 */
// function numIslands(grid) {
//   const maxY = grid.length;
//   const maxX = maxY ? grid[0].length : 0;
//   let result = 0;

//   function dfs(grid, i, j, maxX, maxY) {
//     if (i < 0 || i >= maxY || j < 0 || j >= maxX) return;
//     if (grid[i][j] !== '1') return;

//     grid[i][j] = '2';

//     dfs(grid, i - 1, j, maxX, maxY);
//     dfs(grid, i + 1, j, maxX, maxY);
//     dfs(grid, i, j - 1, maxX, maxY);
//     dfs(grid, i, j + 1, maxX, maxY);
//   }

//   for (let i = 0; i < maxY; i++) {
//     for (let j = 0; j < maxX; j++) {
//       if (grid[i][j] === '1') {
//         dfs(grid, i, j, maxX, maxY);
//         result++;
//       }
//     }
//   }

//   console.log(result);
//   return result;
// }

/**
 * @param {character[][]} grid
 * @return {number}
 * @description bfs
 */
function numIslands(grid) {
  let result = 0,
    len = grid.length,
    len1 = len ? grid[0].length : 0;

  let quene = [];
  const isArea = (i, j) => i >= 0 && i < len && j >= 0 && j < len1;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len1; j++) {
      if (grid[i][j] === '1') {
        grid[i][j] === '2';
        result++;

        quene.push({ i, j });

        while (quene.length) {
          let { i, j } = quene.pop();

          if (isArea(i - 1, j) && grid[i - 1][j] === '1') {
            quene.push({ i: i - 1, j });
            grid[i - 1][j] = '2';
          }
          if (isArea(i + 1, j) && grid[i + 1][j] === '1') {
            quene.push({ i: i + 1, j });
            grid[i + 1][j] = '2';
          }
          if (isArea(i, j - 1) && grid[i][j - 1] === '1') {
            quene.push({ i, j: j - 1 });
            grid[i][j] = '2';
          }
          if (isArea(i, j + 1) && grid[i][j + 1] === '1') {
            quene.push({ i, j: j + 1 });
            grid[i][j + 1] = '2';
          }
        }
      }
    }
  }

  return result;
}

numIslands([
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
]);
numIslands([
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
]);
