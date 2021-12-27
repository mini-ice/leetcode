/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function (nums) {
  const len = nums.length,
    dp1 = new Array(nums.length);

  nums.sort((a, b) => a - b);

  let result = [];
  hash.set(nums[0], [nums[0]]);

  for (let i = 0; i < len; i++) {
    let subset = [nums[i]];
    let prevIndex = i - 1;
    while (prevIndex >= 0 && prevIndex >= subset.length) {
      if (nums[i] % nums[prevIndex] === 0 && hash.get(nums[prevIndex]).length + 1 > subset.length) {
        subset = [...hash.get(nums[prevIndex]), nums[i]];
      }
      prevIndex--;
    }
    result = result.length > subset.length ? result : subset;
    hash.set(nums[i], subset);
  }

  console.log(result);
  return result;
};

largestDivisibleSubset([1, 2, 3]);
largestDivisibleSubset([1, 2, 4, 8]);
largestDivisibleSubset([4, 8, 10, 240]);
largestDivisibleSubset([1]);
largestDivisibleSubset([3, 4, 16, 8]);
