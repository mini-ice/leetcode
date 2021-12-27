/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites [课程,先修课程]
 * @return {boolean}
 */

// 根据依赖关系，构建邻接表、入度数组。
// 选取入度为 0 的数据，根据邻接表，减小依赖它的数据的入度。
// 找出入度变为 0 的数据，重复第 2 步。
// 直至所有数据的入度为 0，得到排序，如果还有数据的入度不为 0，说明图中存在环。

var canFinish = function (numCourses, prerequisites) {
  let inDegree = new Array(numCourses).fill(0) //设置入度队列
  let map = {} //记录后续课程
  let count = 0 //记录已修课程
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++ //记录课的初始入度值
    //记录后续课程
    if (map[prerequisites[i][1]]) {
      map[prerequisites[i][1]].push(prerequisites[i][0])
    } else {
      map[prerequisites[i][1]] = [prerequisites[i][0]]
    }
  }
  const quene = []
  for (let i = 0; i < inDegree.length; i++) {
    // 所有入度为0的课入列
    inDegree[i] === 0 && quene.push(i)
  }
  while (quene.length > 0) {
    const selected = quene.shift() // 课程出列
    count++ //当前课程设为已修
    let toEnQueue = map[selected] //获取后续课程
    if (toEnQueue && toEnQueue.length) {
      for (let i = 0; i < toEnQueue.length; i++) {
        inDegree[toEnQueue[i]]-- //依赖它的后续课的入度-1
        if (inDegree[toEnQueue[i]] === 0) {
          quene.push(toEnQueue[i]) //后续课程入度为0 入队
        }
      }
    }
  }
  return count === numCourses
}

canFinish(6, [
  [3, 0],
  [3, 1],
  [4, 1],
  [4, 2],
  [5, 3],
  [5, 4],
])
