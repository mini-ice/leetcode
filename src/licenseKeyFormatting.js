/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var licenseKeyFormatting = function (s, k) {
  const chars = s.replace(/-/g, '').toLocaleUpperCase();
  let firstGroup = chars.length % k;
  let result = '';
  for (let i = 0; i < chars.length; i++) {
    result += chars[i];
    if (i === chars.length - 1) continue;
    if (i === firstGroup - 1 || (i - firstGroup + 1) % k === 0) {
      result += '-';
    }
  }
  console.log(result);
  return result;
};

licenseKeyFormatting('5F3Z-2e-9-w', 4);
licenseKeyFormatting('2-5g-3-J', 2);
