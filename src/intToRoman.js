var intToRoman = function(num) {
  const map = new Map([
    [0,["","I","II","III","IV","V","VI","VII","VIII","IX"]],
    [1,["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"]],
    [2,["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"]],
    [3,["", "M","MM","MMM",'MMMM']],
    // [0,['I','V']]
    // [1,['X','L']]
    // [2,['C','D']]
    // [3,['M','V']]
  ])
  let result = ''
  let i = 0
  while(num > 0){
    let str = map.get(i)[num % 10]
    result  = str + result
    i++
    num= Math.floor(num / 10)
  }
  return result
}

intToRoman(3)
intToRoman(58)
intToRoman(1994)

// 字符          数值
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
