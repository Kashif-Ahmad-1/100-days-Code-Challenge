// very very very very impoetant topic
// brute firce approach
// kadanes algorithm
#include <iostream>

using namespace std;
void SumSumbarray(int arr[], int n)
{
    int i, k, j;
    int crtsum = 0;
    int maxsum = 0;
    int left = -1;
    int right = -1;
    for (i = 0; i < n; i++)
    {
        crtsum = 0;
        for (j = i; j < n; j++)
        {
            for (k = i; k <= j; k++)
            {
                crtsum += arr[k];
            }
        }
    }
    if (maxsum < crtsum)
    {
        maxsum = crtsum;
        left = i;
        right = j;
    }
    cout<<"maximum sum is "<<maxsum;
    for(int l =left;l<=right;l++){
        cout<<arr[l]<<" , "<<endl;
    }
}
int main()
{
    int arr[] = {1, 4, 20, 3, 10, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    //SumSumbarray(arr, n);


    // KAdanes algorithm approach

    int cs =0;
    int ms =0;
    for(int i=0;i<=n;i++){
        cs = cs+arr[i];
        if(cs<0){
            cs =0;
        }
        ms = max(cs,ms);
    }
    cout<<"maximum sum is "<<ms<<endl;
    return 0;
}