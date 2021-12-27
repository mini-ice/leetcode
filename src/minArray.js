/**
 * @param {number[]} numbers
 * @return {number}
 */
// var minArray = function (numbers) {
//   if (numbers.length === 0) return ''
//   let min = numbers[0]
//   if (numbers[numbers.length - 1] > min) return min
//   for (let i = 0; i < numbers.length - 1; i++) {
//     if (numbers[i] > numbers[i + 1]) {
//       min = numbers[i + 1]
//       break
//     }
//   }
//   return min
// }

//折半
var minArray = function (numbers) {
  if (numbers.length === 0) return ''
  let i = 0,
    j = numbers.length - 1
  while (i !== j) {
    let m = Math.floor((i + j) / 2)
    if (numbers[m] > numbers[j]) {
      i = m + 1
    } else if (numbers[m] < numbers[i]) {
      j = m
    } else {
      j--
    }
  }
  return numbers[i]
  // let min = numbers[0]
  // if (numbers[numbers.length - 1] > min) return min
  // for (let i = 0; i < numbers.length - 1; i++) {
  //   if (numbers[i] > numbers[i + 1]) {
  //     min = numbers[i + 1]
  //     break
  //   }
  // }
  // return min
}

//5,6,1,2,3,4
