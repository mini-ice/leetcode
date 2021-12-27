/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
  let str = '';
  let charCode = new Array(26).fill().map((_, i) => String.fromCharCode(i + 64));

  charCode[0] = 'Z';

  while (columnNumber > 26) {
    let x = columnNumber % 26;
    str = charCode[x] + str;
    columnNumber = (columnNumber - (x || 26)) / 26;
  }

  console.log(charCode[columnNumber % 26] + str);
  return charCode[columnNumber % 26] + str;
};
convertToTitle(1);
convertToTitle(28);
convertToTitle(52);
convertToTitle(701);
convertToTitle(2147483647);
