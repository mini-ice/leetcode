var maxArea = function(height) {
  // let result = 0
  // if(height.length === 0)return result
  // else if(height.length === 1)return height[0]
  // for (let i = 0; i < height.length - 1; i++) {
  //   for (let j = i+1; j < height.length; j++) {
  //     result = Math.max((j - i) * Math.min(height[i],height[j]),result)
  //   }
  // }
  // return result
  let result = 0
  let i = 0
  let j = height.length - 1
  while(i<j){
    let area = (j - i) * Math.min(height[i],height[j])
    if(height[i] < height[j]){
      i++
    }else{
      j--
    }
    result = Math.max(result,area)
  }
  return result
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]))

/* y=Math.min(y2,y1)  (x2 - x1) * y 
*                     (8 - 1) * 7
*                     (6 - 1) * 8
*/