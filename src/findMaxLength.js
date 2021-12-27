/**
 * @param {number[]} nums
 * @return {number}
 */

// [0,1,0,1,0,0,1,1]
var findMaxLength = function (nums) {
  let result = 0;
  let count = 0;
  const len = nums.length;
  const dp = new Map();
  dp.set(0, -1);

  for (let i = 0; i < len; i++) {
    if (nums[i] === 1) {
      count++;
    } else {
      count--;
    }
    if (dp.has(count)) {
      const prevIndex = dp.get(count);
      result = Math.max(result, i - prevIndex);
    } else {
      dp.set(count, i);
    }
  }
  console.log(dp);
  return result;
};

// console.log(findMaxLength([1, 1, 0, 1, 0, 0, 1, 0]));
console.log(findMaxLength([0, 1, 0]));

/**
 *  0 1 0 1 0 0 1 1
 *
 *
 */
