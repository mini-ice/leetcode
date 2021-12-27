// /**
//  * @param {string} num1
//  * @param {string} num2
//  * @return {string}
//  */
// var multiply = function (num1, num2) {
//   let len1 = num1.length
//   let len2 = num2.length
//   let pos = new Array(len1 + len2).fill(0)
//   for (let i = len1 - 1; i >= 0; i--) {
//     let n1 = +num1[i]
//     for (let j = len2 - 1; j >= 0; j--) {
//       let n2 = +num2[j]
//       const multi = n1 * n2
//       const sum = pos[i + j + 1] + multi

//       pos[i + j + 1] = sum % 10
//       pos[i + j] += (sum / 10) | 0
//     }
//   }
//   while (pos[0] == 0) {
//     pos.shift()
//   }
//   return pos.length ? pos.join('') : '0'
// }
// // var multiply = function (num1, num2) {
// //   const addString = (num1 = '0', num2 = '0') => {
// //     let ans = []
// //     let i = num1.length - 1,
// //       j = num2.length - 1
// //     let add = 0
// //     while (i >= 0 || j >= 0 || add !== 0) {
// //       let x = (+num1[i] || 0) + (+num2[j] || 0) + add
// //       ans.push(x % 10)
// //       add = Math.floor(x / 10)
// //       i--
// //       j--
// //     }
// //     return ans.reverse().join('')
// //   }
// //   const multip = (num1 = '0', num2 = '0', index = 0) => {
// //     if (num1 === '0' || num2 === '0') return '0'
// //     let i = num2.length - 1
// //     let add = 0
// //     let ans = new Array(index).fill(0)
// //     while (i >= 0 || add) {
// //       let x = (+num1 || 0) * (+num2[i] || 0) + add
// //       ans.push(x % 10)
// //       add = Math.floor(x / 10)
// //       i--
// //     }
// //     return ans.reverse().join('')
// //   }

// //   let min, max
// //   if (num1.length > num2.length) {
// //     min = num2
// //     max = num1
// //   } else {
// //     min = num1
// //     max = num2
// //   }
// //   let ans = '0'
// //   for (let i = min.length - 1; i >= 0; i--) {
// //     if(min[i] === '0') continue
// //     let val = multip(min[i], max, min.length - 1 - i)
// //     ans = addString(ans, val)
// //   }
// //   return ans
// // }

// // multiply('123', '11')
// // multiply('123', '0')
// multiply('123456789', '987654321')

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';

  let len = Math.min(num1.length, num2.length),
    x1 = len === num1.length ? num1 : num2,
    x2 = len === num1.length ? num2 : num1,
    res = [];

  const multiplus = (num1, num2) => {
    let str = '',
      x = 0;

    for (let i = num1.length - 1; i >= 0; i--) {
      let val = +num1[i] * +num2 + x;
      x = Math.floor(val / 10);
      str = (val % 10) + str;
    }

    return x !== 0 ? x + str : str;
  };

  for (let i = len - 1; i >= 0; i--) {
    let zero = ''.padEnd(len - i - 1, '0');
    res.push(multiplus(x2, x1[i]) + zero);
  }

  return add(...res);
};

function add(...nums) {
  let len = nums.length,
    acc = '',
    x = 0,
    maxLen = 0;

  for (let i = 0; i < len; i++) {
    maxLen = Math.max(nums[i].length, maxLen);
  }

  for (let i = 0; i < len; i++) {
    nums[i] = nums[i].padStart(maxLen, '0');
  }

  for (let i = maxLen - 1; i >= 0; i--) {
    let val = x;
    for (let j = 0; j < len; j++) {
      // console.log(nums[j][i])
      val += +nums[j][i];
    }

    let char = val % 10;
    x = Math.floor(val / 10);
    acc = char + acc;
  }
  return acc;
}

// multiply('123', '11');
// multiply('123', '0');
multiply('123', '987');
