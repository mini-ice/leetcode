/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  const len = s.length;
  let dp = new Map();

  for (let i = 0; i < len; i++) {
    if (dp.has(s[i])) dp.set(s[i], dp.get(s[i]) + 1);
    else dp.set(s[i], 1);
  }

  let sortStr = [...dp].sort((a, b) => b[1] - a[1]);

  console.log(sortStr.reduce((prevVal, curVal) => prevVal + curVal[0].repeat(curVal[1]), ''))
  return sortStr.reduce((prevVal, curVal) => prevVal + curVal[0].repeat(curVal[1]), '');
};

frequencySort('tree');
