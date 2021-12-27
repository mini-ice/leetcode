/**
 *
 */
function oneEditAway(first, second) {
  if (first.length > second.length + 1 || first.length < second.length - 1) return false;

  if (first.length < second.length) {
    [first, second] = [second, first];
  }

  let action = first.length - second.length;

  let i = 0,
    j = first.length - 1,
    x = 0,
    y = second.length - 1,
    ret = 0;

  while (i <= j && x <= y) {
    if (ret > 1) return false;

    if (first[i] !== second[x]) {
      if (ret === 1) return false;
      i += action;
      if (action !== 0 && first[i] !== second[x]) return false;
      ret++;
    }

    if (first[j] !== second[y] && i !== j) {
      if (ret === 1) return false;

      j -= action;
      if (action !== 0 && first[j] !== second[y]) return false;
      ret++;
    }

    i++;
    x++;
    j--;
    y--;
  }

  return true;
}
console.log(oneEditAway('teacher', 'teachy')); // false
console.log(oneEditAway('a', 'b')); // true
console.log(oneEditAway('pales', 'pal')); // false
console.log(oneEditAway('pale', 'ple')); // true
console.log(oneEditAway('teacher', 'feather')); // false
console.log(oneEditAway('islander', 'slander')); // true
console.log(oneEditAway('teacher', 'teachers')); // true
