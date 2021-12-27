/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function (s, k) {
  let res = 0;
  const recursive = (s) => {
    if (s.length < k) return 0;
    const map = new Array(26).fill(0);
    for (let i of s) {
      let index = i.charCodeAt() - 97;
      map[index]++;
    }
    for (let i = 0; i < s.length; i++) {
      let index = s[i].charCodeAt() - 97;
      if (map[index] < k) {
        return Math.max(res, recursive(s.slice(0, i)), recursive(s.slice(i + 1)));
      }
    }
    console.log(s);
    return s.length;
  };
  return recursive(s);
};
console.log(longestSubstring('ababbc', 3));
