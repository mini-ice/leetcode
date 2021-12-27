/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles: number[]): boolean {
  let r = piles.length - 1,
    l = 0,
    result = 0,
    sign = true;

  while (l < r) {
    if (piles[l] > piles[r]) {
      result = sign ? result + piles[l] : result - piles[l];
      l++;
    } else {
      result = sign ? result + piles[r] : result - piles[r];
      r--;
    }
    sign = !sign;
  }

  return result > 0;
};

console.log(stoneGame([5, 3, 4, 5, 7]));
