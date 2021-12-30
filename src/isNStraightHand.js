/**
 * 2021/12/30
 * {@link https://leetcode-cn.com/problems/hand-of-straights/}
 * 许愿字节oc
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
function isNStraightHand(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;
  let nums = hand.sort((a, b) => a - b),
    dp = new Map();
  // 1 2 2 3 3 4 6 7 8

  // O nlogn
  for (let i = 0; i < nums.length; i++) {
    dp.has(nums[i]) ? dp.set(nums[i], dp.get(nums[i]) + 1) : dp.set(nums[i], 1);
  }

  let i = 0,
    ret = 0;
  while (i < nums.length - groupSize + 1) {
    let j = i + 1;
    while (nums[j] === nums[i]) {
      j++;
    }
    const count = dp.get(nums[i]);
    if (count === 0) {
      i++;
      continue;
    }

    for (let k = 0; k < groupSize; k++) {
      if ((dp.get(nums[i] + k) || 0) < count) return false;
      dp.set(nums[i] + k, dp.get(nums[i] + k) - count);
      ret += count;
    }

    i = j;
  }
  return ret === nums.length;
}

console.log(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3));
console.log(isNStraightHand([1, 2, 3, 4, 5], 4));
