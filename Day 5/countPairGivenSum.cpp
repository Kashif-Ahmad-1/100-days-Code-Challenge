#include <iostream>

using namespace std;
int occurance(int arr[], int n, int k){
    int count =0;
    for(int i =0;i<n;i++){
        for(int j =i+1;j<n;j++){
            if(arr[i]+arr[j]==k)
            count++;
        }
    }
return count;
}

int main() {
   int arr[] = {10, 12, 10, 15, -1, 7, 6, 5, 4, 2, 1, 1, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
   cout<<occurance(arr,n,11);
  
   return 0;
}