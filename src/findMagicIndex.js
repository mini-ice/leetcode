/**
 * @param {number[]} nums
 * @return {number}
 */

var findMagicIndex = function (nums) {
  let ans = -1
  const binaryFinder = (left, right) => {
    /**
     * 数组中存在重复值
     * 折半查找时左右2边能有满足条件的可能
     * 查找魔术索引 若中间值刚好满足条件 则保留当前索引 只需要继续查找左侧数组
     * 若中间值不满足条件 先查询左边 不满足条件（ans === -1）继续查询右侧
     * return ans
     */
    let mid = Math.floor((left + right) / 2)
    if (left > right) return

    if (nums[mid] === mid) {
      ans = mid //
      binaryFinder(left, mid - 1)
    } else {
      binaryFinder(left, mid - 1)
      if (ans === -1) binaryFinder(mid + 1, right)
    }
  }
  binaryFinder(0, nums.length - 1)
  return ans
}

console.log(findMagicIndex([2, 2, 3, 3, 24, 60, 676, 666]))

/* 
[2,2,3,3,24,60,676,666]
*/
