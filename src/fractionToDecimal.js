/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 * @example
 * 0.(012) 0.(6) 0.1(6)
 */
var fractionToDecimal = function (numerator, denominator) {
  let sign = '';
  if ((numerator < 0 && denominator > 0) || (numerator > 0 && denominator < 0)) sign = '-';

  numerator = Math.abs(numerator);
  denominator = Math.abs(denominator);

  const integer = Math.floor(numerator / denominator);
  let remainder = numerator % denominator;
  if (remainder === 0) return sign + numerator / denominator;

  const hash = new Map();

  const decimals = [];

  while (remainder !== 0) {
    numerator = remainder * 10;
    const integer = Math.floor(numerator / denominator);
    remainder = numerator % denominator;

    if (hash.has(numerator)) {
      decimals.splice(hash.get(numerator), 0, '(');
      decimals.push(')');
      break;
    } else {
      decimals.push(integer);
      hash.set(numerator, decimals.length - 1);
    }
  }

  console.log(`${sign}${integer}.${decimals.join('')}`)
  return `${sign}${integer}.${decimals.join('')}`;
};
fractionToDecimal(1, 2);
fractionToDecimal(2, 1);
fractionToDecimal(2, 3);
fractionToDecimal(4, 333);
fractionToDecimal(1, 5);
fractionToDecimal(1, -777);
fractionToDecimal(1, 6);
fractionToDecimal(-50, 8);
