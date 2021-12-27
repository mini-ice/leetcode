/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
function longestOnes(A, K) {
  let res = 0,
    // K = K,
    start = 0,
    end = 0;
  while (start < A.length && end < A.length) {
    while (end < A.length && (K > 0 || A[end] === 1)) {
      A[end] === 0 && K--;
      end++;
    }
    res = Math.max(res, end - start);
    while (start < A.length && A[start] === 1) start++;
    K++;
    start++;
  }
  return res;
}
longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3);
