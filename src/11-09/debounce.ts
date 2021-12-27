type options = {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
};

function debounce<T extends any[], U extends (...args: T) => ReturnType<U>>(
  fn: U,
  wait?: number,
  options?: options
): (...args: T) => ReturnType<U> | undefined {
  if (typeof fn !== 'function') throw new TypeError('fn expect be function');

  let lastThis: any,
    lastArgs: T | undefined,
    result: ReturnType<U> | undefined,
    lastCallTime: number | undefined,
    lastInvokeTime: number | undefined,
    timerId: number | undefined;

  let leading = false,
    trailing = true,
    maxing = false,
    maxWait: number;

  wait = wait ?? 0;

  const useRaf = !!(wait === 0 && requestAnimationFrame);

  if (options) {
    leading = options.leading ?? leading;
    trailing = options.trailing ?? trailing;
    maxing = !!options.maxWait;
    maxWait = Math.max(wait, options.maxWait ?? 0);
  }

  function invokeFunc(time: number) {
    const args = lastArgs;
    const thisArg = lastThis;

    result = fn.apply(thisArg, args as T);
    lastInvokeTime = time;
    lastArgs = lastThis = undefined;

    return result;
  }

  function startTimer(pendingFn: typeof timeExpired, wait: number): number {
    if (useRaf) {
      timerId && cancelAnimationFrame(timerId);
      return requestAnimationFrame(pendingFn);
    }

    return window.setTimeout(pendingFn, wait);
  }

  function cancelTimer(timerId?: number) {
    if (!timerId) return;
    useRaf ? cancelAnimationFrame(timerId) : clearTimeout(timerId);
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    timerId = startTimer(timeExpired, wait!);

    return leading ? invokeFunc(time) : result;
  }

  function remainWait(time: number) {
    const timeSinceLastCall = time - lastCallTime!;
    const timeSinceLastInvoke = time - lastInvokeTime!;
    const remainWait = wait! - timeSinceLastCall;

    return maxing ? Math.min(remainWait, maxWait - timeSinceLastInvoke) : remainWait;
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - lastCallTime!;
    const timeSinceLastInvoke = time - lastInvokeTime!;

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait! ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function timeExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    timerId = startTimer(timeExpired, remainWait(time));
  }

  function trailingEdge(time: number) {
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

  function debounced(this: any, ...args: T) {
    const time = Date.now();
    const invoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (invoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        timerId = startTimer(timeExpired, wait!);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = startTimer(timeExpired, wait!);
    }

    return result as ReturnType<U>;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.flush = pending;

  return debounced;
}

function throttle(fn: (...args: any[]) => any, wait: number) {
  return debounce(fn, wait, { maxWait: wait, leading: true, trailing: true });
}
