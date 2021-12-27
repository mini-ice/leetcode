function formatDate(date, format = '') {
  let currentDate = new Date(date);
  let month = currentDate.getMonth() + 1,
    day = currentDate.getDate(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    second = currentDate.getSeconds();
  function lessTen(num) {
    return num < 10 ? '0' + num : num;
  }
  let hash = {
    Y: currentDate.getFullYear(),
    m: lessTen(month),
    d: lessTen(day),
    H: lessTen(hour),
    i: lessTen(minute),
    s: lessTen(second),
  };

  return format.replace(/(Y|m|d|H|i|s)/g, (match, $1) => {
    return hash[$1];
  });
}

console.log(formatDate('2020-02-26 08:00:00', 'Y/m'));
console.log(formatDate('1997-07-01 00:01:59', 'xxxHyyyizzzs'));

function isValidPortArea(str) {
  const arr = str.split(',');
  const regex1 = /\d+/;
  const regex2 = /(\d)-(\d)/

  return arr.some((item) => {
    if(regex1.test)
  });
}
