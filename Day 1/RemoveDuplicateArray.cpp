#include <iostream>

using namespace std;

int removeDuplicates(int nums[], int n) {
        
        int i =0 ,j=1;
        for(j=1;j<n;j++){
            if(nums[i]!=nums[j])
                i++;
            
            nums[i] = nums[j];
            
        }
        return i+1;
    }

int main() {
   int arr[] = {1, 2, 2, 3, 4, 4, 4, 5, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
 
    // removeDuplicates() returns new size of
    // array.
    removeDuplicates(arr, n);
 
    // Print updated array
    for (int i=0; i<n; i++)
       cout << arr[i] << " ";
 
    return 0;
}