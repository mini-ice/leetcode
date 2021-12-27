var threeSum = function (nums) {
  let result = []
  if (nums.length < 3) return result
  nums = nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length; i++) {
    let left = i + 1
    let right = nums.length - 1
    if (nums[i] > 0) break
    if (nums[i] === nums[i - 1]) continue
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right]
      if (sum == 0) {
        result.push([nums[i], nums[left], nums[right]])
        while (left < right && nums[left] == nums[left + 1]) left++
        while (left < right && nums[right] == nums[right - 1]) right--
        left++
        right--
      } else if (sum < 0) left++
      else if (sum > 0) right--
    }
  }
  console.log(result)
  return result
}

threeSum([-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6])
//[[-5,1,4],[-5,1,4],[-3,-1,4],[-3,0,3],[-2,-1,3],[-2,1,1],[-1,0,1],[-1,0,1],[0,0,0]]
//[0,1,2]
//[-1,-1,-4]
