/**
 * 蛮力法
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function (secret, guess) {
  const len = secret.length,
    secretGroup = new Array(10).fill(0),
    guessGroup = new Array(10).fill(0);
  let countA = 0,
    countB = 0;

  for (let i = 0; i < len; i++) {
    if (guess[i] === secret[i]) countA++;
    else {
      secretGroup[+secret[i]]++;
      guessGroup[+guess[i]]++;
    }
  }

  for (let i = 0; i < 10; i++) {
    countB += Math.min(guessGroup[i], secretGroup[i]);
  }

  console.log(`${countA}A${countB}B`);
  return `${countA}A${countB}B`;
};

/**
 *
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
// var getHint = function (secret, guess) {};

getHint('1807', '7810');
getHint('1123', '0111');
getHint('1', '0');
getHint('1', '1');
getHint('01', '12');
