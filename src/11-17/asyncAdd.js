/**
 * 请在 sum函数中调用此函数，完成数值计算
 * @param {*} a 要相加的第一个值
 * @param {*} b 要相加的第二个值
 * @param {*} callback 相加之后的回调函数
 */
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}

/**
 * 请在此方法中调用asyncAdd方法，完成数值计算
 * @param  {...any} rest 传入的参数
 */
async function sum(...rest) {
  // 请在此处完善代码
  if (rest.length === 1) return rest[0];
  const promises = [];

  for (let i = 0; i < rest.length; i += 2) {
    promises.push(
      new Promise((resolve) => {
        if (rest[i + 1] === undefined) {
          resolve(rest[i]);
        } else {
          asyncAdd(rest[i], rest[i + 1], (_, val) => resolve(val));
        }
      })
    );
  }

  let newRest = await Promise.all(promises);
  const ret = await sum(...newRest);
  return ret;

  // return previous;
}

let start = Date.now();
sum(1, 2, 3, 4, 5, 6).then((res) => {
  // 请保证在调用sum方法之后，返回结果21
  console.log(res);
  console.log(`程序执行共耗时: ${Date.now() - start}`);
});
