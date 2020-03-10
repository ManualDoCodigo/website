
#Force Brute algorithm. For each number check every other number.
#complexity: O(n^2)
#Space: O(1)
def find_brute_force(numbers):
    for i in range(len(numbers)):
        found = False
        for j in range(len(numbers)):
            if i !=j and numbers[i] == numbers[j]:
                found = True
                break
        
        if found == False:
            return numbers[i]
        
    return None

#Algorithm using sort. We sort then walk the array to find the unique number.
#complexity: O(nlogn)
#Space: O(1) (if using an in place sort algorithm)
def find_with_sort(numbers):
    numbers.sort()

    for i in range(0,len(numbers), 2):
        if i == len(numbers)-1 or numbers[i] != numbers[i+1]:
            return numbers[i]

    return None
#Algorithm using hashtable. We put the number in a hashtable where the key is the number and
#the value is the number of ocurrences. Next we all the hashtable to find the unique number.
#complexity: O(n)
#Space: O(n)
def find_with_hash_table(numbers):
    num_dict = {}

    for i in numbers:
        if i in num_dict:
            num_dict[i] += 1
        else:
            num_dict[i] = 1
    
    for number, counter in num_dict.items():
        if counter == 1:
            return number

#Algorithm using XOR. We XOR all numbers. The result is the unique number.
#complexity: O(n)
#Space: O(1)
def find_with_xor(numbers):
    number = 0

    for i in numbers:
        number ^= i
    
    return number

numbers = [10,8,3,7,3,9,9,2,7,10,2]
numbers_end = [10,3,7,3,9,9,2,7,10,2,8]

print(find_with_hash_table(numbers))