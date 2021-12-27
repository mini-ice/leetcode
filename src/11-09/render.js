/**
 * 字符串模板
 */

// function render(template, data) {
//   const regex = /\{\{(\w+)\}\}/;
//   if (regex.test(template)) {
//     const name = regex.exec(template)[1];
//     template = template.replace(regex, data[name]);
//     return render(template, data);
//   }

//   console.log(template);
//   return template;
// }

function render(template, data) {
  const regex = /\{\{(\w+)\}\}/;

  if (regex.test(template)) {
    const name = regex.exec(template)[1];
    template = template.replace(regex, data[name]);
    return render(template, data);
  }

  return template;
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
  name: '布兰',
  age: 12,
};
console.log(render(template, person)); // 我是布兰，年龄12，性别undefined
console.log(render01(template, person)); // 我是布兰，年龄12，性别undefined

function render01(template, data) {
  const regex = /\{\{(\w+)\}\}/g;

  if (regex.test(template)) {
    return template.replace(regex, (match, $1) => {
      const value = data[$1];

      return value;
    });
  }

  return template;
}
