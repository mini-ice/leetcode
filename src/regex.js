let regex01 = /hello/;

console.log(regex01.test('hello world'));

let regex02 = /ab{3,}c/g;
var string = 'ac abc abbbbbc abbc abbbbbbc';

console.log(string.match(regex02));

let regex03 = /a[1-9]b/g;
var string = 'a0b a1b a2b a3b a4b';

console.log(string.match(regex03));

let regex04 = /a[^1-9]b/g;
var string = 'a0b a1b a2b a3b a4b';

console.log(string.match(regex04));

let regex05 = /a\dc/g;
// let regex06 = /a[^\d]c/g;
let regex06 = /a\Dc/g;
var string = 'abc a0c a1c a2c a3c a4c';

console.log(string.match(regex05), string.match(regex06));

let regex07 = /\d{2,}?/g;
var string = '0123d4 56cccx78 890102';

console.log(string.match(regex07));

// part01

/** 匹配16进制颜色值 要求匹配： #ffbbad #Fc01DF #FFF #ffE */

var part_one_regex = /#([a-fA-F]{3}|[0-9a-fA-F]{6})/g;
var part_one_string = '#ffbbad #Fc01DF #FFF #ffE #fffc';
console.log(part_one_string.match(part_one_regex));

/** 匹配时间 要求匹配： 23:59 02:07  */
var part_one_regex = /(2[0-3]|[0-1][0-9]):([0-5]\d)/g;
var part_one_string = '23:59 02:07 31:22 23:60';

console.log(part_one_string.match(part_one_regex));

var part_one_regex = /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])$/;
var part_one_string = '23:59 02:07 2:7 31:22 23:60';
part_one_string.split(/\s/g).forEach((str) => console.log(str, part_one_regex.test(str)));

/** 匹配日期 要求匹配： 2017-06-10  */
var part_one_regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
console.log(part_one_regex.test('2017-06-01'));

/** 匹配 window操作系统文件路径 要求匹配： F:\study\javascript\regex\regular expression.pdf F:\study\javascript\regex\ F:\study\javascript F:\  */
var part_one_regex = /[a-zA-Z]{1}:\\([^\\:*<>|"?\n\r/]+\\)*([^\\:*<>|"?\n\r]+)?$/;
console.log(part_one_regex.test('F:\\study\\javascript\\regex\\regular expression.pdf'));
console.log(part_one_regex.test('F:\\study\\javascript\\regex\\'));
console.log(part_one_regex.test('F:\\study\\javascript'));
console.log(part_one_regex.test('F:\\'));

/** 匹配id 要求从 <div id="container" class="main"></div> 提取出id="container" */
var part_one_regex = /id="[^"]*"/g;
var part_one_string = '<div id="container" id="container01" class="main"></div>';
console.log(part_one_string.match(part_one_regex));
