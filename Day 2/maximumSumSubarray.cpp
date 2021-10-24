#include <iostream>
using namespace std;

int maxSubArraySum(int a[], int n)
{
    // kadanes algorithm
    int cs = 0;
    int maxsm = 0;
    for (int i = 0;i < n-1; i++)
    {
        cs = cs + a[i];
        if (cs < 0)
        {
            cs = 0;
        }
        maxsm = max(cs, maxsm);
    }
}
int main()
{

    int a[] = {-2, -3, 4, -1, -2, 1, 5, -3};
    int n = sizeof(a) / sizeof(a[0]);
    int max_sum = maxSubArraySum(a, n);
    cout << "Maximum contiguous sum is " << max_sum;
    return 0;

    
}