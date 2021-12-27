var convert = function(s, numRows) {
  let interval = numRows * 2 - 2
  let map = new Map()
  // if(numRows < 3) return s
  for (let i = 0; i < s.length; i++) {
    let rowIndex = interval === 0 ?  0:i%interval
    if(rowIndex > numRows - 1){
      rowIndex = interval - rowIndex
    }
    map.has(rowIndex) ? map.set(rowIndex,map.get(rowIndex)+s[i]) :map.set(rowIndex,s[i])
  }
  console.log(map)
  const arr = new Array(numRows).fill('').reduce((prev,item,index) => map.get(index) ?prev + map.get(index):prev,'')
  console.log(arr)
  return arr
}

convert("a",1)

// 3 3 5
// 4 5 7
// 5 7 9
// 6 9 11

// LEETCODEISHIRING
// L     D     R
// E   O E   I I
// E C   I H   N
// T     S     G

// 0     6      12
// 1   5 7   11 13
// 2 4   8 10   14
// 3     9      15

// 0   4   8
// 1 3 5 7 9
// 2   6   10