---
layout: page
title: "Algoritmos para calcular número de Fibonacci."
date: 2020-05-21
type: video
description: Crie uma função que receba um número 'n' inteiro maior que zero e retorne o enésimo número de Fibonacci.
entry_number: 29
youtube_video_id: AmxuidRTqUc
repository: 0029-algoritmos-para-calcular-fibonacci
has_code: true
has_p5: false
tags: [Algoritmos,Questões de Entrevista,Python, Fibonacci]
playlists: [Questões de Entrevista]
permalink: /algoritmos-fibonacci/
---

### Enunciado

Crie uma função que receba um número 'n' inteiro maior que zero e retorne o enésimo número de Fibonacci.

### Algoritmo recursivo

{% capture _code %}{% highlight python linenos=table %}
#O(2^n) - O(n)
def fib_rec(n):
    if n == 1:
        return 0
    elif n == 2:
        return 1
    else:
        return fib_rec(n-1) + fib_rec(n-2)
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

### Algoritmo com Memoization

{% capture _code %}{% highlight python linenos=table %}
#O(n) time - O(n)
def fib_mem(n, mem = {1:0, 2:1}):
    if n in mem:
        return mem[n]
    
    mem[n] = fib_mem(n-1,mem) + fib_mem(n-2,mem)
    return mem[n]
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

### Algoritmo Iterativo

{% capture _code %}{% highlight python linenos=table %}
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
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

### Algoritmo com fórmula fechada - Fórmula de Binet

{% capture _code %}{% highlight python linenos=table %}
#O(1) time - O(1) space
def fib_binet(n):
    n = n-1

    fib = math.floor((1/math.sqrt(5))* ( math.pow((1+math.sqrt(5))/2 ,n) - math.pow((1-math.sqrt(5))/2 ,n)))
    return fib
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}