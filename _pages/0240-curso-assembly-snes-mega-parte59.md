---
layout: page
title: "Um Modo pouco usado em PROGRAMAÇÃO de MEGA DRIVE."
date: 2022/10/04
type: video
description: Neste episódio vamos aprender sobre o modo de endereçamento absoluto CURTO da cpu 68000 do Mega Drive. 
entry_number: 240
youtube_video_id: RIgBiaYWLuQ
repository: "0240-curso-assembly-snes-mega-parte59"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte59/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste episódio vamos continuar com os modos de endereçamento e falar sobre o modo *Absolute Short* (Absoluto Curto). Esse modo é pouco usado em comparação com outros mas tem características bem legais.

## Modo Absolute Short no 68000

O modo *absolute short* (absoluto curto) é igual ao modo *absolute long*, porém utilizamos um endereço de *16 bits* pra indicar o endereço onde a cpu vai realizar a operação ao invés de um endereço de 32 bits usado no *absolute long*. Com isso a instrução fica apenas com uma *extension word*, e não duas como no modo *absolute long*, o que poupa espaço. O detalhe mais significativo é que a cpu faz *extensão de sinal* para que o endereço fique com 32 bits no final. A imagem abaixo mostra isso:

<img src="/pages_data/{{page.repository}}/absolute5.jpg" style="opacity:0.8; width:60%;"/>

Porém para o Bass entender que é o *absolute short* é necessário colocar o sufixo *.w* no final do endereço. Veja o exemplo abaixo:

{% capture _code %}{% highlight asm linenos=table %}
move.l $1234.w,$ff0000
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Na instrução acima o primeiro parâmetro tem o modo *absolute short* e o segundo parâmetro tem o modo *absolute long*. A cpu vai copiar 32 bits (pois é .l) que estão localizados no endereço *$001234* para o endereço *$ff0000*.

No código acima não confunda o tamanho da instrução com o tamanho do dado no parâmetro. A instrução é *.l* e copia 32 bits, mas o dado no primeiro parâmetro é de .w pra indicar que o modo é *absolute short*. Já expliquei no primeiro vídeo de modos de endereçamento para não confundir as duas coisas. O tamanho da instrução é uma coisa, o tamanho nos parâmetros é outra.

##### Implicações da extensão de sinal

O fato de a cpu 68000 fazer *extensão de sinal* no absolute short traz alguns detalhes importantes, como podemos ver na imagem abaixo:

<img src="/pages_data/{{page.repository}}/absolute6.jpg" style="opacity:0.8; width:60%;"/>

Como ocorre extensão de sinal, todos os endereços no intervalo de $0000 a $7fff vão ser convertidos para $00000000 a $00007fff. Já os endereços no intervalo de $8000 a $ffff vão ser convertidos para $ffff8000 a $ffffffff.

Isso faz com que o modo *absolute short* trabalhe nos extremos mapa de memória, ou seja, no primeiros 32KB e nos últimos 32KB, conforme vemos na imagem abaixo:

<img src="/pages_data/{{page.repository}}/absolute7.jpg" style="opacity:0.8; width:60%;"/>

Portanto se formos utilizar um endereço nos primeiros 32KB ou nos últimos 32KB, podemos usar o modo *absolute short*. Isso poupa 2 bytes na instrução, e poupa um acesso à memória comparado com o modo *absolute long*.

Como já vimos no episódio sobre o mapa de memória do Mega Drive, os primeiros 32KB da memória estão mapeados no início do *cartucho*, e os últimos 32KB são os últimos 32KB da *memória Ram* do sistema. Portanto se for usar esses endereços, dá pra usar o modo *absolute short*.

<div class="info">
<img src="/assets/img/icons/kidchameleon1.png">
<div style='display: block'>
<h4>Por que fazer extensão de sinal?</h4>
<p>Fazer extensão de sinal foi uma decisão de design do engenheiros que fizeram o 68000. A cpu podia não fazer extensão de sinal e neste caso o range utilizado seria apenas os primeiros 64KB de memória. Mas fazendo extensão de sinal e dividindo em dois ranges de 32 permite maior flexibilidade para acessar diferentes tipos de memória, como o cartucho e Ram no caso do Mega Drive.</p>
</div>
</div>

## Número de Extension Words

O número de *extension words* é o número de palavras (16 bits) que vem depois do opcode da instrução.
No caso do modo absolute long, cada parâmetro tem duas *extension words*, pois no absolute long o endereço é 32 bits. Então se os dois parâmetros forem absolute long, teremos duas extension words para cada parâmetro, dando um total de 80 bits na instrução (16+32+32).

Já com o absolute short precisamos de apenas uma extension word para cada parâmetro, pois o endereço é de 16 bits. Então se os dois parâmetros forem absolute short, teremos uma extension word para cada parâmetro, dando um total de 48 bits na instrução (16+16+16).

A imagem abaixo mostra isso:

<img src="/pages_data/{{page.repository}}/absolute8.jpg" style="opacity:0.8; width:60%;"/>

Na imagem mostramos as extensions words para um parâmetro apenas. Caso a instrução tenha mais um parâmetro que precise de extension words, elas vão vir depois da primeira extension word, ou antes, dependendo da ordem dos parâmetros.

##### O Bass não otimiza

Um detalhe importante é que o Bass não otimiza o uso do absolute short. Ele sempre vai usar o absolute long, mesmo que o endereço seja de 16 bits ou possa ser codificado como absolute short. Ele só vai usar o absolute short se você colocar o sufixo *.w* no final do endereço.

Por exemplo, veja o código abaixo:

{% capture _code %}{% highlight asm linenos=table %}
move.l #1,$ff8000
move.l #1,$8000.w
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Na linha 1 o Bass até poderia usar o absolute short, mas ele não tem inteligência pra isso, pois o Bass é um assembler de tabela, ou seja, ele apenas faz o match da linha com a tabela de instruções. Ele não faz análise de código, então ele não sabe que o endereço $ff8000 poderia ser codificado como absolute short.

A imagem abaixo mostra o que aparece no debugger Exodus para as duas instruções acima:

<img src="/pages_data/{{page.repository}}/exodus.jpg" style="opacity:0.8; width:100%;"/>

Vemos que para a primeira instrução ele gerou como absolute long, onde na última coluna, que representa o código binário gerado, temos 2 bytes de opcode, 4 bytes do imediato 0x00000001 (pois a instrução foi .l) e 4 bytes do endereço $ff8000.

Já para a segunda instrução ele gerou como absolute short, onde temos 2 bytes de opcode, 4 bytes do imediato 0x00000001 e 2 bytes do endereço $8000.

## Código de exemplo

Este é o código de exemplo que rodei no vídeo do episódio:

{% capture _code %}{% highlight asm linenos=table %}
    //Absolute Long and Absolute Short
    move.l $8000,$8000.w

    //Both Absolute Short
    move.l $1000.w,$c000.w

    //Bass doesn't optimize.
    move.l #1,$ff8000
    move.l #1,$8000.w

gameover:
    -; bra -

seek($1000)
    dd $9abcdef0

seek($8000)
    dd $aabbccdd
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}
