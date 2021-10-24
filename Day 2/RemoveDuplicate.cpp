/*
 Remove Duplicates from Sorted List
Easy

3277

159

Add to List

Share
Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

 

Example 1:


Input: head = [1,1,2]
Output: [1,2]
Example 2:


Input: head = [1,1,2,3,3]
Output: [1,2,3]
 

Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.

loinks   https://leetcode.com/problems/remove-duplicates-from-sorted-list/
*/



#include <iostream>

using namespace std;

int main() {
   
   return 0;
}

/*
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        // First Aprroach
        // ListNode* cur_node = head;
        // while (cur_node !=NULL && cur_node->next !=NULL) {
        //     ListNode* next_node = cur_node->next;
        //     if (cur_node->val == next_node->val)
        //         cur_node->next = next_node->next;
        //     else
        //         cur_node = next_node;
        // }
        // return head;
        
        // Second approach
        
         
        ListNode* temp = head;
        while(temp!=NULL && temp->next!=NULL){
            if(temp->val==temp->next->val)
                temp->next = temp->next->next;
            else
                temp = temp->next;
                
        }
       
        return head;
    }
};
*/
