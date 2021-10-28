#include <iostream>
#include <bits/stdc++.h>

using namespace std;
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> ans;
        int n = nums.size();
        for(int i=0;i<n;i++){
            if(nums[i]==nums[i+1])
                ans.push_back(nums[i+1]);
            
        }
        return ans;
    }
};
int main() {
   
   return 0;
}