/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  // let i = 0
  let result = []
  const isValid = (str) => {
    if (str.length > 1 && str[0] === '0') return false
    return str ? true : false
  }
  const reCall = (s, length, str) => {
    let l = length - 1
    if (l === 0) {
      if (+s <= 255 && isValid(s)) {
        result.push(str + s)
      }
      return
    }
    for (let i = 1; i < s.length; i++) {
      let curStr = s.substring(0, i)
      if (+curStr > 255 || !isValid(curStr)) break
      reCall(s.substring(i), l, str + curStr + '.')
    }
  }
  reCall(s, 4, '')
  console.log(result)
  return result
}

restoreIpAddresses('1111')
