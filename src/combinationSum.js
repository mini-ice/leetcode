/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// var combinationSum = function (candidates, target) {
//   let list = []
//   candidates = candidates.sort((a, b) => a - b)
//   const recursive = (candidates, rest, index, ans) => {
//     if (rest === 0) {
//       list.push(ans)
//       return
//     } else if (rest >= candidates[index]) {
//       for (let i = index; i < candidates.length; i++) {
//         recursive(candidates, rest - candidates[i], i, [...ans, candidates[i]])
//       }
//     }
//     return
//   }
//   recursive(candidates, target, 0, [], 0)
//   return list
// }

// combinationSum([2, 3, 6, 7], 7)

var combinationSum2 = function (candidates, target) {
  let list = []
  candidates = candidates.sort((a, b) => a - b)
  const recursive = (rest, index, ans) => {
    if (rest === 0) {
      list.push(ans)
      return
    } else if (rest >= candidates[index]) {
      for (let i = index; i < candidates.length; i++) {
        if (i > index && candidates[i] === candidates[i - 1]) {
          continue
        }
        recursive(rest - candidates[i], i + 1, [...ans, candidates[i]])
      }
    }
    return
  }
  recursive(target, 0, [])
  console.log(list)
  return list
}

combinationSum2([2, 5, 2, 1, 2], 5)
