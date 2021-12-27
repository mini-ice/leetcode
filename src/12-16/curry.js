function curry(fn, holder = '_') {
  function _curry(fn, holder, len, args, holders) {
    console.log(this);
    return function (...curArgs) {
      console.log(this);

      let _args = args.slice(),
        _holders = holders.slice();
      for (let i = 0; i < curArgs.length; i++) {
        let arg = curArgs[i];
        if (arg !== holder) {
          if (holders.length) {
            let index = holders.shift();
            _holders.splice(_holders.indexOf(index), 1);
            _args[index] = arg;
          } else {
            _args.push(arg);
          }
        } else {
          if (holders.length) {
            holders.shift();
          } else {
            _args.push(arg);
            _holders.push(_args.length - 1);
          }
        }
      }
      // console.log(_args, _holders);
      if (
        (len === 0 && _holders.length === 0) ||
        (len > 0 && _args.length >= len && _holders.every((key) => key >= len))
      ) {
        return fn.apply(this, _args);
      }
      return _curry.call(this, fn, holder, len, _args, _holders);
    };
  }

  return _curry(fn, holder, fn.length, [], []);
}

function foo(a, b, c, d, e) {
  console.log(a, b, c, d, e);
}

let fn = curry(foo);
let obj = { a: 1, fn };

// fn(1, 2, 3, 4, 5);
// fn('_', 2, 3, 4, 5)(1);
// fn(1, '_', 3, 4, 5)(2);
obj.fn(1, '_', 3)('_', 4)(2)(5);
// fn(1, '_', '_', 4)('_', 3)(2)(5);
// fn('_', 2)('_', '_', 4)(1)(3)(5);
