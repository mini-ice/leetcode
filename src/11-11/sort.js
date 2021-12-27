function quickSort(nums, left, right) {
  left = left === undefined ? 0 : left;
  right = right === undefined ? nums.length - 1 : right;

  if (left >= right) return nums;

  let pivot = nums[left],
    i = left,
    j = right;

  while (i < j) {
    while (nums[j] >= pivot && i < j) {
      j--;
    }

    while (nums[i] <= pivot && i < j) {
      i++;
    }

    if (i < j) [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  [nums[i], nums[left]] = [nums[left], nums[i]];
  quickSort(nums, left, i - 1);
  quickSort(nums, i + 1, right);

  return nums;
}

quickSort([1, 2, 3]);
