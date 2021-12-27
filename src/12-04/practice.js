/**
 * 1. JavaScript有哪些数据类型，它们的区别？
 * js 有8种类型 number, string, boolean, undefined, null, symbol, bigInt, object
 *
 * 2. typeof
 * 可以判断类型 number, string, boolean, undefined, symbol, bigInt
 * null -> object
 * array -> object
 * object -> object
 * function -> function
 */

/**
 * @description 判断数据类型
 */
function judgeType(variable) {
  return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
}

/**
 * @description 判断数组类型
 */
function isArray(variable) {
  // return variable instanceof Array;
  // return Array.isArray(variable);
  return judgeType(variable) === 'array';
}

/****************************************************************/

/**
 * @name extends
 */

/**
 * @description 原型链继承
 * 缺点:
 * 1. 所有实例共享原型上的引用类型
 * 2. 子类实例话时不能给父类传参
 */
(function () {
  function SuperClass(...args) {
    this.name = 'super';
    this.args = args || [];
  }

  SuperClass.prototype.getName = function () {
    return this.name;
  };

  function SubClass() {}

  SubClass.prototype = new SuperClass('subclass prototype');

  let sub1 = new SubClass();
  let sub2 = new SubClass();

  sub1.getName(); // super;
  sub2.getName(); // super;
  sub1.args.push('oooo');
  console.log(sub2.args); // ['subclass prototype', 'oooo']
})();

/**
 * @description 构造函数继承
 * 缺点:
 * 1. 没继承原型方法
 */
(function () {
  function SuperClass(...args) {
    this.name = 'super';
    this.args = args;
  }

  SuperClass.prototype.getName = function () {
    return this.name;
  };
  SuperClass.prototype.getArgs = function () {
    return this.args;
  };

  function SubClass(...args) {
    SuperClass.call(this, ...args);
  }

  // SubClass.prototype = new SuperClass();

  let sub1 = new SubClass('sub1');
  let sub2 = new SubClass('sub2');

  console.log(sub1.args); // ['sub1'];
  sub1.args.push('oooo');
  console.log(sub1.args); // ['sub1', 'oooo'];
  console.log(sub2.args); // ['sub2']
  console.log(sub1.getName); // undefined
  console.log(sub2.getName); // undefined
})();

/**
 * @description 组合继承
 * 缺点:
 * 1. 创建2次父类
 */
(function () {
  function SuperClass(...args) {
    this.name = 'super';
    this.args = args;
  }

  SuperClass.prototype.getName = function () {
    return this.name;
  };
  SuperClass.prototype.getArgs = function () {
    return this.args;
  };

  function SubClass(...args) {
    SuperClass.call(this, ...args);
  }

  SubClass.prototype = new SuperClass();

  let sub1 = new SubClass('sub1');
  let sub2 = new SubClass('sub2');

  console.log(sub1.args); // [sub1];
  console.log(sub2.args); // [sub2];
  console.log(sub1.getName()); // super
  console.log(sub2.getName()); // super
})();

/**
 * @description 继承式组合继承
 */
(function () {
  function SuperClass(...args) {
    this.name = 'super';
    this.args = args;
  }

  SuperClass.prototype.getName = function () {
    return this.name;
  };
  SuperClass.prototype.getArgs = function () {
    return this.args;
  };

  function SubClass(...args) {
    SuperClass.call(this, ...args);
  }

  function _extends(superClass, subClass) {
    let prototype = Object.create(superClass.prototype);
    prototype.constructor = subClass;
    subClass.prototype = prototype;
  }

  _extends(SuperClass, SubClass);
})();

/****************************************************************/

/**
 * @name 数字去重
 */
let origin = Array.from(new Array(10000), (_, index) => {
  return index;
});

let target = Array.from(new Array(5000), (_, index) => {
  return index + index;
});

let arr = [...origin, ...target];

function getSinceTime(fn) {
  console.time(fn.name);
  fn(arr);
  console.timeEnd(fn.name);
}

/**
 * Set
 */
function unique01(arr) {
  return [...new Set(arr)];
}

/**
 * Set + for
 */
function unique02(arr) {
  let hash = new Set(),
    len = arr.length,
    ret = [];

  for (let i = 0; i < len; i++) {
    if (!hash.has(arr[i])) {
      hash.add(arr[i]);
      ret.push(arr[i]);
    }
  }

  return ret;
}

/**
 * filter + indexOf
 */
function uniqueFilter(arr) {
  return arr.filter((val, i) => arr.indexOf(val) === i);
}

getSinceTime(unique01);
getSinceTime(unique02);
getSinceTime(uniqueFilter);

/****************************************************************/

/**
 * @name 数组方法
 */

/**
 * forEach
 */
