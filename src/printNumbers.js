/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function (n) {
  let result = new Array(n + 1);

  function dfs(x, str) {
    if (x === n) {
      return;
    }

    for (let i = 0; i < 10; i++) {
      const currentStr = i + str;
      result[+currentStr] = +(currentStr);
      dfs(x + 1, currentStr);
    }
  }

  dfs(0, '');

  return result.slice(1)
};
printNumbers(2);
