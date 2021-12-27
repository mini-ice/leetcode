var letterCombinations = function (digits) {
  let map = new Map([
    ['2', 'abc'],
    ['3', 'def'],
    ['4', 'ghi'],
    ['5', 'jkl'],
    ['6', 'mno'],
    ['7', 'pqrs'],
    ['8', 'tuv'],
    ['9', 'wxyz'],
  ])
  let result = []
  let mapList = digits.split('').map(d => map.get(d + ''))
  let stack = []
  let point = 0
  const loop = () => {
    for (let i = 0, array = mapList[point++]; i < array.length; i++) {
      stack.push(array[i])
      if (point === digits.length) {
        result.push(stack.join(''))
      } else {
        loop()
        point--
      }
      stack.pop()
      console.log(stack)
    }
  }
  loop()
  return result

  // for (let i = mapList.length - 1; i >= 0; i--) {
  //   let newResult = []
  //   for (let j = 0; j < mapList[i].length; j++) {
  //     if (result.length === 0) {
  //       newResult.push(mapList[i][j])
  //     } else {
  //       for (let k = 0; k < result.length; k++) {
  //         newResult.push(mapList[i][j] + (result[k] || ''))
  //       }
  //     }
  //   }
  //   result = newResult
  // }
  // console.log(result)
  // return result
}

letterCombinations('2346')
