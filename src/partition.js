// 给定一个字符串 s ，请将 s 分割成一些子串，使每个子串都是 回文串 ，返回 s 所有可能的分割方案。

// 回文串 是正着读和反着读都一样的字符串。

//

// 示例 1：

// 输入：s = "google"
// 输出：[["g","o","o","g","l","e"],["g","oo","g","l","e"],["goog","l","e"]]
// 示例 2：

// 输入：s = "aab"
// 输出：[["a","a","b"],["aa","b"]]
// 示例 3：

// 输入：s = "a"
// 输出：[["a"]
//

// 提示：

// 1 <= s.length <= 16
// s 仅由小写英文字母组成

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const len = s.length;
  const result = [],
    ans = [],
    dp = new Array(len).fill(undefined).map((_) => new Array(s[0][0]).fill(undefined));

  const isPalindrome = (i, j) => {
    if (dp[i][j] !== undefined) return dp[i][j];
    let left = i,
      right = j;
    while (left < right) {
      if (s[left] !== s[right]) {
        dp[i][j] = -1;
        return -1;
      }
      left++;
      right--;
    }

    dp[i][j] = 1;
    return 1;
  };

  const dfs = (i) => {
    if (i === len) {
      result.push(ans.slice());
      return;
    }

    for (let j = i; j < len; j++) {
      if (isPalindrome(i, j) === 1) {
        ans.push(s.slice(i, j + 1));
        dfs(j + 1);
        ans.pop();
      }
    }
  };

  dfs(0);

  return result;
};

partition('google');
