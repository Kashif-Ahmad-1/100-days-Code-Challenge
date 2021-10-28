#include <iostream>

using namespace std;
int occurance(int arr[], int n){
    int n1=-1,n2=-1, c1 =0, c2=0;
    for(int i=0;i<n;i++){
        if(arr[i]==n1)
            c1++;
        else if(arr[i]==n2)
            c2++;
            else if(c1==0){
                n1 = arr[i];
                c1 =1;
            }
            else if(c2==0){
                n2 = arr[i];
                c2 =1;
            }
            else{
                c1--;
                c2--;
            }
    }
    c1=0;
    c2=0;
    /*
    for(int i=0;i<n;i++){
        if(arr[i]==n1){
            c1++;
        }else if(arr[i]==n2){
            c2++;
        }
        if(c1>n/3)
            // ans.add(n1);
        if(c2>n/3)
            // ans.add(n1);
        
    }
*/
}
int main() {
   int arr[] = {5,5,0,0,5,5,4,5,3};
    int n = sizeof(arr) / sizeof(arr[0]);
   cout<<occurance(arr,n);
   return 0;
}