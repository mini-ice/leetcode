let ss = 'ss1';
let obj = {}

// let time = Date.now();

// while (Date.now() - time < 1000) {}

module.exports.ss = ss;
module.exports.obj = obj;

setTimeout(() => {
  obj.a = 1;
  module.exports.ss = 'ss2';
  console.log('module.exports', module.exports);
}, 2000);
