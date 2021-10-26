#include <iostream>

using namespace std;
void printlargest(int arr[], int n){
    int i;
    if(n<3){
        cout<<"invalid input"<<endl;
        return;
    }
    int first, second, third;
    third = second = first = INT_MIN;
    for(i=0;i<n;i++){
        if(arr[i]>first)
        third = second;
        second = first;
        first = arr[i];
    }
    if(arr[i]>second){
        third = second;
        second = arr[i];
        }
    if(arr[i]>third){
        third = arr[i];
        
        }
    cout<<first<<" "<<second<<" "<<third<<endl;
}
int main(){
 int arr[] = {10, 4, 3, 50, 23, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
   printlargest(arr,n);
}