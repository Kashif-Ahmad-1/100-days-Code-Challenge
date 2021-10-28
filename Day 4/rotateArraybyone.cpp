#include <iostream>

using namespace std;
void rotate(int arr[], int n){
    int x = arr[n-1];
    int i;
    for(i=n-1;i>0;i--){
        arr[i]=arr[i-1];
        
    }
    arr[0] = x;
}
void rotatebyk(int arr[], int n, int k){
    for(int i=0;i<k;i++)
    rotate(arr,n);
}
int main() {
   int arr[] = {5,0,0,5,5,4,5,3};
    int n = sizeof(arr) / sizeof(arr[0]);
    int k =3;
  rotatebyk(arr,n,k);
  for(int i=0;i<n;i++){
      cout<<arr[i]<<",";
  }
   return 0;
}