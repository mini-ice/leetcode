/**
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。你可以假设 nums1 的空间大小等于 m + n，这样它就有足够的空间保存来自 nums2 的元素。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let i = m - 1,
    j = n - 1,
    end = m + n - 1;
  while (j >= 0) {
    nums1[end--] = i >= 0 && nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
  }
};

// merge([-1, 0, 1, 1, 0, 0, 0, 0, 0], 4, [-1, 0, 2, 2, 3], 5);
// merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6, 7], 4);
// merge([0], 0, [1], 1);
merge([2, 0], 1, [1], 1);
//[1, 2, 3, 0, 0, 0]
//[-2, 0, 6]

/**
 * [1, 2, 3] [-2, 0, 6] i = 0
 * [-2, 1, 2, 3] [0, 6] i = 1
 * [-2, 0, 1, 2, 3] [6] i = 2
 *
 */
