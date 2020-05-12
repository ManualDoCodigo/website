#Reversing List In-Place

# Source: [1,2,3,4,5,6,7,8,9]
# Result: [9,8,7,6,5,4,3,2,1]

#Not In-Place version. We create a new list and add the
#elements in reverse order.
def reverse_not_inplace(lst):
    new_list = []

    for i in range(len(lst)):
        new_list.insert(0,lst[i])
    
    return new_list

#In-Place version. We change the elements going from the 
#sides to the middle.
def reverse_in_place(lst):
    left = 0
    right = len(lst) - 1
    temp = None

    while left<right:
        #swap the left and right positions, using a temp variable
        temp = lst[left]
        lst[left] = lst[right]
        lst[right] = temp

        #Adjusting the indexes to the next values
        left += 1
        right -= 1

# The list we'll use to test
lst = [1,2,3,4,5,6,7,8,9]

#Testing the "reverse_not_inplace" function
print(reverse_not_inplace(lst))


#Testing the reverse_in_place. 
print(f"Before: {lst}")
reverse_in_place(lst)
print(f"After: {lst}")


#Bonus 1 - Using the inner Python version
lst2 = [1,2,3,4,5,6,7,8,9]
print(f"Lst2 Before: {lst2}")
lst2.reverse()
print(f"Lst2 After: {lst2}")


#Bonus 2 - Anothe way of creating a inversed list. 
#This is NOT In-Place.
lst3 = [1,2,3,4,5,6,7,8,9,10]
print(lst3[::-1])