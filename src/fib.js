/**
 *
 */
function fib(n) {
  let sum = 0,
    prev = 0,
    curv = 1;
  if (n === 0) return prev;
  if (n === 1) return curv;
  for (let i = 2; i < n + 1; i++) {
    sum = prev + curv;
    [prev, curv] = [curv, sum];
  }
  return sum;
}
fib(10);
