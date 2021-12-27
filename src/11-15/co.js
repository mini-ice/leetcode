const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function* gen(id) {
  console.time(id);
  let a = yield sleep(500);
  let b = yield sleep(500);
  console.log(a, b);
  console.timeEnd(id);
}

function run(gen) {
  let g = gen();

  function next(data) {
    let result = g.next(data);
    if (result.done) return result.value;
    result.value.then((data) => {
      next(data);
    });
  }

  next(g);
}

run(gen, 1);
co(gen, 2);

/**
 * Execute the generator function or a generator
 * add return a promise
 *
 * @param {Function} fn
 * @returns {Promise}
 */

function co(gen) {
  var ctx = this;
  var args = [].slice.call(arguments, 1);

  return new Promise(function (resolve, reject) {
    if (!gen || typeof gen !== 'function') return resolve(gen);

    gen = gen.apply(ctx, args);

    onFulfilled();

    function onFulfilled(res) {
      let ret;
      try {
        ret = gen.next(res);
      } catch (error) {
        return reject(error);
      }
      next(ret);
      return;
    }

    function onRejected(err) {
      let ret;
      try {
        ret = gen.throw(err);
      } catch (error) {
        return reject(error);
      }
      next(ret);
    }

    function next(result) {
      if (result.done) return resolve(result.value);
      const value = toPromise.call(ctx, result.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(
        new TypeError(
          'You may only yield a function, promise, generator, array, or object, ' +
            'but the following object was passed: "' +
            String(result.value) +
            '"'
        )
      );
    }
  });
}

/**
 * Convert yield value into a Promise
 */
function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj;
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  if (typeof obj === 'function') return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  return obj;
}

function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}

function isGenerator(obj) {
  return typeof obj.next === 'function' && typeof obj.throw === 'function';
}

function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if (constructor.name === 'GeneratorFunction' || constructor.displayName === 'GeneratorFunction') return true;
  return isGenerator(constructor.prototype);
}

function thunkToPromise(fn) {
  const _this = this;
  return new Promise(function (resolve, reject) {
    fn.call(_this, function (err, ret) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

function objectToPromise(obj) {
  const results = {};
  const keys = Object.keys(obj);
  const promises = [];
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    const promise = toPromise(obj[key]);
    if (promise && isPromise(promise)) {
      defer(promise, key);
    } else {
      result[key] = obj[key];
    }
  }

  function defer(promise, key) {
    results[key] = undefined;
    promises.push(
      promise.then(function (res) {
        results[key] = res;
      })
    );
  }

  return Promise.all(promises).then(() => {
    return results;
  });
}