Array.prototype.myforeach = function (cb, thisArg) {
  let _context = this;

  _context = Object(_context);

  let len = _context.length >>> 0,
    i = 0,
    _thisArg;

  if (thisArg) {
    _thisArg = thisArg;
  }

  if (typeof cb !== 'function') {
    throw new TypeError('cb expected be a Function');
  }

  while (i < len) {
    let val;
    if (i in _context) {
      val = _thisArg[i];
      cb.call(_thisArg, val, i, _context);
    }
    i++;
  }
};

/**
 * filter
 */
Array.prototype.myFilter = function (cb, thisArg) {
  if (this === null || this === undefined) throw new TypeError();
  if (typeof cb !== 'function') throw new TypeError();

  let _this = Object(this),
    k = 0,
    ret = [],
    len = _this.length || 0,
    _thisArg;

  if (thisArg) {
    _thisArg = thisArg;
  }

  let kValue;
  while (k < len) {
    if (k in _this) {
      kValue = cb.call(_thisArg, _this[i], i, _this);
      if (kValue) ret.push(_this[i]);
    }
    k++;
  }

  return ret;
};
/**
 * reduce
 */
Array.prototype.myReduce = function (cb, initialValue) {
  if (this === null || this === undefined) throw new TypeError();
  if (typeof cb !== 'function') throw new TypeError();

  let _this = Object(this),
    k = 0,
    ret = initialValue,
    len = _this.length || 0;

  if (initialValue === undefined) {
    k = 1;
    ret = _this[0];
  }

  while (k < len) {
    if (k in _this) {
      ret = cb(ret, _this[k], k);
    }
    k++;
  }
  return ret;
};

/**
 * flat
 */
Array.prototype.myFlat = function (depth = 1) {
  if (this === null || this === undefined) throw new TypeError();

  let _this = Object(this),
    len = _this.length,
    ret = [],
    k = 0;

  depth = Math.max(0, depth);

  while (k < len) {
    if (k in _this) {
      if (Array.isArray(_this[k]) && (depth !== 0 || depth === undefined)) {
        if (depth === undefined) {
          ret.push(..._this[k].myFlat());
        } else {
          ret.push(..._this[k].myFlat(depth - 1));
        }
      } else {
        ret.push(_this[k]);
      }
    }
    k++;
  }

  return ret;
};

/****************************************************************/

/**
 * @name 拷贝
 */

/**
 * @description shallowCopy
 */
function shallowCopy(obj) {
  let newObj = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

/**
 * @description deepCopy
 */
const isObject = (obj) => typeof obj === 'object' || typeof obj === 'function';
function deepCopy(obj, hash = new WeakMap()) {
  if (!isObject(obj) || obj === null) {
    return obj;
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  if (['Date', 'RegExp'].includes(obj.constructor.name)) {
    return new obj.constructor(obj);
  }

  if (typeof obj === 'function') {
    return obj.bind(this);
  }

  let newObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, newObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key], hash);
    }
  }

  return newObj;
}

/****************************************************************/
/**
 * @name 发布订阅模式
 */
class EventEmit {
  constructor() {
    this.listeners = {};
  }

  on(name, listener) {
    if (this.listeners[name]) {
      let index = this.listeners[name].indexOf(listener);
      if (index !== -1) return false;
      this.listeners[name].push(listener);
    } else {
      this.listeners[name] = [listener];
    }
    return true;
  }

  off(name, listener) {
    if (this.listeners[name]) {
      let index = this.listeners[name].indexOf(listener);
      if (index !== -1) {
        this.listeners[name].splice(index, 1);
        if (this.listeners[name].length === 0) {
          delete this.listeners[name];
        }
        return true;
      }
    }

    return false;
  }

  once(name, listener) {
    const wrapperFn = (...args) => {
      let ret = listener(...args);
      this.off(name, wrapperFn);
      return ret;
    };
    this.on(name, wrapperFn);
  }

  emit(name, ...args) {
    if (name && this.listeners[name]) {
      const listerens = this.listeners[name].splice();

      listerens.forEach((fn) => fn(...args));
    }
  }

  clear() {
    this.listeners = {};
  }
}
/****************************************************************/

/**
 * @name 解析 URL 参数为对象
 */
