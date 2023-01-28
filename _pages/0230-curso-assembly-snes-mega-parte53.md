---
layout: page
title: "Fazendo um Algoritmo Basicão em Assembly de Mega Drive e SNES"
date: 2022/02/10
type: video
description: Neste episódio vamos implementar um algoritmo simples em assembly de Snes. Vamos criar uma lista de números aleatórios e vamos varrer esta lista tentando encontrar um número passado como parâmetro. 
entry_number: 230
youtube_video_id: qUaQ0au_B9U
repository: "0230-curso-assembly-snes-mega-parte53"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte51/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste episódio vamos implementar um algoritmo simples em assembly de Mega Drive. Vamos criar uma lista de números aleatórios e vamos varrer esta lista tentando encontrar um número passado como parâmetro. O código de Snes está disponível no Github do canal.

Primeiramente mostrarei como criar uma lista de números na memória e depois mostrarei várias formas de varrer esta lista tentando encontrar o número desejado. Veremos mais formas de usar a instrução *dbcc* que foi introduzida no episódio passado.

## Como colocar dados arbitrários no arquivo gerado pelo assembler?

Os assemblers, como o Bass que usamos, permitem que criamos o código assembly desejado e geralmente todos os assemblers também tem alguma forma de permitir a criação de dados arbitrários.

Por exemplo, se quisermos colocar os bytes *0x12345678* no endereço *0x8670* da Rom do jogo, podemos facilmente fazer isso com as instruções abaixo:

{% capture _code %}{% highlight python linenos=table %}
seek(0x8670)
dd $12345678
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

A diretriz *dd* acima é uma diretriz do Bass que, durante a geração do binário compilado, adiciona um dado de 32 bits no endereço atual de escrita. Ainda não expliquei o que essa macro *seek* faz, mas isso será explicado em episódios futuros.

Mas explicando de forma superficial, quando o assembler vai gerar o código, ele começa em um certo endereço e vai adicionando o binário das intruções e dados que ele vai interpretando. No caso essa macro *seek* faz o assembler sair do endereço atual de onde os dados estão sendo inseridos no arquivo final e vai para o endereço passado, para passar a inserir os próximos dados "compilados" lá a partir deste novo endereço.

A tabela abaixo mostra as opções de tamanhos de dados que a sintaxe do Bass suporta.

|db|8 bits |
|dw|16 bits|
|dl|24 bits|
|dd|32 bits|
|dq|64 bits|

Se quisermos colocar um byte em algum lugar do jogo, fazemos assim:

{% capture _code %}{% highlight python linenos=table %}
db $12
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Onde *$12* é um valor qualquer que escolhi. Se quisermos adicionar um dado de 16 bits usamos o ***dw***, e assim por diante, seguindo a tabela acima.

Essas diretivas respeitam o *endianess* escolhido para a compilação. Então no Snes por exemplo os bytes ficariam invertidos na memória.

Essas diretivas mostradas acima servem para adicionarmos dados pequenos, de até 64bits, porém também podemos instruir o assembler a adicionar um arquivo binário inteiro em um endereço qualquer. Usaremos muito isso no futuro para adicionar, por exemplo, gráficos em qualquer lugar que desejarmos da Rom. Mas isso ficará para um episódio futuro.

## Como criar uma lista de números?

Para o algoritmo do episódio, criaremos uma lista de ***10*** números aleatórios que colocaremos em algum lugar da Rom que será gerada. 

Para este exemplo colocaremos a lista no endereço *0x1000* da Rom.

O código abaixo faz a criação da lista no endereço 0x1000:

{% capture _code %}{% highlight python linenos=table %}
seek($1000)
db 10, 8, $23, -6, 20, 32, 1, -3, -16, 31
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Pra simplificar os números estão no range *[-128:127]* então cada número é um byte, por isso usamos a diretiva *db*.

Podemos colocar números em formato decimal ou hexadecimal, onde hexadecimal começa com o *$*.

Quando abrirmos a Rom gerada no debugger, conseguimos ver os números localizados no endereço 0x1000.

<img src="/pages_data/{{page.repository}}/for4.jpg" style="opacity:0.8; width:80%;"/>
<img src="/pages_data/{{page.repository}}/for5.jpg" style="opacity:0.8; width:80%;"/>

## Encontrar um número na lista

Vamos começar a criar um algoritmo de busca na lista. Vamos supor que queremos encontrar o número *20* na lista, que em hexa é o número *$14*. 

Um código utilizando instruções mais comuns da cpu está listado abaixo:

{% capture _code %}{% highlight rust linenos=table %}
move.w #0,d0
movea.l #$1000,a0
loop:
    cmp.b #$14,(a0)+
    beq next
    add #1,d0
    cmp #$10,d0
    bge next
    bra loop
next:
//Aqui se o contador for menor que 10 então encontrou
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

