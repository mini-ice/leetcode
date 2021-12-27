/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  // let min = nums[0],
  //   max = nums[0]
  // let map = new Map()
  // for (let i = 0; i < nums.length; i++) {
  //   let num = nums[i]
  //   map.has(num) ? map.set(num, map.get(num) + 1) : map.set(num, 1)
  //   if (!min && min !== 0) min = num
  //   else if (min > num) min = num
  //   if (!max&& max !== 0) max = num
  //   else if (max < num) max = num
  // }
  // let index = 0
  // // nums = []
  // for (let i = min; i <= max; i++) {
  //   // while(map.has(i))
  //   let count = map.has(i) ? map.get(i) : 0
  //   while (count > 0) {
  //     nums[index] = i
  //     index++
  //     count--
  //   }
  // }
  // console.log(nums)
  // return nums
}


console.log(sortColors([2,0,2,1,1,0]))