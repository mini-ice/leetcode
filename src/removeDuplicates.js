/**
 * @param {number[]} nums
 * @return {number}
 */
// var removeDuplicates = function (nums) {
//   let i = 0
//   if (!nums.length) return 0
//   for (let j = 1; j < nums.length; j++) {
//     if (nums[j] !== nums[i]) {
//       i++
//       nums[i] = nums[j]
//     }
//   }
//   return ++i
// }

// removeDuplicates([1, 1, 2])

// var removeDuplicates = function (s) {};

// console.log(removeDuplicates('abbaca'));

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates01 = function (nums) {
  let i = 0;
  while (i < nums.length) {
    let count = 1,
      j = i + 1;
    while (j < nums.length && nums[i] === nums[j]) {
      if (count < 2) {
        count++;
        j++;
      } else {
        nums.splice(j, 1);
      }
    }
    i = j;
  }
  return nums.length;
};

removeDuplicates01([1, 1, 1, 2, 2, 3]);
