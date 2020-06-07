---
layout: page
title: "Algoritmos para calcular Paridade."
date: 2020-05-18
type: video
description: A paridade de um dado é relacionado com a quantidade de bits "1" do dado. Temos que descobrir se a quantidade é par ou ímpar.
entry_number: 26
youtube_video_id: JpP5pwDR7P0
repository: 0026-algoritmos-paridade
has_code: true
has_p5: false
tags: [Algoritmos,Questões de Entrevista,Python, Paridade]
playlists: [Questões de Entrevista]
permalink: /algoritmos-paridade/
---

### Enunciado

A paridade de um dado é relacionado com a quantidade de bits "1" do dado. Temos que descobrir se a quantidade é par ou ímpar.
Crie um função que retorne 0 se a paridade for par, e retorne 1 se a paridade for ímpar.

### Algoritmo O(n)

{% capture _code %}{% highlight python linenos=table %}
#O(n) time, O(1) space
def parity(x):
    parity = 0

    while x:
        x &= x-1
        parity = parity^1

    return parity 
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Neste algoritmos usamos a operação binária ***x &= x-1*** que zera o bit "1" (se houver) mais a direita da variável.  
Com essa operação vamos apagando os bits "1" até a variável ficar com valor 0, pois nesse momento já eliminamos todos os bits "1".  
E cada vez que eliminarmos um bit "1" nós invertemos o resultado de 0 pra 1 ou de 1 pra 0.  
Com isso no final teremos a variáve "result" com 0 se tivermos um número par de bits e 1 se for o contrário.  
A complexidade é proporcional à quantidade de bits "1" na variável. No pior caso é ***n***, que é o número de bits do dado/variável sendo processado.

### Algoritmo O(Logn)

{% capture _code %}{% highlight python linenos=table %}
#O(logn), O(1) space
def parity(x):
    x ^= x >> 32
    x ^= x >> 16
    x ^= x >> 8
    x ^= x >> 4
    x ^= x >> 2
    x ^= x >> 1

    return x & 0x1
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Neste algoritmo dividimos os bits da variável em dois conjunto e aplicamos um *xor*. O *xor* "cancela" os bits iguais. A partir daí pegamos o resultado do *xor*, que tem metade do tamanho original, e repetimos o processo, até ficarmos com 1 bit.  
Como dividimos em dois a cada passo, a complexidade é *O(logn).  

*TODO: Citar a questão que encontra um elemento diferente em um vetor de pares.*