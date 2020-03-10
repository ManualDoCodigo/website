---
layout: page
title: "Algoritmo - Número Único em Array de Pares."
date: 2020-03-06
type: video
description: Imagine um array de números onde cada número aparece duas vezes e em posições aleatórias. Apenas um número aparece uma única vez. Crie um algoritmo que encontre esse número único.
entry_number: 10
youtube_video_id: K4J5jziwa4Y
repository: 0010-numero-unico-array-pares
has_code: true
has_p5: false
tags: [Algoritmos,Questões de Entrevista,Python]
permalink: /numero-unico-array-pares/

related_videos:
  - title: "XOR, o interruptor de bits."
    author: "Manual do Código"
    url: "/xor"

reference_links:
  - title: "TimSort"
    url: "https://en.wikipedia.org/wiki/Timsort"
  - title: "In-place algorithm"
    url: "https://en.wikipedia.org/wiki/In-place_algorithm"
  - title: "Python sort"
    author: GeeksforGeeks
    url: "https://www.geeksforgeeks.org/python-list-sort/"
  - title: "Find Unique pair in an array with pairs of numbers"
    author: GeeksforGeeks
    url: "https://www.geeksforgeeks.org/find-unique-pair-array-pairs-numbers/"


---

### Enunciado do Problema

Suponha uma lista de números onde cada número aparece em par, ou seja, cada número aparece duas vezes na lista e em posições aleatórias. Apenas um número na lista aparece apenas uma vez. Crie um algoritmo que encontre esse número único na lista.

### Introdução

Este é um problema de entrevista onde o desafio principal é criar um algoritmo eficiente para a localização do número único do array.
No vídeo foi mostrado 4 algoritmos com complexidades diferentes. O algoritmos mais rápido possui complexidade O(n) e espaço O(1).
As listas usadas no vídeo para testar os algoritmos estão abaixo.

{% capture _code %}{% highlight python linenos %}
numbers = [10,8,3,7,3,9,9,2,7,10,2]
numbers_end = [10,3,7,3,9,9,2,7,10,2,8]
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

### Algoritmo Força Bruta

No algoritmo força bruta temos que verificar cada número, e pra cada número varrer a lista toda para verificar se o número atual está presente em outra posição da lista.  
Note na *linha 5* do código abaixo que devemos pular a posição do número atual sendo processado.  
A complexidade é **O(n^2)** e o espaço é **O(1)**.

{% capture _code %}{% highlight python linenos %}
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
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

### Algoritmo com ordenação

Neste algoritmo nós primeiro ordenamos a lista, desta forma cada par de números fica um do lado do outro. Na sequência varremos a lista da esqueda para a direita para encontrar o elemento único. Pra isso pulamos os índices de 2 em 2 até encontrar uma posição em que o próximo número é diferente do número atual, pois neste caso é o número único.  Note na linha 5 abaixo que também devemos verificar se estamos na última posição do array. Neste caso o último elemento é o número único.
A complexidade é **O(nlogn)**, pois o determinante neste caso é a ordenação, que é O(nlogn). O espaço é O(1) caso o algoritmo de ordenação usado seja in place, caso contrário a complexidade de espaço é a complexidade do algoritmo de ordenação utilizado. No caso do Python o algoritmo é o [TimSort](https://en.wikipedia.org/wiki/Timsort), que tem espaço **O(n)**.

{% capture _code %}{% highlight python linenos %}
def find_with_sort(numbers):
    numbers.sort()

    for i in range(0,len(numbers), 2):
        if i == len(numbers)-1 or numbers[i] != numbers[i+1]:
            return numbers[i]

    return None
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

### Algoritmo com Hashtable

Com uma hashtable conseguimos fazer um algoritmo O(n) pois uma hashtable tem complexidade O(1) mas inserções e remoções.  
Pegamos então cada número da lista e colocamos na hashtable com o valor 1. Se o número já estiver na lista então incrementamos o valor em 1. No final todos os números terão valor 2 na hashtable, uma vez que todos os números aparecerem duas vezes, com excessão do número único que vai estar com o valor 1. Portanto varremos a hashtable e retornamos o número que contém o valor 1 na hashtable, pois ele apareceu apenas uma vez.  
A complexidade é **O(n)**. O espaço é **O(n)** pois precisamos criar a hashtable.

{% capture _code %}{% highlight python linenos %}
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
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

### Algoritmo com XOR

Eu já fiz um vídeo explicando sobre o Xor (veja link nas referência abaixo). O Xor tem uma caracteristica de que se um Xor com uma máscara qualquer for realizado, e posteriormente um novo Xor for feito com a mesma máscara, mesmo se outros Xor's forem feitos no meio, esse segundo Xor desta máscara que já foi utiliza tem o "efeito" de neutralizar o primeiro Xor. Mais detalhes no vídeo citado.  
Portanto, se começarmos com 0x0 e formos fazendo o Xor com cada número da lista, como cada número aparece duas vezes a segunda aparição de um número neutraliza o Xor da primeira aparição, então no final o resultado é o número único.  
A complexidade é O(n) e o espaço O(1).

{% capture _code %}{% highlight python linenos %}
def find_with_xor(numbers):
    number = 0

    for i in numbers:
        number ^= i
    
    return number
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

