var divisorGame = function (N: number): boolean {
  let i = 0
  if (N === 1) return false
  while (N >= 1) {
    console.log(N)
    if (N === 1) {
      return i % 2 === 1 ? false : true
    }
    i++
    for (let j = N - 1; j > 0; j--) {
      if (N % j === 0) {
        N = N - j
        break
      }
    }
  }
}

console.log(divisorGame)
