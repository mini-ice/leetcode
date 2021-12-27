/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  let result = []
  nums = nums.sort((a, b) => a - b)
  if (nums < 4) return result
  for (let i = 0; i < nums.length - 3; i++) {
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
      break
    }
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (target > 0 && nums[i] + nums[j] > target) break
      else if (target < 0 && nums[j] > 0 && nums[i] + nums[j] > target) break
      let left = j + 1
      let right = nums.length - 1
      while (left < right) {
        let sum = nums[i] + nums[j] + nums[left] + nums[right]
        if (target === sum) {
          result.push([nums[i], nums[j], nums[left], nums[right]])
          while (left < right && nums[left + 1] === nums[left]) left++
          while (left < right && nums[right - 1] === nums[right]) right--
          left++
          right--
        } else if (sum < target) {
          left++
        } else if (sum > target) {
          right--
        }
      }
      while (i < nums.length - 2 && nums[j + 1] === nums[j]) j++
    }
    while (i < nums.length - 3 && nums[i] === nums[i + 1]) i++
  }
  console.log(result)
  return result
}

fourSum([0, -1, 0, 1, -2, -5, 3, 5, 0], 6)