function parseUrlParams(url = location.href, name) {
  const regexp = name === undefined ? /([^&#?=]+)=([^&#?=]*)/g : new RegExp(`^|&(${name})=([^&#?=]*)`, 'gi');
  let result = {};
  url.replace(regexp, (match, $1, $2) => {
    let key = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    result[key] = val;
    return match;
  });

  return result;
}

/**
 * @name 解析 URL 参数为对象
 */
function parseUrlParams1(url = location.href, name) {
  let search = window.location.search.substring(1);
  const params = search.split('&');
  let result = {};

  params.forEach((item) => {
    let [key, name] = item.split('=');
    result[decodeURIComponent(key)] = decodeURIComponent(name);
  });

  return result;
}

/**
 * @name 千分位
 */

function parseMoney(num) {
  const regexp = /(\d)(?=(\d{3})+(?!\d))/g;

  return num.replace(regexp, '$1,');
}

/**
 * @name 金额格式化
 */
function parseMoney01(num) {
  num = num + '';
  let [integer, digest = ''] = num.split('.');

  let ret = '';
  while (integer.length > 3) {
    let str = integer.slice(integer.length - 3, integer.length);
    ret = ',' + str + ret;
    integer = integer.slice(0, integer.length - 3);
    console.log(integer);
  }

  return integer + ret + '.' + digest;
}

/****************************************************************/
// 字符串模板
function render(template, data) {
  const regexp = /\{\{(\w+)\}\}/;

  if (regexp.test(template)) {
    const name = regexp.exec(template)[1];
    template = template.replace(regexp, data[name]);
    return render(template, data);
  }

  return template;
}
function render01(template, data) {
  const regexp = /\{\{(\w+)\}\}/g;

  return template.replace(regexp, (_, $1) => data[$1]);
}

/****************************************************************/

/**
 *
 * @param {HTMLElement} element
 */
function getScrollElement(element) {
  let ret = [];

  while (element && element !== document) {
    const overflowY = window.getComputedStyle(element).getPropertyValue('overflow-y');
    if (/(auto)|(overlay)/.test(overflowY)) {
      ret.push(element);
    }

    element = element.parentNode;
  }

  return ret;
}

function createLazyLoad(container) {
  const imgList = [...container.querySelectorAll('img')];
  const len = imgList.length;
  let count = 0;

  function lazyLoad(e) {
    let pendingFilter = [];

    imgList.forEach((img, i) => {
      const { top } = img.getBoundingClientRect();

      if (top < window.innerHeight) {
        img.src = img.dataset.src;
        pendingFilter.push(i);
        count++;
      }
    });
    imgList.filter((_, i) => !pendingFilter.includes(i));
    if (count === len) {
      container.removeEventListener('scroll', lazyLoad);
    }
  }

  container.addEventListener('scroll', lazyLoad);
}

function intersectionLazyLoad(container) {
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((item) => {
        if (item.isIntersecting && item.target.tagName.toLowerCase() === 'img' && !item.target.src) {
          item.target.src = item.target.dataset.src;
          intersectionObserver.unobserve(item.target);
        }
      });
    },
    { root: container }
  );

  const imgList = [...container.querySelectorAll('img')];
  imgList.forEach((img) => intersectionObserver.observe(img));
}

/****************************************************************/

function debounce(fn, wait, option) {
  let lastArgs, lastThis, lastCallTime, lastInvokeTime, timerId, result;

  let leading = false,
    trailing = true,
    maxing = false,
    maxWait;

  wait = wait ?? 0;

  if (option) {
    leading = option.leading || leading;
    trailing = option.trailing || trailing;
    maxing = !!option.maxWait;
    maxWait = maxing ? Math.max(wait, maxWait) : maxWait;
  }

  function debounced(...args) {
    let time = Date.now();

    const invoking = shouldInvoke(time);
    lastCallTime = time;
    lastArgs = args;
    lastThis = this;

    if (invoking) {
      if (!timerId) {
        return leadingEdge(lastCallTimeSince);
      }

      if (maxing) {
        timerId = startTimer(timeExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timeExpired, wait);
    }

    return result;
  }

  function shouldInvoke(time) {
    let lastCallTimeSince = time - lastCallTime;
    let lastInvokeTimeSince = time - lastInvokeTime;

    return lastCallTime === undefined || lastCallTimeSince >= wait || (maxing && lastInvokeTimeSince >= maxWait);
  }

  function invokeFunc(time) {
    lastInvokeTime = time;
    let thisArg = lastThis,
      args = lastArgs;
    result = fn.apply(thisArg, args);

    lastThis = lastArgs = undefined;

    return result;
  }

  function leadingEdge(time) {
    timerId = startTimer(timeExpired, wait);
    lastInvokeTime = time;

    if (leading) {
      return invokeFunc(time);
    }

    return result;
  }

  function trailingEdge(time) {
    if (trailing && lastArgs) {
      invokeFunc(time);
    }
    timerId = undefined;
    return result;
  }

  function timeExpired() {
    let time = Date.now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    timerId = startTimer(timeExpired, remainWait(time));
    return;
  }

  function remainWait(time) {
    let lastCallSinceTime = time - lastCallTime;
    let lastInvokeSinceInvoke = time - lastInvokeTime;

    if (maxing) {
      return Math.min(wait - lastCallSinceTime, maxWait - lastInvokeSinceInvoke);
    }

    return wait - lastCallSinceTime;
  }

  function startTimer(pendingFunc, wait) {
    return setTimeout(pendingFunc, wait);
  }

  function cancelTimer(timerId) {
    clearTimeout(timerId);
    timerId = undefined;
  }

  return debounced;
}

function throttle(fn, wait) {
  return debounce(fn, wait, { leading: true, trailing: true, maxWait: wait });
}

/****************************************************************/

function curry(fn, holder = '_') {
  let length = fn.length;
  return _curry.call(fn, length, holder);
}

function _curry(fn, len, holder, args = [], holders = []) {
  return function (...params) {
    let _args = args.slice();
    let _holders = holders.slice();

    params.forEach((param) => {
      if (param !== holder) {
        if (holders.length) {
          // 上一轮有占位符
          let index = holders.shift();
          // 上一轮的占位符在本轮中再次被占位
          holders.splice(holders.indexOf(index), 1);
          _args[index] = param;
        } else {
          _args.push(param);
        }
      } else {
        if (holders.length) {
          holders.shift();
        } else {
          _args.push(param);
          _holders.push(_args.length - 1);
        }
      }
    });

    if (_args.length >= len && _args.slice(0, len).every((item) => item !== holder)) {
      return fn.call(this, ...args);
    } else {
      return _curry(fn, len, holder, _args, _holders);
    }
  };
}

function partialFunc(fn, ...args) {
  return function (...args2) {
    let index = 0;
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '_' && index < args2.length) {
        args[i] = args2[index];
        index++;
      }
    }
    while (index < args2.length) args.push(args2[index++]);

    return fn.apply(this, args);
  };
}

