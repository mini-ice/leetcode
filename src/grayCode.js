/**
 * 2022/1/8
 * {@link https://leetcode-cn.com/problems/gray-code/}
 * @param {number} n
 * @return {number[]}
 */
function grayCode(n) {
  // 0 1 3 7 6 14 15 11 9 8
  // 0 00 01  000 001 011 010
  // 1 11 10  110 111 101 100
  let ret = [];

  /**
   * 解法一:
   * dfs 时间复杂度 On^2 
   */
  function dfs(str, ret, flag) {
    if (str.length === n) {
      ret.push(parseInt(str, 2));
      return;
    }

    if (!flag) {
      dfs(str + '0', ret, flag);
      dfs(str + '1', ret, !flag);
    } else {
      dfs(str + '1', ret, !flag);
      dfs(str + '0', ret, flag);
    }
  }

  dfs('', ret, false);
  return ret;

  /**
   * 解法二:
   * 位运算 + 对称
   * todo...
   */


}
grayCode(2); // [00,01,11,10]
