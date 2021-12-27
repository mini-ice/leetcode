var myAtoi = function (str) {
  let result = 0;
  let isMinus = false;
  let isNum = 0;
  let i = 0;
  if (!str) return result;
  str = Array.from(str);
  while (i < str.length) {
    if (isNum === 0 && (str[i] === '-' || str[i] === '+')) {
      isMinus = str[i] === '-';
      isNum++;
      i++;
      continue;
    }
    if (isNaN(+str[i]) || (isNum > 0 && str[i] === ' ')) break;
    // if((isNum !== 0 && (isNaN(+str[i]) || str[i] === '')))break
    if (!isNaN(+str[i]) && str[i] !== ' ') {
      result = result === 0 ? +str[i] : result * 10 + +str[i];
      isNum++;
    }
    i++;
  }
  result = isMinus && result ? -result : result;
  if (result > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1;
  else if (result < Math.pow(-2, 31)) return Math.pow(-2, 31);
  console.log(result, isMinus);
  return result;
};

// myAtoi('words and 987');
// myAtoi('   - 41 93 with words');
// myAtoi('    419-3 with words');
// myAtoi('    0419-3 with words');
// myAtoi('    -+1');

function myAtoi01(s) {
  // let result = 0

  // function isValidChar(char) {
  //   return (char !== ' ' && !isNaN(char)) || char === '.';
  // }

  let len = s.length,
    result = '',
    i = 0,
    begining = false,
    max = Math.pow(2, 31) - 1,
    min = -Math.pow(2, 31);

  while (i < len) {
    


  }

  console.log(result);
  if (+result > max) return max;
  else if (+result < min) return min;
  return result;
}

myAtoi01('words and 987'); // 0
myAtoi01('   - 41.93 with words'); // 0
myAtoi01('   -41.93 with words'); // 41.93
myAtoi01('   -41. with words'); // 41.93
myAtoi01('   -0. with words'); // 41.93
myAtoi01('    419-3 with words'); // 419
myAtoi01('    0419-3 with words'); // 419
myAtoi01('    -+1'); // 0
myAtoi01('-91283472332'); // -Math.pow(2, 31)
myAtoi01('4193 with words'); // 4193
myAtoi01('   -42'); // -42
myAtoi01('42'); // 42
