/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function (nums) {
  let allnums = []
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i].length; j++) {
      allnums.push({ val: nums[i][j], type: i })
    }
  }
  allnums.sort((a, b) => a.val - b.val)

  let left = 0,
    right = 0,
    need = {},
    start = 0,
    ansLen = Number.MAX_SAFE_INTEGER,
    count = 0

  while (right < allnums.length) {
    let numObj = allnums[right]
    if (!need[numObj.type]) {
      count++
      need[numObj.type] = 1
    } else {
      need[numObj.type]++
    }
    while (nums.length === count) {
      if (allnums[right].val - allnums[left].val < ansLen) {
        start = allnums[left].val
        ansLen = allnums[right].val - allnums[left].val
      }
      need[allnums[left].type]--
      if (need[allnums[left].type] === 0) {
        count--
      }
      left++
    }
    right++
  }
  console.log([start, start + ansLen])
  return [start, start + ansLen]
}

smallestRange([
  [4, 10, 15, 24, 26],
  [0, 9, 12, 20],
  [5, 18, 22, 30],
])
smallestRange([
  [10, 10],
  [11, 11],
])

/**
 你有 k 个升序排列的整数数组。找到一个最小区间，使得 k 个列表中的每个列表至少有一个数包含在其中。
 
 我们定义如果 b-a < d-c 或者在 b-a == d-c 时 a < c，则区间 [a,b] 比 [c,d] 小。
 
 示例 1:
 
 输入:[[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]
 输出: [20,24]
 解释: 
 列表 1：[4, 10, 15, 24, 26]，24 在区间 [20,24] 中。
 列表 2：[0, 9, 12, 20]，20 在区间 [20,24] 中。
 列表 3：[5, 18, 22, 30]，22 在区间 [20,24] 中。
 */

// max [0,30]
