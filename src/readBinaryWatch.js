/**
 * @param {number} turnedOn
 * @return {string[]}
 */
var readBinaryWatch = function (turnedOn) {
  let hours = [1, 2, 4, 8],
    minutes = [1, 2, 4, 8, 16, 32];
  const result = [];

  function recall(curHours, curMinute, hoursPoint, minutesPoint, turnedOn) {
    if (!turnedOn && (curHours || curMinute)) {
      result.push(`${curHours}:${curMinute < 10 ? '0' + curMinute : curMinute}`);
      return;
    }

  }
};
