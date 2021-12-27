// var longestPalindrome = function (s) {
//   let begin = 0;
//   let maxLength = 1;
//   if (!s) return '';
//   for (let i = 0; i < s.length - 1; i++) {
//     for (let j = i + 1; j < s.length; j++) {
//       if (maxLength < j - i + 1 && validate(i, j)) {
//         console.log(j);
//         begin = i;
//         maxLength = j - i + 1;
//       }
//     }
//   }
//   function validate(i, j) {
//     while (i < j) {
//       if (s[i] === s[j]) {
//         i++;
//         j--;
//       } else {
//         return false;
//       }
//     }
//     return true;
//   }
//   console.log(begin, maxLength, s.substring(begin, begin + maxLength));
//   return s.substring(begin, begin + maxLength);
// };

// longestPalindrome("babadab")
// longestPalindrome('babad')
// longestPalindrome('cccc')
// longestPalindrome('')
// longestPalindrome('a');
// longestPalindrome('cbbd')
/**
 *
 */

function longestPalindrome01(s) {
  if (s.length < 2) return s;
  const isPalindrome = (s, i, j) => {
    while (i >= 0 && j < s.length && s[i] === s[j]) {
      --i;
      ++j;
    }

    return j - i - 1;
  };

  let start = 0,
    end = 0;
  for (let i = 0; i < s.length; i++) {
    let len1 = isPalindrome(s, i, i);
    let len2 = isPalindrome(s, i, i + 1);

    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = Math.floor(i - (len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
}

// longestPalindrome01('badadab');
// longestPalindrome01('babad');
// longestPalindrome01('cccc');
// longestPalindrome01('');
// longestPalindrome01('a');
// longestPalindrome01('cbbd');
longestPalindrome01(
  'crbidxnkyieminyzchamldzjzglygkfbbyggagwdqdqamzpguppqjfrcewfduwvcmhliahovcwoupwxwhaoiiiguahuqxiqndwxqxweppcbeoasgtucyqlxnxpvtepwretywgjigjjuxsrbwucatffkrqyfkesakglyhpmtewfknevopxljgcttoqonxpdtzbccpyvttuaisrhdauyjyxgquinvqvfvzgusyxuqkyoklwslljbimbgznpvkdxmakqwwveqrpoiabmiegoyzuyoignfcgmqxvpcmldivknulqbpyxjuvyhrzcsgiusdhsogftokekbdynmksyebsnzbxjxfvwamccphzzlzuvotvubqvhmusdtwvlsnbqwqhqcigmlfoupnqcxdyflpgodnoqaqfekhcyxythaiqxzkahfnblyiznlqkbithmhhytzpcbkwicstapygjpjzvrjcombyrmhcusqtslzdyiiyvujnrxvkrwffwxtmdqqrawtvayiskcnpyociwkeopardpjeyuymipekbefbdfuybfvgzfkjtvurfkopatvusticwbtxdtfifgklpmjamiocalcocqwdivyulupammxhdbeazrrktxiyothnvbwwrsocxzxaxmoenigbhvxffddexrwsioqoyovaqvtmkwzupstkgkmvrddzolmuzjnsj'
);
