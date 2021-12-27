/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function (timeSeries, duration) {
  let i = 0,
    j = 0,
    result = 0;

  while (i < timeSeries.length) {
    while (j < timeSeries.length - 1 && timeSeries[j + 1] - timeSeries[j] <= duration - 1) {
      j++;
    }
    result += timeSeries[j] - timeSeries[i] + duration;
    j++;
    i = j;
  }

  console.log(result);
  return result;
};
findPoisonedDuration([1, 4], 2);
findPoisonedDuration([1, 2], 2);
findPoisonedDuration([1, 2, 3, 8, 10, 12, 20, 21], 3);
