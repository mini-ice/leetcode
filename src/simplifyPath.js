/**
 * 2022/1/6
 * {@link https://leetcode-cn.com/problems/simplify-path/}
 * 71. 简化路径
 *
 */
function simplifyPath(path) {
  const urls = path.split('/'),
    stack = [];
  for (let i = 0; i < urls.length; i++) {
    let name = urls[i];
    if (name === '..') {
      if (stack.length) stack.pop();
    } else if (name.length && name !== '.') {
      stack.push(name);
    }
  }

  return '/' + stack.join('/');
}
simplifyPath('/home/'); // /home
simplifyPath('/../'); // /
simplifyPath('/home//foo/'); // /home/foo
simplifyPath('/home/./b/../../c/'); // /c
