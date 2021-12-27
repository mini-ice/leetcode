/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  const ans = [];
  const dp = new Map();
  if (!root) return ans;
  const dfs = (tree, str) => {
    if (!tree.left && !tree.right) {
      // return str + tree.val
      ans.push(str + tree.val);
      return;
    } else {
      if (dp.has(tree)) {
        str = dp.get(tree);
        // tree.left && dfs(tree.left, dp.get(tree))
        // tree.right && dfs(tree.right, dp.get(tree))
      } else {
        str += tree.val + '->';
        dp.set([tree, str]);
      }
      tree.left && dfs(tree.left, str);
      tree.right && dfs(tree.right, str);
    }
  };
  dfs(root, '');
  return ans;
};

// 1. 假设我输入的 str 为 A 则过滤后返回的结果为
// [
// {name: 'A'},
// {name: 'B', children: [
// {name: 'A'}
// ]}
// ]

// 2. 假设我输入的 str 为 AA 则过滤后返回的结果为
// [
// {name: 'B', children: [
// {name: 'AA', children: [...]}
// ]}
// ]

// 3. 假设我输入的 str 为 B 则过滤后返回的结果为
// [
// {name: 'B', children: [
// {name: 'A'},
// {name: 'AA', children: [...]}
// ]}
// ]
const tree = [{ name: 'A' }, { name: 'B', children: [{ name: 'A' }, { name: 'AA', children: [] }] }, { name: 'C' }];

function matchPathTree(tree, str) {
  const ret = [];

  // A
  // {name:A} dfs(B.children, str, parent<shallow B>) -> dfs(B.children.children, str, B.children)
  function filter(tree, str) {
    if (!Array.isArray(tree)) return [];

    let ret = [];

    for (let i = 0; i < tree.length; i++) {
      const { name, children } = tree[i];

      if (name === str) {
        ret.push(tree[i]);
      } else {
        const newChildren = filter(children, str);
        if (newChildren.length) {
          ret.push({ name, children: newChildren });
        }
      }
    }

    return ret;
  }

  return filter(tree, str);
}

console.dir(matchPathTree(tree, 'A'));
console.dir(matchPathTree(tree, 'AA'));
