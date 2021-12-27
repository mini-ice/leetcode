var isValid = function (s) {
  // let resultList = [true, true, true]
  let map = {
    '(': ')',
    '{': '}',
    '[': ']',
  }
  let list = []
  if (s.length % 2 !== 0) return false
  for (const char of s) {
    let value = map[char]
    if (value) {
      list.push(char)
    } else {
      let top = list.pop()
      if (char !== map[top]) return false
    }
  }
  return list.length === 0
}

isValid('()[]{}')
isValid('(]')
isValid('([])')
isValid('([)]')
