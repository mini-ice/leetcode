function asyncAdd(a, b, callback) {
  let delay = Math.floor(Math.random() * 5) * 1000;
  setTimeout(function () {
    callback(null, a + b);
  }, delay);
}

function asyncAddWithPromise(a, b) {
  if (b === null || b === undefined) return Promise.resolve(a);
  return new Promise((resolve) =>
    asyncAdd(a, b, (_, val) => {
      resolve(val);
    })
  );
}

// function sum(...args) {
//   let promises = [];
//   return new Promise((resolve) => {
//     if (args.length <= 1) return resolve(args[0]);
//     for (let i = 0; i < args.length; i += 2) {
//       promises.push(asyncAddWithPromise(args[i], args[i + 1]));
//     }

//     Promise.all(promises).then((vals) => {
//       resolve(sum(...vals));
//     });
//   });
// }

// console.time('000');
// sum(1, 2, 3, 4, 5).then((res) => {
//   console.log(res);
//   console.timeEnd('000');
// });

// async function sum1(...args) {
//   if (args.length <= 1) return args[0];
//   let promises = [];
//   for (let i = 0; i < args.length; i += 2) {
//     promises.push(asyncAddWithPromise(args[i], args[i + 1]));
//   }

//   let vals = await Promise.all(promises);
//   console.log(vals);
//   let ret = await sum1(...vals);
//   return ret;
// }

// console.time('111');
// sum1(1, 2, 3, 4, 5).then((res) => {
//   console.log(res);
//   console.timeEnd('111');
// });

function sum2(...args) {
  if (args.length <= 1) return Promise.resolve(args[0]);
  let ret = [],
    currentPending = [];
  return new Promise((resolve) => {
    const next = (a, b) => {
      let id = Math.random().toString(36).slice(-8);
      currentPending.push(id);
      return asyncAddWithPromise(a, b).then((val) => {
        const index = currentPending.indexOf(id);
        currentPending.splice(index, 1);
        ret.push(val);
        if (ret.length <= 1 && currentPending.length === 0) {
          return resolve(ret[0]);
        } else if (ret.length > 1) {
          next(ret.shift(), ret.shift());
        }
      });
    };
    for (let i = 0; i < args.length; i += 2) {
      next(args[i], args[i + 1]);
    }
  });
}

console.time('222');
sum2(1, 2, 3, 4, 5).then((res) => {
  console.log(res);
  console.timeEnd('222');
});
