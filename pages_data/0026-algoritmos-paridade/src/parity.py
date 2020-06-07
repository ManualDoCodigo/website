#O(n) time, O(1) space
def parity_v1(x):
    parity = 0

    while x:
        x &= x-1
        parity = parity^1

    return parity 

#O(logn), O(1) space
def parity_v2(x):
    x ^= x >> 32
    x ^= x >> 16
    x ^= x >> 8
    x ^= x >> 4
    x ^= x >> 2
    x ^= x >> 1

    return x & 0x1

#0011 0010 1010 1101
x = 0x32ad

print(parity_v1(x))
print(parity_v2(x))