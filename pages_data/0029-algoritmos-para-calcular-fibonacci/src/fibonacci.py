import math

#[0,1,1,2,3,5,8,13,21,34,...]

#fib(n) = fib(n-1) + fib(n-2)

#O(2^n) - O(n)
def fib_rec(n):
    if n == 1:
        return 0
    elif n == 2:
        return 1
    else:
        return fib_rec(n-1) + fib_rec(n-2)

#O(n) time - O(n)
def fib_mem(n, mem = {1:0, 2:1}):
    if n in mem:
        return mem[n]
    
    mem[n] = fib_mem(n-1,mem) + fib_mem(n-2,mem)
    return mem[n]

#O(n) time - O(1) space
def fib_iter(n):
    n1=1
    n2=0
    counter=3

    while counter<=n:
        fib_curr = n1 + n2
        n2=n1
        n1=fib_curr

        counter += 1

    return fib_curr

#O(1) time - O(1) space
def fib_binet(n):
    n = n-1

    fib = math.floor((1/math.sqrt(5))* ( math.pow((1+math.sqrt(5))/2 ,n) - math.pow((1-math.sqrt(5))/2 ,n)))
    return fib

#print(fib_rec(35))
print(fib_mem(73))
print(fib_iter(73))
print(fib_binet(73))