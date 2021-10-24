#include <iostream>
#include <algorithm>
using namespace std;
int kthsmallest(int arr[], int n, int k){
sort(arr,arr+n);
return arr[k-1];
}
int main() {
   int a[] = {7,10,4,3,20,15};
   int k =3;
    int n = sizeof(a) / sizeof(a[0]);
   cout<< kthsmallest(a,n,k);
   return 0;
}