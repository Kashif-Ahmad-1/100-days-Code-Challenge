// count all pairs with given sum 
#include <iostream>

using namespace std;
int countPairs(int arr[], int n, int sum){
    int count =0;
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            if(arr[i]+arr[j]==sum){
                count++;
            }
        }
    }
    return count;
}
int main() {
   int arr[] = {3,5,2,4,9,3,17,3,11,12,3};
   int n = sizeof(arr)/sizeof(arr[0]);
    int  k=8;
    cout<<countPairs(arr,n,k);

   return 0;
} 