/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var numSubarraysWithSum = function (nums: number[], goal: number): number {
  let result = 0;
  let len = nums.length;

  for (let i = 0; i < len; i++) {
    let x = nums[i];
    if (x === goal) result++;
    for (let j = i + 1; j < len; j++) {
      x += nums[j];
      if (x === goal) result++;
    }
  }

  console.log(result);
  return result;
};
numSubarraysWithSum([1, 0, 1, 0, 1], 2);
