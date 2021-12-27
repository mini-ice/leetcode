/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function (s) {
  let resultMap = {};
  let result = [];

  const inOrder = (char = '', s = '') => {
    const len = s.length;
    if (s.length === 1) {
      char = char + s[0];
      if (!resultMap[char]) {
        result.push(char);
        resultMap[char] = 1;
      }
      return;
    }
    for (let i = 0; i < len; i++) {
      if (i > 0 && s[i - 1] === s[i]) continue;
      char = char + s[i];
      inOrder(char, s.substring(0, i) + s.substring(i + 1, len));
      char = char.substring(0, char.length - 1);
    }
  };

  inOrder('', s);
  return result;
};

permutation('abccba');
