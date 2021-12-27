Function.prototype.myCall = function (context) {
  context = context || globalThis || Window;

  let fn = this,
    args = [],
    key = Symbol ? Symbol('context') : 'mycallContext';

  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }

  context[key] = fn;

  let result = eval('context[key](' + args.toString() + ')');

  delete context[key];

  return result;
};

Function.prototype.myApply = function (context, args) {
  context = context || Window || globalThis;

  let fn = this,
    result,
    newArgs = [],
    key = Symbol ? Symbol('context') : 'mycallContext';

  context[key] = fn;

  if (Array.isArray(args)) {
    for (let i = 0; i < args.length; i++) {
      newArgs.push('args[' + i + ']');
    }
    result = eval('context[key](' + newArgs.toString() + ')');
  } else {
    result = context[key]();
  }

  delete context[key];

  return result;
};

Function.prototype.myBind = function (context) {
  context = context || Window || globalThis;
  const _this = this;

  const args = Array.prototype.slice.call(arguments, 1);

  function mybind() {
    return _this.apply(context, args.concat([].slice.call(arguments)));
  }

  mybind.prototype = Object.create(_this.prototype);

  return mybind;
};

let obj = { a: 1 };

function foo(a, b, c) {
  return [this.a, a, b, c];
}

console.log(foo.myCall(obj, { x: 1 }, 2, 3));
console.log(foo.myApply(obj, [{ x: 1 }, 2, 3]));

function Foo() {}

let X = Foo.bind(obj);
let K = Foo.myBind(obj);

let f1 = new X();
let f2 = new K();
console.log(f1 instanceof Foo);
console.log(f1 instanceof X);
console.log(f2 instanceof Foo);
console.log(f2 instanceof K);

/**
 * New
 */
function objectFactory() {
  let obj = new Object();
  let constructor = [].shift.call(arguments);
  let result = constructor.apply(obj, [].slice.call(arguments));

  return typeof ret === 'object' ? result || obj : obj;
}

function myInstanceof(left, right) {
  let proto = left.getPrototypeOf();

  while (proto) {
    if (proto === right.prototype) return true;
    proto = proto.getPrototypeOf();
  }

  return false;
}

Object.myCreate = function (proto, propertyObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null.');
  }
  if (propertyObject == null) {
    new TypeError('Cannot convert undefined or null to object');
  }

  function Foo() {}
  Foo.prototype = proto;
  let obj = new Foo();

  if (propertyObject === null) {
    obj.__proto__ = null;
  }

  if (propertyObject !== undefined) {
    Object.defineProperty(obj, propertyObject);
  }

  return obj;
};

Object.myAssign = function (target, ...source) {
  if (target === null || target === undefined) {
    throw new TypeError('cannot convert null or undefined to object');
  }

  let result = Object(target);

  source.forEach(function (obj) {
    if (obj !== null) {
      for (let key in obj) {
        if (obj.hasOwnproperty(key)) {
          result[key] = obj[key];
        }
      }
    }
  });

  return result;
};

/**
 *
 */
function jsonStringify(data) {
  let dataType = typeof data;

  if (dataType !== 'object') {
    if (isNaN(data) || data === Infinity) {
      return 'null';
    } else if (dataType === 'function' || dataType === 'undefined' || dataType === 'symbol') {
      return undefined;
    } else if (dataType === 'string') {
      return '"' + data + '"';
    } else {
      return String(data);
    }
  } else {
    if (data === null) {
      return 'null';
    } else if (data.toJson && typeof data.toJson === 'function') {
      return jsonStringify(data.toJson());
    } else if (data instanceof Array) {
      let result = [];

      data.forEach((item, index) => {
        let itemType = typeof item;
        if (itemType === 'undefined' || itemType === 'function' || itemType === 'symbol') {
          result[index] = 'null';
        } else {
          result[index] = jsonStringify(item);
        }
      });
    } else if (data instanceof Date || data instanceof RegExp) {
      return data.toString();
    } else {
      let result = [];
      Object.keys(data).forEach(function (key, index) {
        if (typeof data[key] !== Symbol && typeof data[key] !== 'function' && data[key] !== undefined) {
          result.push(jsonStringify(data[key]));
        }
      });
      return '{' + result + '}'.replace(/'/g, '');
    }
  }
}

function jsonParse() {
  return new Function('return ' + json)();
}
