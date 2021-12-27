/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function (words) {
  let result = []
  let map = new Map()
  for (let i = 0; i < words.length - 1; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if (isPalindrome(`${words[i]}${words[j]}`) && map.get(i) !== j) {
        result.push([i, j])
        map.set(i, j)
      }
      if (isPalindrome(`${words[j]}${words[i]}`) && map.get(j) !== i) {
        result.push([j, i])
        map.set(j, i)
      }
    }
  }

  function isPalindrome(word) {
    if (word.length < 1) return false
    let left = 0
    let right = word.length - 1
    while (left < right) {
      if (word[left] !== word[right]) {
        return false
      }
      left++
      right--
    }
    return true
  }

  console.log(result)
  return result
}

palindromePairs(['abcd', 'dcba', 'lls', 's', 'sssll'])
