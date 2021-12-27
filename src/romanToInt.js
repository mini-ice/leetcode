var romanToInt = function (s) {
  let obj = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }
  let num = 0

  for (let i = 0, len = s.length; i < len; i++) {
    let left = s[i],
      right = s[i + 1],
      newNum = obj[left] < obj[right] ? 0 - obj[left] : obj[left]
    num += newNum
  }
  return num
}

romanToInt('')
romanToInt('III')
romanToInt('IV')
romanToInt('IX')
romanToInt('LVIII')
romanToInt('MCMXCIV')
