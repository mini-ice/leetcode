/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function (s) {
  let count = 0
  const paluhndrown = (i, j, arr) => {
    while (i >= 0 && j < s.length) {
      if (s[i] === arr[0] && s[j] === arr[1]) {
        count++
        i--
        j++
      } else {
        return
      }
    }
  }
  for (let i = 0; i < s.length - 1; i++) {
    if (`${s[i]}${s[i + 1]}` === '01' || `${s[i]}${s[i + 1]}` === '10') {
      paluhndrown(i, i + 1, [s[i], s[i + 1]])
    }
  }
  return count
}

countBinarySubstrings('00110011')
