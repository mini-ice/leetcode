/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  // let keys = []
  // let map = new Map([[0, true]])
  let len = rooms.length
  let dp = new Array(len).fill()
  if (len === 0) return true
  const dfs = (rooms, key = 0) => {
    if (dp[key]) return
    const keys = rooms[key]
    dp[key] = true
    len--
    for (let i = 0; i < keys.length; i++) {
      dfs(rooms, keys[i])
    }
  }
  dfs(rooms, 0)
  console.log(len, dp)
  return len === 0
}
canVisitAllRooms([[1,3],[3,0,1],[2],[0]])
