// let sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// Promise.limitConcurrence = function (fnPromises, limit = 5) {
//   let len = fnPromises.length >>> 0,
//     result = [],
//     count = 0;

//   let x = [].slice();

//   if (typeof fnPromises[Symbol.iterator] !== 'function') {
//     throw new TypeError('迭代不了');
//   }

//   function enQuene() {}

//   return new Promise((resolve, reject) => {});
// };

const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () =>
  timeout(2000).then(() => {
    console.log('1');
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log('2');
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log('3');
    return 3;
  });

const mergePromise = (ajaxArray) => {
  // 在这里实现你的代码
  let len = ajaxArray.length >>> 0,
    result = [],
    count = 1;
  if (len === 0) return Promise.resolve();

  function sequence(i, resolve, reject) {
    return Promise.resolve(ajaxArray[i]()).then((val) => {
      count++;
      result.push(val);
      if (count > len) {
        resolve(result);
      } else sequence(i + 1, resolve, reject);
    }, reject);
  }

  return new Promise((resolve, reject) => {
    try {
      sequence(0, resolve, reject);
    } catch (e) {
      reject(e);
    }
  });
};

// const mergePromise = async (ajaxArray) => {
//   let result = [];
//   for (let fn of ajaxArray) {
//     const val = await fn();
//     result.push(val);
//   }

//   return result;
// };

console.time();
mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.timeEnd();
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});
