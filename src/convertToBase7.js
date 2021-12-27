/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function (num, b) {
  let ans = ''
  while (num) {
    ans = ans + (num % b)
    num = Math.floor(num / b)
  }
  return ans
}

console.log(convertToBase7(100, 7))
