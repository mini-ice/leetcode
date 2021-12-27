/**
 *
 */
function checkPossibility(nums: number[]): boolean {
  var count = 0;
  var n = nums.length;
  for (var i = 0; i <= n - 2; i++) {
    if (nums[i] > nums[i + 1]) {
      if (nums[i - 1] > nums[i + 1]) {
        nums[i + 1] = nums[i];
      } else {
        nums[i] = nums[i - 1];
      }
      count++;
    }
    if (count > 1) return false;
  }
  return true;
}

console.log(checkPossibility([5, 7, 1, 8]));
console.log(checkPossibility([4, 2, 3]));
console.log(checkPossibility([3, 4, 1, 2]));
