#include <iostream>

using namespace std;
int firstoccurance(int arr[], int n, int k){
    int s=0;
    int e = n-1;
    int ans = -100;
    while(s<=e){
        int mid = (s+e)/2;
        if(arr[mid]==k){
            ans = mid;
            e = mid-1;
        }
        else if(arr[mid]>k){
            e = mid -1;
        }
        else
          s = mid +1;

    }
    return ans;
}
int lastoccurance(int arr[], int n, int k){
    int s=0;
    int e = n-1;
    int ans = -100;
    while(s<=e){
        int mid = (s+e)/2;
        if(arr[mid]==k){
            ans = mid;
            s = mid+1;
        }
        else if(arr[mid]>k){
            e = mid -1;
        }
        else
          s = mid +1;

    }
    return ans;
}
int main() {
   int arr[] = {1, 3, 5, 5, 5, 5, 67, 123, 125};
    int n = sizeof(arr)/sizeof(arr[0]);
    int k =5;
    cout<<firstoccurance(arr,n,k)<<endl;
    cout<<lastoccurance(arr,n,k)<<endl;
   return 0;
}