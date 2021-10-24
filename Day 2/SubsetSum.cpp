#include <iostream>

using namespace std;
int SubsetsSum(int arr[], int n, int i, int x){
    if(i==n){
        if(x==0) return 1;

        return 0;
    }

    int include = SubsetsSum(arr, n,i+1,x-arr[i]);   // it include the a[i] element 
    int exclude = SubsetsSum(arr,n,i+1,x);
    return include + exclude;
}
int main() {
   int set[] = { 3, 34, 4, 12, 5, 2 };
    int sum = 9;
    int n = sizeof(set) / sizeof(set[0]);
    cout<<SubsetsSum(set,n,0,sum);
   return 0;
}