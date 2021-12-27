/**
 * @param {number[]} nums
 * @return {number}
 */
var getMaxLen = function (nums) {
  if (nums.length === 1) return nums[0] <= 0 ? 0 : 1;

  let len = nums.length,
    a = 0,
    b = 0,
    acc = 0;

  a = nums[0] < 0 ? 1 : 0;
  b = nums[0] > 0 ? 1 : 0;
  acc = b;

  for (let i = 1; i < len; i++) {
    if (nums[i] > 0) {
      b++;
      a = a > 0 ? a + 1 : 0;
    } else if (nums[i] < 0) {
      let newB = a > 0 ? a + 1 : 0;
      let newA = b + 1;
      b = newB;
      a = newA;
    } else {
      b = 0;
      a = 0;
    }
    acc = Math.max(acc, b);
  }

  return acc;
};
getMaxLen([1, -2, -3, 4]); // 4
getMaxLen([0, 1, -2, -3, -4]); // 3
getMaxLen([-1, -2, -3, 0, 1]); // 2
getMaxLen([-1, 2]); // 1
getMaxLen([1, 2, 3, 5, -6, 4, 0, 10]); // 4
getMaxLen([1, 2, 3, 5, -6, 4, 3, 5, 6, 9]); // 5
getMaxLen([-7, -10, -7, 21, 20, -12, -34, 26, 2]); // 8
