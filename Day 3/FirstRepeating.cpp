#include <iostream>

using namespace std;
int duplicate(int arr[], int n)
{
    int i, j;
    for (i = 0; i < n; i++)
    {
        for (j = i + 1; j < n; j++)
        {
            if (arr[i] == arr[j])
                return arr[i];
        }
        
    }
    return -1;
}

int main()
{
    int arr[] = {10, 5, 3, 4, 3, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout << duplicate(arr, n);
    return 0;
}