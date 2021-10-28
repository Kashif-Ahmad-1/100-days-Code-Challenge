#include <iostream>

using namespace std;
int occurance(int arr[], int n){
    int count =0;
    int i;
    for( i =0;i<n;i++){
        for(int j = i+1;j<n;j++){
            if(arr[i]==arr[j])
            count++;
        }
    }
    if(count>(n/2))
    return arr[i];
}
int main() {
   int arr[] = {5,5,0,0,5,5,4,5,3};
    int n = sizeof(arr) / sizeof(arr[0]);
   cout<<occurance(arr,n);
   return 0;
}