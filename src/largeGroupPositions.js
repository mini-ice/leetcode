/**
 * @param {string} s
 * @return {number[][]}
 */
var largeGroupPositions = function (s) {
  let reg = /(\w)\1{2,}/g
  let res = []
  s.replace(reg, (val, x, y) => {
    res.push([y, y + val.length - 1])
    return ''
  })
  return res
}

console.log(largeGroupPositions('abbxxxxzzy'))
