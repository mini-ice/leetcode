/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  if (nums.length === 1) return true;

  let len = nums.length,
    max = nums[0];
  for (let i = 1; i < len - 1; i++) {
    if (max < i) return false;

    max = Math.max(i + nums[i], max);
    if (max >= len - 1) return true;
  }

  return max >= len - 1;
};
canJump([2, 3, 1, 1, 4]);
canJump([3, 2, 1, 0, 4]);
canJump([1, 2, 1, 0, 4]);

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  if (nums.length === 1) return 1;
  let len = nums.length,
    end = 0,
    maxPosition = 0,
    step = 0;

  for (let i = 0; i < len - 1; i++) {
    maxPosition = Math.max(nums[i] + i, maxPosition);

    if (i === end) {
      end = maxPosition;
      step++;
    }
  }
  return step;
};

console.log(jump([4, 1]));
console.log(jump([2, 3, 1, 1, 4]));
console.log(jump([2, 1, 1, 1, 4, 2, 4, 1, 1, 1]));
