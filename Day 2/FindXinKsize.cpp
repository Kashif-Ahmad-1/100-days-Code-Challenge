#include <iostream>

using namespace std;
bool findxinkindowSize(int a[], int n, int k,int x){
    int i;
    for (i = 0; i < n; i = i + k) {
 
        // Search x in segment starting
        // from index i.
        int j;
        for (j = 0; j < k; j++)
            if (arr[i + j] == x)
                break;
 
        // If loop didn't break
        if (j == k)
           return false;
    }
 
    // If n is a multiple of k
    if (i == n)
       return true;
 
    // Check in last segment if n
    // is not multiple of k.
    int j;
    for (j=i-k; j<n; j++)
      if (arr[j] == x)
          break;
    if (j == n)
       return false; 
      
    return true;
}
int main() {
   int arr[] = { 3, 5, 2, 4, 9, 3, 1, 7, 3, 11, 12, 3 };
    int x = 3, k = 3;
    int n = sizeof(arr) / sizeof(arr[0]);
    if (findxinkindowSize(arr, n, k, x))
        cout << "Yes" << endl;
    else
        cout << "No" << endl;
   return 0;
}