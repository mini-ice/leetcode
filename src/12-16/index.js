const { ss, obj } = require('./lib');
const lib = require('./lib');
console.log('ss', ss);
console.log('obj', obj);
obj.x = 1;
console.log('lib', lib);
setTimeout(()=>{
    console.log('ss', ss);
    console.log('obj', obj);
    console.log('lib', lib);
},3000);

