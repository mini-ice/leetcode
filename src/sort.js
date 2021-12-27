// const bubbleSort = (nums) => {
//   let len = nums.length
//   while (len > 0) {
//     for (let i = 0; i < len; i++) {
//       if (nums[i] > nums[i + 1]) {
//         ;[nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
//       }
//     }
//     len--
//   }
//   return nums
// }

// console.log(bubbleSort([6, 1, 2, 5, 4, 3, 9, 7, 10, 8]))

// const selectionSort = (nums) => {
//   const len = nums.length
//   let i = len
//   while (i > 0) {
//     let minIndex = len - i
//     for (let j = len - i; j < len; j++) {
//       if (nums[minIndex] > nums[j]) {
//         ;[nums[minIndex], nums[j]] = [nums[j], nums[minIndex]]
//       }
//     }
//     i--
//   }
//   return nums
// }
// console.log(selectionSort([6, 1, 2, 5, 4, 3, 9, 7, 10, 8]))

// const insertionSort = (nums) => {
//   for (let i = 1; i < nums.length; i++) {
//     let preIndex = i - 1
//     let curVal = nums[i]
//     while (preIndex >= 0 && nums[preIndex] > curVal) {
//       nums[preIndex + 1] = nums[preIndex]
//       preIndex--
//     }
//     nums[preIndex + 1] = curVal
//   }
//   return nums
// }

// console.log(insertionSort([6, 1, 2, 5, 4, 3, 9, 7, 10, 8]))

// const quickSort = (nums, left = 0, right = nums.length - 1) => {
//   function getIndex(nums, left, right) {
//     let base = left
//     while (left < right) {
//       while (left < right && nums[right] >= nums[base]) right--
//       while (left < right && nums[left] <= nums[base]) left++
//       if (left < right) {
//         let t = nums[left]
//         nums[left] = nums[right]
//         nums[right] = t
//       }
//     }
//     ;[nums[base], nums[left]] = [nums[left], nums[base]]
//     return left
//   }
//   if (left < right) {
//     let index = getIndex(nums, left, right)
//     quickSort(nums, left, index - 1)
//     quickSort(nums, index + 1, right)
//   }
//   return nums
// }
// console.log(quickSort([20, 40, 32, 67, 40, 20, 89, 300, 400, 15]))

/* example */
/**
 * @description  小哼买书(排序,去重)
 * @param nums 20 40 32 67 40 20 89 300 400 15
 */
function buyBook(nums) {
  const getPartIndex = (nums, left, right) => {
    let partIndex = left
    // console.log('hh%', nums[right])
    while (left < right) {
      // console.log(left,right)
      while (left < right && nums[right] >= nums[partIndex]) right--
      while (left < right && nums[left] <= nums[partIndex]) left++
      if (left < right) [nums[left], nums[right]] = [nums[right], nums[left]]
    }
    ;[nums[left], nums[partIndex]] = [nums[partIndex], nums[left]]
    return left
  }

  const quicksort = (nums, left = 0, right = nums.length - 1) => {
    if (left < right) {
      let partIndex = getPartIndex(nums, left, right)
      quicksort(nums, left, partIndex - 1)
      quicksort(nums, partIndex + 1, right)
    }
    return nums
  }
  return quicksort(nums)
}

console.log(buyBook([20, 40, 32, 67, 40, 20, 89, 300, 400, 15]))
