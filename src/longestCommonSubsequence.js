/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
//  示例 1：

//  输入：text1 = "abcde", text2 = "adcde"
//  输出：3
//  解释：最长公共子序列是 "ace" ，它的长度为 3 。
//  示例 2：

//  输入：text1 = "abc", text2 = "abc"
//  输出：3
//  解释：最长公共子序列是 "abc" ，它的长度为 3 。
//  示例 3：

//  输入：text1 = "abc", text2 = "def"
//  输出：0
//  解释：两个字符串没有公共子序列，返回 0 。

var longestCommonSubsequence = function (text1, text2) {
  const len1 = text1.length + 1,
    len2 = text2.length + 1;
  const dp = new Array(len1).fill('').map(() => new Array(len2).fill(0));
  for (let i = 1; i < len1; i++) {
    for (let j = 1; j < len2; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  console.log(dp);
  return dp[len1 - 1][len2 - 1];
};

// DP[i][j] = max(DP[i - 1][j], DP[i][j - 1])

/**
 *     a,b,c,d,e
 *   0 0 0 0 0 0
 * a 0 1 1 1 1 1
 * c 0 1 1 2 2 2
 * e 0 1 1 2 2 3
 */

// longestCommonSubsequence('abcde', 'ae');
// longestCommonSubsequence('abc', 'abc');
// longestCommonSubsequence('abc', 'def');
longestCommonSubsequence('mhunuzqrkzsnidwbun', 'szulspmhwpazoxijwbq');
