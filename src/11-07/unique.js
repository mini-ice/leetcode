/** ##数组去重 - node@14.18 ***/

// Set 去重 < sort + for < for + Set < for + Map < for of + Map < for + indexOf < filter + indexOf

const origin = Array.from(new Array(10000), (x, index) => {
  return index;
});

// 包含数据尽量均匀分布
const target = Array.from(new Array(5000), (x, index) => {
  return index + index;
});

const arr = [...origin, ...target];

/**
 * filter + indexOf
 */
function fun1(arr = []) {
  return arr.filter((cur, i) => {
    return arr.indexOf(cur) === i;
  });
}

console.time('filter + indexOf');
console.log(fun1(arr).length);
console.timeEnd('filter + indexOf');

/**
 * Set 去重
 */
function fun2(arr) {
  return [...new Set(arr)];
}

console.time('Set 去重');
console.log(fun2(arr).length);
console.timeEnd('Set 去重');

/**
 * for..of + hash
 */
function fun3(arr) {
  let hash = new Map(),
    result = [];

  for (const val of arr) {
    if (hash.has(val)) continue;
    hash.set(val, 1);
    result.push(val);
  }

  return result;
}

console.time('for..of + hash');
console.log(fun3(arr).length);
console.timeEnd('for..of + hash');

/**
 * for + Map
 */
function fun4(arr) {
  let hash = new Map(),
    result = [],
    len = arr.length;

  for (let i = 0; i < len; i++) {
    if (hash.has(arr[i])) continue;
    hash.set(arr[i], 1);
    result.push(arr[i]);
  }

  return result;
}

console.time('for + Map');
console.log(fun4(arr).length);
console.timeEnd('for + Map');

/**
 * for + set
 */
function fun7(arr) {
  const result = [];
  const set = new Set();
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!set.has(arr[i])) {
      result.push(arr[i]);
      set.add(arr[i]);
    }
  }
  return result;
}

console.time('for + Set');
console.log(fun7(arr).length);
console.timeEnd('for + Set');

/**
 * for + indexOf
 */
function fun5(arr = []) {
  let result = [],
    len = arr.length;

  for (let i = 0; i < len; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }

  return result;
}

console.time('for + indexOf');
console.log(fun5(arr).length);
console.timeEnd('for + indexOf');

/**
 * sort + for
 */
function fun6(arr = []) {
  let len = arr.length,
    result = [];
  arr.sort((a, b) => a - b);

  for (let i = 0; i < len; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) continue;
    result.push(arr[i]);
  }

  return result;
}

console.time('sort + for');
console.log(fun6(arr).length);
console.timeEnd('sort + for');
