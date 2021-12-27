var isPalindrome = function(x) {
  if(x < 0)return false
  let init = x
  let result = 0
  let l = 0
  while(x >= 1){
    l++
    result = result * 10 + x % 10
    x = parseInt(x / 10)
  }
  return result === init
}

isPalindrome(121)
isPalindrome(12124)
isPalindrome(3)