const isPromise = (obj) => obj && typeof obj.then === 'function';

function sendRequest(requestList = [], limit = 5, handleRequestArgs) {
  let len = requestList.length >>> 0,
    sendCount = 0,
    ctx = this,
    count = 0,
    key = 0,
    result = [];

  return new Promise((resolve, reject) => {
    try {
      function defer(promise, key) {
        promise.then(
          (value) => {
            result[key] = value;
            console.log(value, Date.now() - a);
            count++;
            sendCount--;
            if (count >= len) return resolve(result);
            next();
          },
          (reason) => {
            result[key] = reason;
            count++;
            sendCount--;
            if (count >= len) return resolve(result);
            next();
          }
        );
      }

      function next() {
        if (sendCount >= limit || key >= len) return;
        const fn = requestList[key];
        const currentKey = key;
        key++;
        if (typeof fn !== 'function') {
          result[currentKey] = fn;
          count++;
          if (count >= len) return resolve(result);
          next();
        } else {
          const value = fn.apply(ctx, handleRequestArgs && handleRequestArgs.call(ctx, fn, sendCount));
          if (isPromise(value)) {
            sendCount++;
            defer(value, currentKey);
          } else {
            result[currentKey] = value;
            count++;
            if (count >= len) return resolve(result);
            next();
          }
        }
      }

      while (sendCount < limit) {
        next();
      }
    } catch (error) {
      reject(error);
    }
  });
}

const sleep = (delay, key) => new Promise((resolve) => setTimeout(() => resolve(key), delay));

let x = new Array(10).fill().map((_, i) => sleep.bind(null, (10 - i) * 100, 10 - i));

console.time();
let a = Date.now();
sendRequest(x, 3).then((res) => {
  console.timeEnd();
  console.log(res);
});
