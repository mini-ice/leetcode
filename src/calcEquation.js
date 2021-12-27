/**
 示例 1：

输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
解释：
条件：a / b = 2.0, b / c = 3.0
问题：a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]
示例 2：

输入：equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
输出：[3.75000,0.40000,5.00000,0.20000]
示例 3：

输入：equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
输出：[0.50000,2.00000,-1.00000,-1.00000]

提示：

1 <= equations.length <= 20
equations[i].length == 2
1 <= Ai.length, Bi.length <= 5
values.length == equations.length
0.0 < values[i] <= 20.0
1 <= queries.length <= 20
queries[i].length == 2
1 <= Cj.length, Dj.length <= 5
Ai, Bi, Cj, Dj 由小写英文字母与数字组成

 */
function calcEquation(equations, values, queries) {
  // const dp = new Map();
  // const exitStr = new Map();
  // equations.forEach((val, i) => {
  //   !exitStr.has(val[0]) && exitStr.set(val[0], 1);
  //   !exitStr.has(val[1]) && exitStr.set(val[1], 1);
  //   dp.set(val.join(''), values[i]);
  //   dp.set([...val].reverse().join(''), 1 / values[i]);
  //   if (i < equations.length - 1 && val[1] === equations[i + 1][0]) {
  //     let data = values[i] * values[i + 1];
  //     dp.set(`${val[0]}${equations[i + 1][1]}`, data);
  //     dp.set(`${equations[i + 1][1]}${val[0]}`, 1 / data);
  //   }
  // });
  // console.log(exitStr);
  // console.log(
  //   queries.map((item) => {
  //     if (exitStr.get(item[0]) && item[0] === item[1]) return 1;
  //     return dp.get(item.join('')) || -1;
  //   })
  // );
  // return queries.map((item) => {
  //   if (exitStr.get(item[0]) && item[0] === item[1]) return 1;
  //   return dp.get(item.join('')) || -1;
  // });
}
calcEquation(
  [
    ['a', 'b'],
    ['b', 'c'],
  ],
  [2.0, 3.0],
  [
    ['a', 'c'],
    ['b', 'a'],
    ['a', 'e'],
    ['a', 'a'],
    ['x', 'x'],
  ]
);
