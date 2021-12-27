/**
 * @param {number} n
 * @return {string[]}
 * 动态规划
 * f(0) = ''
 * f(1) = '()'
 * f(2) = '()(),(())'
 * f(3) = '()()(),()(()),(()()),(())(),((()))'
 */
// var generateParenthesis = function (n) {
//   if (n === 0) return ['']
//   if (n === 1) return ['()']
//   const result = []
//   for (let p = 0; p < n; p++) {
//     const q = n - 1 - p
//     generateParenthesis(p).forEach(item => {
//       generateParenthesis(q).forEach(model => {
//         result.push(`(${item})${model}`)
//         console.log(model)
//       })
//     })
//   }
//   // console.log(result)
//   return result
// }

/**
 * @param {number} n
 * @return {string[]}
 * dfs
 */
var generateParenthesis = function (n) {
  if (n === 0) return ['']
  if (n === 1) return ['()']
  const result = []
  const dfs = (str, left, right) => {
    if (left === n && right === n) {
      // res = str
      result.push(str)
      return
    }
    if (left < right) {
      return
    }
    if (left < n) {
      dfs(str + '(', left + 1, right)
    }
    if (left > right) {
      dfs(str + ')', left, right + 1)
    }
  }
  dfs('', 0, 0, '')
  console.log(result)
  // console.log(result)
  return result
}

generateParenthesis(3)

/**
 * [(,(,(]
 * [),),)]
 * [(, , , , ,)]
 *
 *
 * 1,2,6,14,42
 */
