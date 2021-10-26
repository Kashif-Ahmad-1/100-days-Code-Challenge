#include <iostream>

using namespace std;
bool findindex(int arr[], int n, int x, int k){
    int i;
    for(i=0;i<n;i+k){
        for(int j=0;j<k;j++){
            if(arr[i]+arr[j]==x){
                return true;
                break; 
            }
            if(j==k) return false;
        }
       
    }

}
int main() {
    int arr[] = {3,5,2,4,9,3,17,3,11,12,3};
    int x=3, k=3;
    int n = sizeof(arr)/sizeof(arr[0]);
    
   // Subarray(arr, n);
   return 0;
}