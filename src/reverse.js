var reverse = function(x) {
  let arr = Array.from(x + '')
  const isMinus = arr[0] === '-'
  if(isMinus) arr.splice(0,1)
  let length = arr.length
  let result = arr.reverse().reduce((prev,number,index) => {
    return prev + ((+number) * Math.pow(10,(length - 1 - index)))
  },0)
  // arr = arr[arr.length - 1] === 0 ? 
  result = isMinus? -result : result
  return (result>Math.pow(2,31) - 1 || (isMinus && result < Math.pow(-2,31))) ? 0 : result
}

// console.log(reverse(-1230))
// console.log(reverse(23759))
// console.log(reverse(0))
// console.log(reverse(1534236469))
console.log(reverse(-123))
