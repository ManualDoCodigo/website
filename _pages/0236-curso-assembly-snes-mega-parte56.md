---
layout: page
title: "O modo ABSOLUTO do Mega Drive."
date: 2022/10/04
type: video
description: Neste episódio vamos aprender sobre o modo de endereçamento absoluto da cpu 68000 do Mega Drive. 
entry_number: 236
youtube_video_id: 9t7X_qtfGD0
repository: "0236-curso-assembly-snes-mega-parte56"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte56/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste episódio vamos continuar com os modos de endereçamento e falar sobre o modo *Absoluto*. Esse modo existem tanto na cpu do Mega quando na do Snes, e é um dos mais usados.

Vou começar falando do modo Absoluto no Mega Drive e depois falaremos no Snes nos próximos epidódios.

<div class="info">
<img src="/assets/img/icons/sonic3.gif">
<div style='display: block'>
<h4>Modo Absoluto</h4>
<p>No Mega Drive o modo Absoluto é dividido em dois tipos, o modo <em>Absoluto Short</em> e o modo <em>Absoluto Long</em>. Já no Snes temos o modo <em>Absoluto</em> e o <em>Absoluto Long</em>.</p>
</div>
</div>

No Snes também temos um modo na mesma linha do Absoluto que se chama *Direct Page*, que possui alguns derivado, mas farei um vídeo separado sobre esse modos pois eles tem uns detalhes extras.

***Neste episódio vamos ver apenas o modo Absolute Long. O Absolute Short veremos em um episódio futuro.***

## Do que se trata o modo Absoluto?

O modo absoluto nada mais é do que você utilizar o próprio endereço absoluto em um parâmetro da instrução, como no exemplo abaixo:

{% capture _code %}{% highlight asm linenos=table %}
move.w #$1234,$ff0000
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

No exemplo acima temos no primeiro parâmetro o modo *imediato*, que já estudamos, e no segundo parâmetro temos o modo *absolute long*, onde especificamos diretamente o endereço absoluto de onde queremos copiar o número, no caso o endereço *$ff0000*, que é o início da Ram do Mega Drive.

Como utilizamos o próprio endereço absoluto, daí que vem o nome. Simples né?

<div class="info">
<img src="/assets/img/icons/thanos1.gif">
<div style='display: block'>
<h4>Modo Absoluto</h4>
<p>Sempre que colocar diretamente o endereço final em um parâmetro você estará utilizando o modo <em>Absoluto</em>. No caso o endereço é o próprio <em>Endereço Efetivo</em> direto. Outros modos onde a Cpu faz uma conta para chegar no endereço efetivo aí não é modo absoluto.</p>
</div>
</div>

Cuidado para não confundir o modo absoluto com o modo imediato. O modo imediato sempre começa com um *#*, então se esquecer o *#* vai transformar o modo em absoluto, o que não é o que você quer.

<div class="info">
<img src="/assets/img/icons/bowser3.gif">
<div style='display: block'>
<h4>Cuidado com o bug</h4>
<p>Uma fonte muito comum de bugs é quando queremos colocar um imediato e esquecemos de colocar o <em>#</em> na frente. Se esquecer, o modo vira absoluto, o qual vai pegar o dado da memória, causando assim um bug no seu código. Isso acontece com muita frequência.</p>
</div>
</div>

Vamos então começar com os modos do Mega Drive.

## Modo Absolute Long no 68000

O modo *absolute long* (absoluto longo) é o modo mais comum de se usar e é quando utilizamos um endereço de *32 bits* pra indicar o endereço onde a cpu vai realizar a operação. A imagem abaixo mostra um exemplo:

<img src="/pages_data/{{page.repository}}/absolute1.jpg" style="opacity:0.8; width:60%;"/>

Neste exemplo o primeiro parâmetro tem o modo *imediato* e o segundo parâmetro tem um modo *absolute long*, uma vez que estamos indicando o endereço absoluto de onde queremos copiar o dado. Após o final da instrução o byte $05 é copiado para o endereço $ff0000. Apenas um byte é copiado pois a instrução é *.b*.

A cpu não precisa fazer nada para encontrar o endereço onde copiará o dado, pois ele já foi especificado diretamente.

Lembre-se que no Mega Drive o barramento de endereços tem apenas 24 bits, então podemos escrever *$ff0000* ao invés de *$ffff0000* pois dá na mesmo no final, uma vez que apenas os 24 bits menos significativos é que são colocados no barramento.

Só pra reforçar, as duas linhas abaixo são totalmente diferentes:

{% capture _code %}{% highlight asm linenos=table %}
move.w #$1234,$ff0000 // immediate / absolute long
move.w $1234,$ff0000  // absolute long / absolute long
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Na linha 1 copiamos o número (imediato) $1234 para o endereço $ff0000. Na linha 2 copiamos 16 bits (pois é .w) que estão localizados no endereço $00001234 para o endereço $ff0000.

A imagem abaixo mostra o mesmo exemplo mas agora com tamanho *.l*

