const add = (...args) => args.reduce((acc, item) => (typeof item === 'number' ? acc + item : acc), 0);

function curry() {
  const fn = [].shift.call(arguments);
  const args = [].slice.call(arguments);

  if (typeof fn !== 'function') throw new TypeError('Function');

  const len = fn.length || 0;

  function internalCurry() {
    const _this = this;
    const _args = args.concat([].slice.call(arguments));

    // len === 0 的情况 ...args || ()
    if ((len === 0 && arguments.length === 0) || (_args.length > len && len > 0)) {
      return fn.apply(_this, _args);
    }

    // return internalCurry
    return curry.apply(_this, [fn, ..._args]);
  }

  return internalCurry;
}

const curryAdd = curry(add);
console.log(curryAdd(1)());
console.log(curryAdd(1, 2)());
console.log(curryAdd(1)(2)(3)(4)());

function compose() {
  const funcs = [].slice.call(arguments);

  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

function curry01(fn, ...args) {
  const len = fn.length;

  function internalCurry(...args01) {
    const _this = this;
    const _args = [...args, ...args01];

    if ((len === 0 && _args.length === 0) || _args.length > len) {
      return fn.apply(_this, _args);
    }

    return curry01.apply(_this, [fn, ...args]);
  }

  return internalCurry;
}
