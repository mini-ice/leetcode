/**
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes = function (boxes) {
  const getMax = (curBoxes, curSum) => {
    let max = 0
    if (curBoxes.length == 0) return curSum
    if (curBoxes.length == 1) return curSum + 1 * 1

    let i = 0
    while (i < curBoxes.length) {
      let count = 1 // 连续数字的个数
      let j = i
      while (curBoxes[j + 1] == curBoxes[j]) {
        count++
        j++
      }
      const left = curBoxes.slice(0, i) // 左区间 最开始是空数组
      const right = curBoxes.slice(j + 1) // 右区间
      const curMax = getMax(left.concat(right), curSum + count * count)
      max = Math.max(max, curMax) // 当前的划分情况下的curMax，挑战max
      i = j + 1 // 或i=i+count，是等价的，就是不先移除count这部分，i指针跳过它
    }
    return max
  }
  return getMax(boxes, 0)
}

console.log(removeBoxes([1, 3, 2, 2, 2, 3, 4, 3, 1]))
