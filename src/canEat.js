/**
 * @param {number[]} candiesCount
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var canEat = function (candiesCount, queries) {
  const n = candiesCount.length,
    m = queries.length;
  const sum = new Array(n + 1).fill(0),
    result = new Array(m).fill(true);

  for (let i = 1; i <= n; i++) {
    sum[i] = sum[i - 1] + candiesCount[i - 1];
  }

  for (let i = 0; i < m; i++) {
    const [favoriteType, favoriteDay, limit] = queries[i];
    const canEatMax = (favoriteDay + 1) * limit,
      canEatMin = favoriteDay + 1;
    const canEatFavoriteTypeMax = sum[favoriteType + 1],
      canEatFavoriteTypeMin = sum[favoriteType] + 1;

    if (canEatFavoriteTypeMax < canEatMin || canEatFavoriteTypeMin > canEatMax) {
      result[i] = false;
    }
  }

  console.log(sum);

  return result;
};

console.log(
  canEat(
    [5, 2, 6, 4, 1],
    [
      [3, 1, 2],
      [4, 10, 3],
      [3, 10, 100],
      [4, 100, 30],
      [1, 3, 1],
    ]
  )
);
