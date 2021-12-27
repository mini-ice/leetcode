/**
 * 
 * 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

注意：解集不能包含重复的组合。 

 

示例 1:

输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
示例 2:

输入: candidates = [2,5,2,1,2], target = 5,
输出:
[
[1,2,2],
[5]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。} candidates 
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  let len = candidates.length,
    currentCollection = [],
    result = [],
    candidate = candidates.sort((a, b) => a - b);

  const recursive = (start, target) => {
    if (target === 0) {
      result.push(currentCollection.slice());
      return;
    }

    if (start === len) return;

    for (let i = start; i < len; i++) {
      if (i > start && candidate[i] === candidate[i - 1]) {
        continue;
      }

      currentCollection.push(candidate[i]);
      recursive(i + 1, target - candidate[i]);
      currentCollection.pop();
    }
  };

  recursive(0, target);

  return result;
};

combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
combinationSum2([2, 5, 2, 1, 2], 5);
