/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  if (nums.length === 1) return nums[0];
  let len = nums.length,
    a = nums[0],
    b = nums[0],
    result = nums[0];

  for (let i = 1; i < len; i++) {
    let c = b * nums[i];
    let d = a * nums[i];
    b = Math.min(c, d, nums[i]);
    a = Math.max(c, d, nums[i]);

    result = Math.max(a, result);
  }

  console.log(result);
  return result;
};
maxProduct([2, 3, -2, 4]); // 6
maxProduct([-2, 0, -1]); // 0
maxProduct([-2, 0, -1, -2]); // 2
maxProduct([-2, 0, -1, -2, 1, -4]); // 8
maxProduct([0, 2]); // 2
maxProduct([-2, -2, -4, -8]); // 128
