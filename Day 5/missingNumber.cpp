#include <iostream>
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        //sort(nums.begin(),nums.end());
        int sum = 0;
        int total = nums.size()*(nums.size() + 1)/2;
        for (auto number : nums) {
            sum += number;
        }
        return total - sum;
    }
};
int main() {
   int nums[] = {0,1,3};
  
   return 0;
}