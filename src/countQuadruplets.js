/**
 * 2021/12/29
 * {@link https://leetcode-cn.com/problems/count-special-quadruplets/}
 *
 * 第一次 4重循环不超时的
 */
function countQuadruplets(nums) {
  // 蛮力法 On^4
  // let max = 0,
  //   count = 0;

  // for (let i = 0; i < nums.length; i++) {
  //   max = Math.max(nums[i], max);
  // }

  // for (let i = 0; i < nums.length; i++) {
  //   if (nums[i] >= max) continue;
  //   let a = nums[i];
  //   for (let j = i + 1; j < nums.length; j++) {
  //     let b = a + nums[j];
  //     if (b >= max) continue;
  //     for (let k = j + 1; k < nums.length; k++) {
  //       let c = b + nums[k];
  //       for (let z = k + 1; z < nums.length; z++) {
  //         if (nums[z] === c) {
  //           count++;
  //         }
  //       }
  //     }
  //   }
  // }

  // return count;

  // 一开始想用三数和 后来感觉不太对劲
  // 可以map + 2数和 => d - c = a + b  => dp.has(nums[a] + nums[b])
  // n > d > c > b
  let dp = new Map(),
    len = nums.length,
    count = 0;

  for (let b = len - 3; b >= 1; b--) {
    for (let d = b + 2; d < len; d++) {
      dp.set(nums[d] - nums[b + 1], (dp.get(nums[d] - nums[b + 1]) || 0) + 1);
    }

    for (let a = 0; a < b; ++a) {
      if (dp.has(nums[a] + nums[b])) count += dp.get(nums[a] + nums[b]);
    }
  }

  return count;
}

console.log(countQuadruplets([9, 6, 8, 23, 39, 23]));
