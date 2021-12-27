function co(gen) {
  const _this = this;
  const args = [].slice.call(arguments, 1);
  return new Promise(function (resolve, reject) {
    gen = gen.apply(_this, args);
    onFulfilled();
    function onFulfilled(value) {
      let ret;

      try {
        ret = gen.next(value);
        next(ret);
      } catch (error) {
        reject(error);
      }
    }
    function onRejected(reason) {
      let ret;

      try {
        ret = gen.throw(reason);
        next(ret);
      } catch (error) {
        reject(error);
      }
    }
    function next(ret) {
      if (ret.done) return resolve(ret.value);
      if (ret.value instanceof Promise || (ret.value && ret.value.then)) {
        return ret.value.then(onFulfilled, onRejected);
      } else {
        return Promise.resolve(ret.value).then(onFulfilled, onRejected);
      }
    }
  });
}

function co2(gen) {
  const _this = this,
    args = [].slice.call(arguments, 1);

  return new Promise((resolve, reject) => {
    gen = gen.apply(_this, args);
    onFulfilled();
    function onFulfilled(value) {
      try {
        let ret = gen.next(value);
        next(ret);
      } catch (error) {
        reject(error);
      }
    }

    function onRejected(reason) {
      try {
        let ret = gen.throw(reason);
        next(ret);
      } catch (error) {
        reject(error);
      }
    }

    function next(ret) {
      if (ret.done) resolve(ret.value);
      return Promise.resolve(ret.value).then(onFulfilled, onRejected);
    }
  });
}

function delay(ms, id) {
  return new Promise((resolve) => setTimeout(() => resolve(id), ms));
}

function* gen() {
  const a = yield delay(1000, 1);
  console.log(a);
  const b = yield delay(1000, a + 1);
  console.log(b);
  const c = yield delay(1000, b + 1);
  console.log(c);

  return a + b + c;
}

co(gen);
