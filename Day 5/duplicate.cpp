#include <iostream>
#include <bits/stdc++.h>
using namespace std;
int duplicate(int arr[], int n){
    vector<int> ans;
for(int i=0;i<n;i++){
    for(int j =i+1;j<n;j++){
        if(arr[i]==arr[j])
            return arr[i];
    }
}
return -1;
}
int main() {
   int arr[] = {1,2,3,4,2,3};
    int n = sizeof(arr) / sizeof(arr[0]);
   cout<<duplicate(arr,n);
   return 0;
}