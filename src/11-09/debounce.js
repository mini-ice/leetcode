function debounce(fn, wait, options) {
  var _a, _b, _c;
  if (typeof fn !== 'function') throw new TypeError('fn expect be function');
  var lastThis, lastArgs, result, lastCallTime, lastInvokeTime, timerId;
  var leading = false,
    trailing = true,
    maxing = false,
    maxWait;
  wait = wait !== null && wait !== void 0 ? wait : 0;
  var useRaf = !!(wait === 0 && requestAnimationFrame);
  if (options) {
    leading = (_a = options.leading) !== null && _a !== void 0 ? _a : leading;
    trailing = (_b = options.trailing) !== null && _b !== void 0 ? _b : trailing;
    maxing = !!options.maxWait;
    maxWait = Math.max(wait, (_c = options.maxWait) !== null && _c !== void 0 ? _c : 0);
  }
  function invokeFunc(time) {
    var args = lastArgs;
    var thisArg = lastThis;
    result = fn.apply(thisArg, args);
    lastInvokeTime = time;
    lastArgs = lastThis = undefined;
    console.log(Date.now());
    return result;
  }
  function startTimer(pendingFn, wait) {
    if (useRaf) {
      timerId && cancelAnimationFrame(timerId);
      return requestAnimationFrame(pendingFn);
    }
    return setTimeout(pendingFn, wait);
  }
  function cancelTimer(timerId) {
    if (!timerId) return;
    useRaf ? cancelAnimationFrame(timerId) : clearTimeout(timerId);
  }
  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    timerId = startTimer(timeExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainWait(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;
    var remainWait = wait - timeSinceLastCall;
    return maxing ? Math.min(remainWait, maxWait - timeSinceLastInvoke) : remainWait;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }
  function timeExpired() {
    var time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = startTimer(timeExpired, remainWait(time));
  }
  function trailingEdge(time) {
    timerId = undefined;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return;
  }
  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }
  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }
  function pending() {
    return timerId !== undefined;
  }
  function debounced() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var time = Date.now();
    var invoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    if (invoking) {
      if (timerId === undefined) {
        console.log('timerId === undefined');
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        console.log('maxing');
        timerId = startTimer(timeExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      console.log('!invoking && timerId === undefined');
      timerId = startTimer(timeExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.flush = pending;
  return debounced;
}
function throttle(fn, wait) {
  return debounce(fn, wait, { maxWait: wait, leading: true, trailing: true });
}

const foo = debounce(
  (count) => {
    // console.log(...args);
    return Promise.resolve(count);
  },
  500,
  { maxWait: 500, leading: true, trailing: false }
);

let count = 5;
let time = Date.now();
foo(count);
let a = setInterval(() => {
  count--;
  if (count < 0) {
    clearInterval(a);
    return;
  }

  let x = foo(count);
}, 200);

// setTimeout(() => {
//   foo(10);
// }, 3000);

function debounce01(fn, wait, option) {
  if (typeof fn !== 'function') throw new TypeError('fn');
  let lastThis, lastArgs, result, lastCallTime, lastInvokeTime, timerId;

  let leading = false,
    trailing = true,
    wait = typeof wait === 'number' && wait >= 0 ? wait : 0,
    maxing = false,
    maxWait;

  if (option) {
    leading = option.leading || leading;
    trailing = option.trailing || trailing;
    maxing = !!option.maxWait;
    maxWait = Math.max(maxWait, wait);
  }

  function debouced(...args) {
    let time = Date.now();

    const invoking = shouldInvoke(time);
    lastCallTime = time;
    lastArgs = args;
    lastThis = this;

    if (invoking) {
      if (!timerId) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = startTimer(timeExpired, wait);
        return result;
      }
    }

    if (!timerId) timerId = startTimer(timeExpired, wait);

    return result;
  }

  function shouldInvoke(time) {
    const lastCallTimeSince = time - lastCallTime;
    const lastInvokeTimeSince = time - lastInvokeTime;

    return !lastCallTime || lastCallTimeSince >= wait || (maxing && lastInvokeTimeSince > maxWait);
  }

  function leadingEdge(time) {
    timerId = startTimer(timeExpired, wait);

    if (leading) {
      return invokeFunc(time);
    }

    return result;
  }

  function startTimer(pendingFn, wait) {
    return setTimeout(pendingFn, wait);
  }

  function cancelTimer(timerId) {
    return clearTimeout(timerId);
  }

  function invokeFunc(time) {
    lastInvokeTime = time;
    const _this = lastThis,
      _args = lastArgs;
    result = fn.apply(_this, _args);
    lastThis = lastArgs = undefined;

    return result;
  }

  function timeExpired() {
    const time = Date.now();

    const invoking = shouldInvoke(time);

    if (invoking) {
      return trailingEdge(time);
    }

    timerId = startTimer(timeExpired, remainWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    if (trailing) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;

    return result;
  }

  function remainWait(time) {
    const lastCallTimeSince = time - lastCallTime;
    const lastInvokeTimeSince = time - lastInvokeTime;
    const remainWait = wait - lastCallTimeSince;
    const remainInvokeWait = wait - lastInvokeTimeSince;

    return maxing ? Math.min(remainWait, remainInvokeWait) : remainWait;
  }

  function cancel() {
    return cancelTimer(timerId)
  }

  debounced.cancel = cancel;

  return debouced;
}
