var findMedianSortedArrays = function(nums1, nums2) {
  // const arr = [...nums1, ...nums2].sort((a,b) => a - b)
  // if(arr.length % 2 === 1){
  //   return arr[(arr.length + 1)/2 - 1]
  // }else{
  //   return (arr[arr.length / 2] + arr[arr.length / 2 - 1])/2
  // }

  let result = 0
  let half = Math.ceil((nums1.length + nums2.length)/2)
  let even = (nums1.length + nums2.length) % 2 === 0
  let i = 0
  while(i !== half){
    let length1 = Math.ceil(nums1.length / 2)
    let length2 = Math.ceil(nums2.length / 2)
    if(nums1[length1 - 1] >= nums2[length2 - 1]){
      i = i+length2
      if(i === half){
        result = nums2[length2 - 1]
        if(even){
          let a = nums2[length2] && nums2[length2] <= nums1[length1 - 1] ? nums2[length2] : nums1[length1 - 1] 
          result = (a + result)/2
        }
      }
      nums2 = nums2.splice(length2 ,nums2.length)
    }else{
      i = i+length1
      if(i === half){
        result = nums1[length1 - 1]
        if(even){
          let b = nums1[length1] && nums1[length1] <= nums2[length2 - 1] ? nums1[length1] : nums2[length2 - 1] 
          result = (b + result)/2
        }
      }
      nums1 = nums1.splice(length1,nums1.length)
    }
  }
  return result
}
console.log(findMedianSortedArrays([1, 3],[2]))
console.log(findMedianSortedArrays([1, 2],[3, 4]))
console.log(findMedianSortedArrays([1,2,3,4],[1, 3,7,8]))
console.log(findMedianSortedArrays([8,9] ,[3,4,5,6,7]))

// half : 4
//[8,9]       =>  [8,9] => [8,9] => [8,9]
//[3,4,5,6,7] =>  [6,7] =>  [7] => []
//                  3        1