/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function (board, click) {
  if (board.length === 0) return []
  const len1 = board.length
  const len2 = board[0].length
  const dirX = [-1, -1, -1, 0, 0, 1, 1, 1]
  const dirY = [-1, 0, 1, -1, 1, -1, 0, 1]
  const dp = new Array(len1 * len2).fill()
  const [x, y] = click
  if (board[x][y] === 'M') {
    board[x][y] = 'X'
    return board
  }
  const dfs = (x, y) => {
    let count = 0
    board[x][y] = 'B'
    for (let i = 0; i < 8; i++) {
      let newX = dirX[i] + x
      let newY = dirY[i] + y
      if (newX < 0 || newX >= len1 || newY < 0 || newY >= len2 || board[newX][newY] === 'B') {
        continue
      }
      count += board[newX][newY] === 'M'
    }
    if (count > 0) {
      board[x][y] = count + ''
    } else {
      // board[x][y] = 'B'
      for (let i = 0; i < 8; i++) {
        let newX = dirX[i] + x
        let newY = dirY[i] + y
        if (newX < 0 || newX >= len1 || newY < 0 || newY >= len2 || board[newX][newY] === 'B') {
          continue
        }
        dfs(newX, newY)
      }
    }
  }
  dfs(x, y)
  console.log(board)
  return board
}

updateBoard(
  [
    ['E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'M', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E'],
  ],
  [3, 0]
)

// 输入:

// [['E', 'E', 'E', 'E', 'E'],
//  ['E', 'E', 'M', 'E', 'E'],
//  ['E', 'E', 'E', 'E', 'E'],
//  ['E', 'E', 'E', 'E', 'E']]

// Click : [3,0]

// 输出:

// [['B', '1', 'E', '1', 'B'],
//  ['B', '1', 'M', '1', 'B'],
//  ['B', '1', '1', '1', 'B'],
//  ['B', 'B', 'B', 'B', 'B']]
