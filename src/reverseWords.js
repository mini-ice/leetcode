/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let length = s.length
  let i = 0
  while (i < length) {
    let start = i
    while (i < length && s[i] != ' ') {
      i++
    }

    let left = start,
      right = i - 1
    while (left < right) {
      // swap(s[left], s[right])
      // ;[s[left], s[right]] = [s[right], s[left]]
      let t = s[left]
      s[left] = s[right]
      s[right] = t
      left++
      right--
    }
    while (i < length && s[i] == ' ') {
      i++
    }
  }
  console.log(s)
  return s
}

reverseWords("Let's take LeetCode contest")
