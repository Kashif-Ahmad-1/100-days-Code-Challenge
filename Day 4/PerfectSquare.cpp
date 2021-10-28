/*
367. Valid Perfect Square
Easy

1605

205

Add to List

Share
Given a positive integer num, write a function which returns True if num is a perfect square else False.

Follow up: Do not use any built-in library function such as sqrt.

 

Example 1:

Input: num = 16
Output: true
Example 2:

Input: num = 14
Output: false


class Solution {
public:
    bool isPerfectSquare(int num) {
        int a=1;
        
        while(num>0){
            num=num-a;
            a= a+2;
        }
        return(num==0);
        
    }
};

*/