'use strict';

Function.prototype.myCall = function myCall(context) {
  const _this = context || window || globalThis;

  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  _this.fn = this;
  console.log(_this);

  _this.fn(...args);

  delete _this.fn;
};

function demo(a) {
  console.log(a);
  this && console.log(this.value);
}

let obj = {
  label: 'a',
  value: 'b',
};

demo.myCall(obj, 'mycall');
