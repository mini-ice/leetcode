function flatten(depth = Infinity) {
  return this.reduce((result, curVal) => {
    let isArray = Array.isArray(curVal);
    if (!isArray || depth === 0) return [...result, curVal];
    else if (depth === 1) return [...result, curVal];
    else return [...result, ...curVal.flatten(depth - 1)];
  }, []);
}

Array.prototype.flatten = flatten;

const arr1 = [0, 1, 2, [3, [4, [5]]]];
console.log(arr1.flatten());
// expected output: [0, 1, 2, 3, 4, 5]

const arr2 = [0, 1, 2, [4, [3, 4]]];
console.log(arr2.flatten(2));
// expected output: [0, 1, 2, 4,[3, 4]]

// expected output: [0, 1, 2, [3, [4, [5]]]]
const arr3 = [0, 1, 2, [3, [4, [5]]]];
console.log(arr1.flatten(0));

function* flattenByGenerator(depth) {}
