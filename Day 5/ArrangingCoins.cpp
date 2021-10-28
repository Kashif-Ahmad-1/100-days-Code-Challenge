/*

441. Arranging Coins
Easy

1213

846

Add to List

Share
You have n coins and you want to build a staircase with these coins. The staircase consists of k rows where the ith row has exactly i coins. The last row of the staircase may be incomplete.

Given the integer n, return the number of complete rows of the staircase you will build.

 

Example 1:


Input: n = 5
Output: 2
Explanation: Because the 3rd row is incomplete, we return 2.

links     https://leetcode.com/problems/arranging-coins/
*/

// code solution

/*
class Solution {
public:
    int arrangeCoins(int n) {
        // brute force approach
        if(n<=0) return 0;
        int count =1;
        while(n>0){
            n = n-count;
            if(n-count<=0) break;
            else count++;
        }
        return count;
        
        
        /* Binary search approach
         long long start = 0, end = n;
        long long mid = 0, total = 0;
        while (start <= end) {
            mid = start + (end - start) / 2;
            total = mid * (mid + 1) / 2;
            if (total == n)
                return static_cast<int>(mid);
            if (n < total)
                end = mid - 1;
            else
                start = mid + 1;
        }
        return static_cast<int>(end);
        
    }
};

*/