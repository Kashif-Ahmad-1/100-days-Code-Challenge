#include <iostream>

using namespace std;
void reverseArray(int a[], int n){
    int s =0;
    int e = n-1;
    for(int i=s;i<e;i++){
        swap(a[s],a[e]);
        s++;
        e--;
    }
}
int main() {
   int a[] = {-2, -3, 4, -1, -2, 1, 5, -3};
    int n = sizeof(a) / sizeof(a[0]);
    reverseArray(a,n);
    for(int i=0;i<n;i++){
        cout<<a[i]<<",";
    }
   return 0;
}