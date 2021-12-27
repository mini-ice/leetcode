/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function (board) {
  const n = board.length;
  const result = n * n;

  let nums = [-1];
  let reverseFlag = false;
  for (let i = n - 1; i >= 0; i--) {
    nums = [...nums, ...(reverseFlag ? board[i].reverse() : board[i])];
    reverseFlag = !reverseFlag;
  }

  console.log(nums, nums.length);

  const bfs = () => {
    let quene = [1];
    let dp = new Map();
    dp.set(1, 0);

    while (quene.length) {
      let x = quene.shift();
      const step = dp.get(x);

      for (let i = 1; i <= 6; i++) {
        let newX = nums[x + i] === -1 ? x + i : nums[x + i];
        if (dp.has(newX)) continue;
        else if (newX === result) {
          console.log(dp);
          return step + 1;
        } else if (newX < result) {
          quene.push(newX);
          dp.set(newX, step + 1);
        }
      }
    }

    return -1;
  };

  return bfs();
};

console.log(
  snakesAndLadders([
    [-1, -1],
    [-1, 3],
  ])
);
