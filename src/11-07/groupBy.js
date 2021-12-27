function groupBy(fn) {
  const groups = {};
  this.forEach((item) => {
    let originalKey = fn(item),
      key = originalKey,
      typeKey = typeof originalKey;
    if (typeKey === 'object' || typeKey === 'function') {
      key = JSON.stringify(key);
    }
    groups[key] = groups[key] || [];
    groups[key].push(item);
  });

  return groups;
}

Array.prototype.groupBy = groupBy;

let links = [
  { source: 'test1', target: 'test1', value: 10 },
  { source: 'test2', target: 'test2', value: 30 },
  { source: 'test1', target: 'test3', value: 40 },
  { source: 'test1', target: 'test4', value: 20 },
  { source: 'test2', target: 'test4', value: 20 },
  { source: 'test1', target: 'test4', value: 20 },
  { source: 'test1', target: 'test4', value: 20 },
];

const result = links.groupBy((link) => link.source);
console.log(result.test2);
