var SummaryRanges = function () {
  this.nums = [];
  this.hash = new Map();
};

/**
 * @param {number} val
 * @return {void}
 */
SummaryRanges.prototype.addNum = function (val) {
  if (this.hash.has(val)) return;
  this.hash.set(val, 1);
  if (this.nums.length === 0) {
    this.nums.push(val);
    return;
  }
  let i = 0,
    j = this.nums.length;
  while (i < j) {
    let mid = Math.floor((i + j) / 2);
    if (val > this.nums[mid]) {
      i = mid + 1;
    } else {
      j = mid;
    }
  }
  this.nums.splice(i, 0, val);
};

/**
 * @return {number[][]}
 */
SummaryRanges.prototype.getIntervals = function () {
  if (this.nums.length === 0) return [];
  let i = 0,
    result = [];
  while (i < this.nums.length) {
    let j = i + 1;
    while (this.nums[j] - this.nums[j - 1] === 1) {
      j++;
    }
    result.push([this.nums[i], this.nums[j - 1]]);
    i = j;
  }

  return result;
};

/**
 * Your SummaryRanges object will be instantiated and called as such:
 * var obj = new SummaryRanges()
 * obj.addNum(val)
 * var param_2 = obj.getIntervals()
 */
const summaryRanges = new SummaryRanges();
summaryRanges.addNum(6); // arr = [1]
summaryRanges.getIntervals(); // 返回 [[1, 1]]
summaryRanges.addNum(6); // arr = [1, 3]
summaryRanges.getIntervals(); // 返回 [[1, 1], [3, 3]]
summaryRanges.addNum(0); // arr = [1, 3, 7]
summaryRanges.getIntervals(); // 返回 [[1, 1], [3, 3], [7, 7]]
summaryRanges.addNum(4); // arr = [1, 2, 3, 7]
summaryRanges.getIntervals(); // 返回 [[1, 3], [7, 7]]
summaryRanges.addNum(8);
summaryRanges.getIntervals();
summaryRanges.addNum(7);
summaryRanges.getIntervals();
summaryRanges.addNum(6);
summaryRanges.getIntervals();
summaryRanges.addNum(4);
summaryRanges.getIntervals();
summaryRanges.addNum(7);
summaryRanges.getIntervals();
summaryRanges.addNum(5);
summaryRanges.getIntervals();
