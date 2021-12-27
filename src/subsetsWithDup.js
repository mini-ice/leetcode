/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  let res = [];
  const dfs = (start, curArr, nums) => {
    res.push(curArr);
    console.log(curArr, start);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }
      dfs(i + 1, [...curArr, nums[i]], nums);
    }
  };
  dfs(
    0,
    [],
    nums.sort((a, b) => a - b)
  );
  // console.log(res);
  return res;
};

subsetsWithDup([4, 4, 4, 1, 4]);
