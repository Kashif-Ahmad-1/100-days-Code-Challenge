#include <iostream>

using namespace std;
int twoSum(int a[], int target, int n)
{

    for (int i = 0; i < n - 1; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            if (a[i] + a[j] == target)
            {
                // return {i, j};
            }
        }
    }
    return 0;
}

int main()
{
    int A[] = {0, -1, 2, -3, 1};
    int x = -2;
    int size = sizeof(A) / sizeof(A[0]);
    cout << twoSum(A, x, size);
    return 0;
}