<img src="/pages_data/{{page.repository}}/absolute2.jpg" style="opacity:0.8; width:60%;"/>

Vemos que agora 4 bytes são copiados e fica em formato *big endian* na memória, uma vez que a cpu é big endian conforme já estudamos em episódios passados.

##### Modo Absoluto e Barramento

Quando usamos o modo absoluto a cpu coloca no barramento de endereços o próprio endereço que foi codificado na instrução.

A figura abaixo mostra um exemplo:

<img src="/pages_data/{{page.repository}}/absolute9.jpg" style="opacity:0.8; width:80%;"/>

Lembre-se que uma instrução leva vários ciclos de clock para executar. No começo a a cpu tem que buscar a instrução (o opcode) na memória, e neste momento o registrador *PC* (Program Counter) é colocado no barramento de endereços. Posteriormente quando a instrução vai gravar o dado na memória, o endereço efetivo é colocado no barramento (veja os bits na figura acima).

<div class="info">
<img src="/assets/img/icons/metroid1.gif">
<div style='display: block'>
<h4>Endereço Efetivo</h4>
<p>No caso do modo absoluto, o próprio endereço é o endereço efetivo.</p>
</div>
</div>

Na instrução *move* da imagem acima, em algum dos ciclos de clock da instrução a cpu vai jogar no barramento de endereços o valor *$ff1000* e no barramento de dados o valor *$1234*.
Como o endereço está no range da memória Ram do Mega Drive, o circuito tem que de alguma forma ativar o chip da memória Ram para que a gravação aconteça.

##### Sintaxes Possíveis

Quando colocamos o endereço diretamente como nos exemplos acima, o modo padrão é o *absolute long*, porém o assembler Bass aceita as possíveis variações abaixo:

<img src="/pages_data/{{page.repository}}/absolute3.jpg" style="opacity:0.8; width:40%;"/>

Com isso podemos escrever o endereço de 32 bits de várias formas, como por exemplo:

{% capture _code %}{% highlight asm linenos=table %}
move.w #$1234,$ff0000
move.w #$1234,$ff0000.l
move.w #$1234,($ff0000).l
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Todas as três linhas acima são equivalentes, pois o assembler Bass entende que o endereço $ff0000 é um endereço de 32 bits e que o modo é *absolute long*.

A figura abaixo mostra mais exemplos das possíveis variações:

<img src="/pages_data/{{page.repository}}/absolute4.jpg" style="opacity:0.8; width:60%;"/>

<div class="info">
<img src="/assets/img/icons/dragonquest1.gif">
<div style='display: block'>
<h4>Sintaxe e limitações</h4>
<p>Para o modo absolute long escolha a sintaxe que desejar, entre as três possíveis. Porém o Bass só aceita o mesmo tipo para os dois parâmetros. Então se os dois parâmetros forem absolute long, a sintaxe dos dois tem que ser a mesma.</p>
</div>
</div>

Como dito acima, se os dois parâmetros forem *absolute long*, a sintaxe dos dois tem que ser a mesma. Até daria pra fazer com que o Bass aceitasse cada parâmtero com uma sintaxe diferente, mas isso aumentaria muito o número de combinações no arquivo de arquitetura, e o ganho seria muito pequeno.

## Número de Extension Words

O número de *extension words* é o número de palavras (16 bits) que vem depois do opcode da instrução.
No caso do modo absolute long, cada parâmetro tem duas *extension words*, pois no absolute long o endereço é 32 bits. Então se os dois parâmetros forem absolute long, teremos duas extension words para cada parâmetro, dando um total de 80 bits na instrução (16+32+32).

Já com o absolute short precisamos de apenas uma extension word para cada parâmetro, pois o endereço é de 16 bits. Então se os dois parâmetros forem absolute short, teremos uma extension word para cada parâmetro, dando um total de 48 bits na instrução (16+16+16).

A imagem abaixo mostra isso:

<img src="/pages_data/{{page.repository}}/absolute8.jpg" style="opacity:0.8; width:60%;"/>

Na imagem mostramos as extensions words para um parâmetro apenas. Caso a instrução tenha mais um parâmetro que precise de extension words, elas vão vir depois da primeira extension word, ou antes, dependendo da ordem dos parâmetros. Então uma instrução no 68000 pode ter até 80 bits no total, sendo 16 bits do opcode e 64 bits de extension words.

## Código de exemplo

Este é o código de exemplo que rodei no vídeo do episódio:

{% capture _code %}{% highlight asm linenos=table %}
//Immediate and Absolute Long
move.l #$12345678,$ff0000
move.b #$05,$ff0000.l
move.w #$aabb,($ff0000).l

//Both Absolute Long
move.b $1000,$ff0000

//Invalid. Must be the same format in both parameters. This is a Bass limitation.
//move.b $1000,$ff0000.l

//This is valid because both paremeters has the same syntax
move.b $1000.l,$ff0000.l

//Immediate and Absolute Long
move.l #$deadbeef,$ff8000

gameover:
    -; bra -

seek($1000)
    dl $9abcdef0
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}
