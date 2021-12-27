/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
  const result = [];
  if (s.length < 10) return result;

  const hash = new Map();
  for (let i = 0; i < s.length - 9; i++) {
    let str = s.slice(i, i + 10);
    hash.set(str, (hash.get(str) || 0) + 1);
    if (hash.get(str) === 2) result.push(str);
  }

  console.log(result);

  return result;
};

findRepeatedDnaSequences('AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT');
findRepeatedDnaSequences('AAAAAAAAAAA');
