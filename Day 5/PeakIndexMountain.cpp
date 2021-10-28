/*
852. Peak Index in a Mountain Array
Easy

1522

1488

Add to List

Share
Let's call an array arr a mountain if the following properties hold:

arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... arr[i-1] < arr[i]
arr[i] > arr[i+1] > ... > arr[arr.length - 1]
Given an integer array arr that is guaranteed to be a mountain, return any i such that arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1].

 

Example 1:

Input: arr = [0,1,0]
Output: 1
Example 2:

Input: arr = [0,2,1,0]
Output: 1

Links      https://leetcode.com/problems/peak-index-in-a-mountain-array/

code funcion

*/


/*
class Solution {
public:
    int peakIndexInMountainArray(vector<int>& arr) {
        // binary search approach
        int n = arr.size();
        int low =0;
        int high = n-1;
        while(low<=high){
            int mid = low+(high-low)/2;
            if(arr[mid]<arr[mid+1]) low = mid +1;
            else high = mid -1;
        }
        return low;
        
        // brute force approach

        
        // int left =0;
        // while(arr[left]<arr[left+1]) left++;
        // return left;
        
    }
};

*/