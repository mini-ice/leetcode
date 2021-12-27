function quickSort(nums, left, right) {
  if (left >= right) return;
  left = left === undefined ? 0 : left;
  right = right === undefined ? nums.length - 1 : right;

  const getMidIndex = (nums, left, right) => {
    let i = left,
      j = right,
      privot = nums[left];
    console.log(left)
    while (i < j) {
      while (nums[j] >= privot && i < j) {
        j--;
      }
      while (nums[i] <= privot && i < j) {
        i++;
      }

      if (i < j) [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    [nums[left], nums[i]] = [nums[i], nums[left]];

    return i;
  };

  const mid = getMidIndex(nums, left, right);
  quickSort(nums, left, mid - 1);
  quickSort(nums, mid + 1, right);

  return nums;
}

console.log(quickSort([3, 2, 31, 9, 2, 5]));
