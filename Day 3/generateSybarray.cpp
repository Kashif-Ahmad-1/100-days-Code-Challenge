// this is the brute force algorithm
#include <iostream>
# include <vector>
using namespace std;
void Subarray(int arr[], int n)
{
    int i, j, k;
    for (i = 0; i < n; i++)
    {
        for (j = i; j < n; j++)
        {
            for(k=i;k<=j;k++){
                cout<<arr[k]<<" , ";
            }
            cout<<endl;
        }
    }
}
void printSubArrays(vector<int> arr1, int start, int end)
{     
    // Stop if we have reached the end of the array    
    if (end == arr1.size())
        return;
       
    // Increment the end point and start from 0
    else if (start > end)
        printSubArrays(arr1, 0, end + 1);
           
    // Print the subarray and increment the starting point
    else
    {
        cout << "[";
        for (int i = start; i < end; i++){
            cout << arr1[i] << ", ";
        }
         
        cout << arr1[end] << "]" << endl;
        printSubArrays(arr1, start + 1, end);
    }
     
    return;
}

int main()
{    
    vector<int> arr1 = {1, 2, 3};
    int arr[] = {1, 2, 3, 4};
    int n = sizeof(arr)/sizeof(arr[0]);
    cout << "All Non-empty Subarrays\n";
    Subarray(arr, n);
    cout<<endl;
    printSubArrays(arr1, 0, 0);
    return 0;
}