/****************************************************************/

function co(gen) {
  let iterator = gen();
  let ret = iterator.next();

  return new Promise((resolve, reject) => {
    function next(ret) {
      if (ret.done) {
        resolve(ret.value);
      }
      Promise.resolve(ret.value)
        .then((res) => {
          let ret = iterator.next(res);
          next(ret);
        })
        .catch((error) => {
          reject(error);
        });
    }

    next(ret);
  });
}

/****************************************************************/

function jsonp(url, callbackName) {
  if (url.indexOf('?') !== -1) {
    url += `&callback=${callbackName}`;
  } else {
    url += `?callback=${callbackName}`;
  }

  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);

    window[callbackName] = function (data) {
      resolve(data);
      document.body.removeChild(script);
    };
  });
}

// application/type urlencode form-data json xml
function ajax({ url, method, data, header }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    if (header) {
      Object.keys(header).forEach((key) => {
        xhr.setRequestHeader(key, header[key]);
      });
    }
    xhr.body = data;
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== '4') return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send();
  });
}

/****************************************************************/

Function.prototype.myCall = function () {
  let context = arguments[0],
    fn = this,
    args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }

  let key = Symbol ? Symbol('mycall') : '_mycall';

  context[key] = fn;
  const result = eval('context[key](' + args.toString() + ')');
  delete context[key];
  return result;
};

Function.prototype.myBind = function (context, ...args) {
  let fn = this;

  function fBound(...args2) {
    return fn.apply(context, [...args, ...args2]);
  }

  if (fn.prototype) {
    fBound.prototype = Object.create(fn.prototype);
  }

  return fBound;
};

function objectFactory(fn, ...args) {
  let obj = {};
  Object.setPrototypeOf(obj, fn.prototype);

  let ret = fn.call(obj, ...args);

  return ret && typeof ret === 'object' ? ret : obj;
}

function objectCreate(proto, properties) {
  function Foo() {}
  Foo.prototype = proto;
  let f1 = new Foo();
  Object.defineProperties(f1, properties);

  if (proto === null) {
    f1.__proto__ = null;
  }

  return f1;
}

function objInstanceof(left, right) {
  let proto = left.__proto__;

  while (proto) {
    if (proto === right.prototype) return true;
    proto = proto.__proto__;
  }

  return false;
}

/****************************************************************/
function jsonStringify(data) {
  let dataType = typeof data;

  if (dataType !== 'object') {
    let result = data;

    if (dataType === 'function' || dataType === 'undefined' || dataType === 'symbol') {
      return undefined;
    } else if (isNaN(result) || result === Infinity) {
      return 'null';
    } else {
      return String(result);
    }
  } else {
    if (data === null) {
      return 'null';
    } else if (Array.isArray(data)) {
      let ret = [];

      data.forEach((item, i) => {
        ret[i] = jsonStringify(item);
      });

      result = '[' + result + ']';
      return result.replace(/'/g, '"');
    } else {
    }
  }
}

function jsonParse(str) {
  return new Function('return' + str)();
}

/****************************************************************/
