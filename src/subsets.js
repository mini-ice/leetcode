/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const n = nums.length
  const total = 1 << n // 左移n位，即2的n次方，也可以写成 2 ** n
  const res = new Array(total)
  for (let i = 0; i < total; i++) {
    res[i] = []
    for (let j = 0; j < n; j++) {
      if ((i >> j) & (1 == 1)) {
        // 即 (i >> j) % 2 == 1
        res[i].push(nums[j])
      }
    }
  }
  return res
}
subsets([1, 2, 3])
