/**
 * 2021/12/27
 * {@link https://leetcode-cn.com/problems/friends-of-appropriate-ages}
 * 
 * 在社交媒体网站上有 n 个用户。给你一个整数数组 ages ，其中 ages[i] 是第 i 个用户的年龄。

如果下述任意一个条件为真，那么用户 x 将不会向用户 y（x != y）发送好友请求：

age[y] <= 0.5 * age[x] + 7
age[y] > age[x]
age[y] > 100 && age[x] < 100
否则，x 将会向 y 发送一条好友请求。

注意，如果 x 向 y 发送一条好友请求，y 不必也向 x 发送一条好友请求。另外，用户不会向自己发送好友请求。

返回在该社交媒体网站上产生的好友请求总数。

示例 1：

输入：ages = [16,16]
输出：2
解释：2 人互发好友请求。
示例 2：

输入：ages = [16,17,18]
输出：2
解释：产生的好友请求为 17 -> 16 ，18 -> 17 。
示例 3：

输入：ages = [20,30,100,110,120]
输出：3
解释：产生的好友请求为 110 -> 100 ，120 -> 110 ，120 -> 100 。

 */
function numFriendRequests(ages) {
  // 蛮力法 时间复杂度 O(n^2)
  // let count = 0,
  //   len = ages.length;

  // for (let i = len - 1; i >= 0; i--) {
  //   let l = i - 1,
  //     r = i + 1;
  //   while (l >= 0) {
  //     if (!forbitSendRequest(ages[i], ages[l])) count++;
  //     l--;
  //   }
  //   while (r < len) {
  //     if (!forbitSendRequest(ages[i], ages[r])) count++;
  //     r++;
  //   }
  // }

  // return count;

  // 排序 + 双指针 O(nlogn)
  ages.sort((a, b) => a - b);

  let len = ages.length,
    count = 0,
    l = 0,
    r = 0;
  for (let i = 0; i < len; i++) {
    while (l < i && forbitSendRequest(ages[l], ages[i])) l++;
    if (r < i) r = i;
    while (r < len && !forbitSendRequest(ages[r], ages[i])) r++;
    if (r > l) count += r - l - 1;
  }
  return count;
}
function forbitSendRequest(a, b) {
  return a > b || a <= 0.5 * b + 7 || (a > 100 && b < 100);
}

numFriendRequests();
