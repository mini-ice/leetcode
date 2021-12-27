/**
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function (A, start = 0) {
  let result = 0
  let i = start
  while (i < A.length - 2) {
    if (A[i] < A[i + 1] && A[i + 1] > A[i + 2] && (i - start) * 2 + 1 > result) {
      // let end = i + 2
      let left = i,
        right = i + 2
      while (left >= start && right < A.length - 1 && A[right] < A[right - 1] && A[left + 1] > A[left]) {
        left--
        right++
      }
      console.log(left, start, right)
      // console.log(left, right, A.length, start)
      result = Math.max(right - left + 1, longestMountain(A, right + 1))
      break
    }
    i++
  }
  return result
}

console.log(longestMountain([2, 1, 4, 7, 3, 2, 5], 0))
