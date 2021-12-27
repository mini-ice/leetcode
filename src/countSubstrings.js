/**
 * @param {string} s
 * @return {number}
 */

// 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。

// 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

//

// 示例 1：

// 输入："abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"
// 示例 2：

// 输入："aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"

var countSubstrings = function (s) {
  // const ans = []
  let count = 0
  const isPalindrome = (i, j) => {
    while (i < j) {
      if (s[i] !== s[j]) return false
      i++
      j--
    }
    return true
  }
  for (let i = 0; i < s.length; i++) {
    count++
    let j = i + 1
    while (s[j]) {
      if (isPalindrome(i, j)) {
        // ans.push(s.substring(i, j + 1))
        count++
      }
      j++
    }
  }
  return count
}

console.log(countSubstrings('abc'))
console.log(countSubstrings('aaa'))
