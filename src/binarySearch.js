/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */

var search = function (nums, target) {
  let res = false;
  let len = nums.length - 1;
  function binarySearch(nums, l, r, target) {
    // console.log(l, r);
    // if (l < 0 || r > len || r - l <= 0 || res) return;
    let mid = (l + r) >> 1;
    if (r < l) return;

    if (nums[mid] !== target) {
      binarySearch(nums, l, mid - 1, target);
      binarySearch(nums, mid + 1, r, target);
    } else {
      res = true;
      return true;
    }
  }
  binarySearch(nums, 0, len, target);
  return res;
};

search([2, 5, 6, 0, 0, 1, 2], 3);
search([2, 5, 6, 0, 0, 1, 2], 0);
search([1], 1);
search([1, 0, 1, 1, 1], 0);
