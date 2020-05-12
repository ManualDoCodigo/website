
#Count all bits in the variable. We use a mask to walk to all bits.
#Complexity O(n) for time, where is the number of bits in the variable.
def count_bits_v1(data):
    result = 0
    mask = 0x1
    steps = 0

    #check all bits
    for i in range(32):
        if data & mask:
            result += 1
        
        mask <<= 1 #advance to the next bit
        steps += 1

    return (result, steps)

#Count all bits in the variable but stop when the variable is 0.
#The mask is fixed at 0x1 and we shift the data to the right in each iteration.
#Complexity O(n) for time, where is the number of bits in the variable.
#We could stop earlier, but in the worst case we need to check all bits.
def count_bits_v2(data):
    result = 0
    mask = 0x1
    steps = 0

    while data:
        if data & mask:
            result += 1
        
        data >>= 1 #move the data, not the mask
        steps += 1

    return (result,steps)

#Count only the bits "1", using the [x&(x-1)] binary operation.
#Complexity O(m) for time, where is the number of bits "1" in the variable.
#Faster than the previous methods.
def count_bits_final(data):
    result = 0
    steps = 0

    while data:
        result += 1

        data &= data-1 #this is the main part
        steps += 1
    
    return (result, steps)

#In this version we receive a byte array.
#Count only the bits "1", using the [x&(x-1)] binary operation.
#Complexity O(m) for time, where is the number of bits "1" in the array.
def count_bits_array(data_array):
    result = 0
    steps = 0

    for data in data_array:
        while data:
            result += 1

            data &= data-1
            steps += 1
    
    return (result, steps)

#Using the "count_bits_v2" method above with a byte array, to compare
#to the "count_bits_array" version.
def count_bits_array_v2(data_array):
    result = 0
    mask = 0x1
    steps = 0

    for data in data_array:
        while data:
            if data & mask:
                result += 1
            
            data >>= 1
            steps += 1
    
    return (result, steps)

#0001 1010 0111 0010 0110 1111 1100 1001 => 17 bits 1
x = 0x1a726fc9

print(f"{count_bits_v1(x)}")
print(f"{count_bits_v2(x)}")
print(f"{count_bits_final(x)}")

#Change the "p5.js" to any file in your filesystem.
f = open("p5.js", "rb")
binary = f.read()

print(f"{count_bits_array(binary)}")
print(f"{count_bits_array_v2(binary)}")