Function.prototype.myCall = function myCall(context) {
  context = context || globalThis || Window;
  const _this = this;
  const args = [];

  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  const symbolKey = Symbol ? Symbol('fn') : 'mycall-fn';
  context[symbolKey] = _this;
  const result = eval('context[symbolKey](' + args.toString() + ')');
  delete context[symbolKey];
  return result;
};

Function.prototype.myApply = function (context, args) {
  context = context || globalThis || Window;
  const _this = this;
  const params = [];

  if (!Array.isArray(args)) args = [];

  for (let i = 0, len = args.length; i < len; i++) {
    params.push('args[' + i + ']');
  }

  const symbolKey = Symbol ? Symbol('fn') : 'myapply-fn';
  context[symbolKey] = _this;
  const result = eval('context[symbolKey](' + params.toString() + ')');
  delete context[symbolKey];
  return result;
};

Function.prototype.myBind = function myBind() {
  const _this = this;
  const context = [].slice.call(arguments, 0, 1)[0];
  const args = [].slice.call(arguments, 1);
  const fprototype = function() {};
  const fbound = function () {
    return _this.apply(context, [].concat.call(args, [].slice.call(arguments)));
  };

  if(_this.prototype) {
    fprototype.prototype = _this.prototype;
  }

  fbound.prototype = new fprototype();
  return fbound;
};

let obj = { a: 1 };

function foo(...args) {
  console.log(this, ...args);
  return 'foo result';
}

// console.log(foo.call(obj, 'call'));
// console.log(foo.call(null, 'call'));
// console.log(foo.myCall(obj, 'mycall'));
// console.log(foo.myCall(null));
// console.log(foo.myApply(obj, ['mycall']));
// console.log(foo.myApply(null));
// foo.bind(obj, 'Hello')('world');
// foo.myBind(obj, 'Hello')('world');

function myNew() {
  const context = [].shift.call(arguments);
  if (typeof context !== 'function') return;

  const obj = Object.create(context.prototype);

  const result = context.apply(obj, arguments);

  return typeof result === 'object' ? result : obj;
}

function Foo(x) {
  this.x = x;
}

Foo.prototype.getX = function () {
  return this.x;
};

let f1 = myNew(Foo, 1);
let f2 = new Foo(2);

console.log(f1.x);
console.log(f1.__proto__ === Foo.prototype);
console.log(f1.getX());
console.log(f1.constructor);
console.log(f2.x);
console.log(f2.__proto__ === Foo.prototype);
console.log(f2.getX());
console.log(f2.constructor);
