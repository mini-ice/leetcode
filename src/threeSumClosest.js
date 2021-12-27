var threeSumClosest = function (nums, target) {
  let distance = 10000
  let result = 0
  nums = nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length - 2; i++) {
    // if (target < nums[i]) break
    let left = i + 1
    let right = nums.length - 1
    while (left < right) {
      let a = target - (nums[i] + nums[left] + nums[right])
      let curDistance = a < 0 ? Math.abs(a) : a
      if (curDistance < distance) {
        result = nums[i] + nums[left] + nums[right]
        distance = curDistance
      }
      if (a < 0) {
        while (left < right && nums[right - 1] === nums[right]) right--
        right--
      } else {
        while (left < right && nums[left + 1] === nums[left]) right--
        left++
      }
    }
  }
  console.log(result)
  return result
}

threeSumClosest([-1,2,1,-4], 1)

// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2)
