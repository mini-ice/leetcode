const isObject = (arg) => typeof arg === 'object' || typeof arg === 'function';
function deepCopy(obj, map = new WeakMap()) {
  // typeof null === object
  // Date || Regex 类型
  // 循环引用问题

  if (!isObject(obj)) return obj;
  if (obj === null) return null;

  if (map.has(obj)) {
    return obj;
  }

  const targetConstructor = obj.constructor;

  if (typeof obj === 'function') {
  }

  if (/(Date|RegExp)/.test(targetConstructor.name)) {
    return new targetConstructor(obj);
  }

  map.set(obj, true);
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key], map);
    }
  }

  return result;
}

function shallowCopy(obj) {
  if (typeof obj !== 'object') return obj;
  let result = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) result[key] = obj[key];
  }

  return result;
}

let a = { name: { demo: '1' }, obj: { regexp: /^a/i, date: new Date() }, fn: function () {} };
let b = deepCopy(a);
console.log(a);
console.log(b);
b.name.demo = '2';
b.obj.regexp = /^b/i;
console.log(b.fn);
console.log(a);
console.log(b);
// console.log(b.fn.prototype.name);
// console.log(b.fn.prototype.name);

let c = { regexp: /^a/i, date: new Date(), func: { func1: function () {} } };
let d = shallowCopy(c);
console.log(c);
console.log(d);
d.func.func2 = '2';
console.log(c);
console.log(d);

const isObject = (obj) => typeof obj === 'object' || typeof obj === 'function';
function deepCopy01(obj, map = new WeakMap()) {
  if (!isObject(obj) || obj === null) return obj;

  if (map.has(obj)) {
    return map.get(obj);
  }

  if (typeof obj === 'function') {
    return function () {
      return obj.apply(this, arguments);
    };
  }

  if (obj.constructor && (obj.constructor.name === 'RegExp' || obj.constructor.name === 'Date')) {
    return new obj.constructor(obj);
  }

  let newObj = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (Object.hasOwnProperty(obj, key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }
  map.set(obj, newObj);

  return newObj;
}

const isObject = (arg) => typeof arg === 'object' || typeof arg === 'function';
function deepCopy(obj, map = new WeakMap()) {
  if (!isObject(obj)) return obj;
  if (obj === null) return null;

  if (map.has(obj)) {
    return map.get(obj);
  }

  const targetConstructor = obj.constructor;

  if (typeof obj === 'function') {
    return obj;
  }

  if (/(Date|RegExp)/.test(targetConstructor.name)) {
    return new targetConstructor(obj);
  }

  let result = Array.isArray(obj) ? [] : {};
  map.set(obj, result);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key], map);
    }
  }

  return result;
}
