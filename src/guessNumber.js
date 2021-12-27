/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */

var guess = function (num, target) {
  if (num > target) return -1;
  else if (num < target) return 1;
  return 0;
};
var guessNumber = function (n, target) {
  let l = 1,
    r = n;
  let mid = l + ((r - l) >> 1);
  let a = guess(mid, target);
  while (a) {
    if (a === -1) {
      r = mid - 1;
    } else if (a === 1) {
      l = mid + 1;
    }
    mid = l + ((r - l) >> 1);

    a = guess(mid, target);
  }

  return mid;
};

console.log(guessNumber(10, 6));
// console.log(guessNumber(1, 1));
// console.log(guessNumber(2, 1));
// console.log(guessNumber(2, 2));
