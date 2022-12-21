---
layout: page
title: "O modo ABSOLUTO do Snes."
date: 2022/10/04
type: video
description: Neste episódio vamos aprender sobre o modo de endereçamento absoluto da cpu 65c816 do Snes. 
entry_number: 239
youtube_video_id: GMlECbwZgPQ
repository: "0239-curso-assembly-snes-mega-parte58"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte58/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste episódio vamos aprender sobre o *modo de endereçamento absoluto* da cpu do Snes. Em um episódio passado aprendemos o modo absoluto no Mega Drive, e agora veremos os detalhes no Snes.

Só como revisão, o modo absoluto é o modo em que usamos no parâmetro de uma instrução o próprio endereço absoluto de onde a cpu vai ler ou escrever. 

Hoje veremos dois modos de endereçamento absoluto, o modo absoluto e o modo absoluto longo. O Snes também possui um modo similar chamado *Direct Page* que veremos em outro episódio. Existe também os modos *Absolute Indexed* e *Absolute Indirect* que veremos em outros episódios também. Hoje veremos apenas os modos absoluto "puros".

<div class="info">
<img src="/assets/img/icons/snes1.gif">
<div style='display: block'>
<h4>Só muda o tamanho</h4>
<p>No Snes muitos modos são idênticos, só mudando o tamanho do dado, 8 bits, 16 bits ou 24 bits. Fique atento a isso, pois simplifica o entendimento. Isso ocorre pela cpu do Snes trabalhar com bancos de memória e ter modos 8 bits e 16 bits separados.</p>
</div>
</div>

## Revisão dos bancos de memória

Antes de começar, vamos revisar os bancos de memória do Snes, pois isso é importante para entendermos o modo absoluto e como a cpu trabalha com endereços (ponteiros).

Já aprendemos sobre os bancos de memória do Snes em episódios anteriores, e inclusive revisamos no episódio passado, mas é bom sempre estar revisando para entender bem. A imagem abaixo resume a estrutura dos bancos no Snes.

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:100%;"/>

Vemos então que temos os bancos indo de *$00* até *$ff*, e que cada banco tem 64kb de tamanho, com endereços indo de *$0000* até *$ffff*.

Como a cpu trabalha com bancos de 64KB, os endereços que a cpu trabalham são de 16 bits, pois tudo fica limitado dentro do banco atual. Então 16 bits é o tamanho "normal" dos endereços no Snes. Porém é possível usar endereços de *24 bits*, e isso normalmente é o que chamamos de *endereço longo*.

<div class="info">
<img src="/assets/img/icons/sf4.gif">
<div style='display: block'>
<h4>Modos longos</h4>
<p>No Snes os modos de endereçamento que tem um <em>long</em> no nome utilizam endereços de <em>24 bits</em>.</p>
</div>
</div>

Devido a esse fato da cpu trabalhar com bancos, ela possui registradores de banco que indicam os bancos que a cpu está lendo os dados e executando as instruções. Esses registradores são o *DBR* e o *PBR*, mostrados na imagem abaixo.

<img src="/pages_data/{{page.repository}}/img2.jpg" style="opacity:0.8; width:100%;"/>

Então na maior parte do tempo esses registradores vão ter o número do banco fixo neles e todos os endereços são de 16 bits dentro do banco indicado pelos registradores. Porém é possível usar endereços de 24 bits que alteram o banco atual, e isso é o que veremos em exemplos neste episódio e em episódios futuros. 

## Modo absoluto no Snes

O modo absoluto no Snes é o modo em que usamos um endereço de 16 bits como parâmetro de uma instrução. Esse endereço é o endereço absoluto de onde a cpu vai ler ou escrever.

Vamos ver um exemplo de como usar o modo absoluto no Snes. Vamos supor que queremos escrever o valor *0xff* na posição de memória *0xc000*. Então vamos usar a instrução *sta* que escreve um valor em uma posição de memória, e vamos usar o modo absoluto para indicar o endereço de memória.

{% capture _code %}{% highlight asm linenos=table %}
lda #$ff   // Immediate
sta $c000  // Absolute
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

O modo absoluto tem a ver com o endereço que colocamos no parâmetro da instrução, então pode ser usado em qualquer instrução que receba um endereço como parâmetro, como instruções que usem o registrador A, X e Y, e instrução de *jump* também, entre outras. 

<div class="info">
<img src="/assets/img/icons/vivi1.gif">
<div style='display: block'>
<h4>Não confunda</h4>
<p>No modo absoluto o endereço sempre tem 16 bits, não importando se a cpu está em modo 8 bits ou modo 16 bits. Uma coisa é o endereço dentro do banco (16 bits), outra coisa é o dado a ser lido ou gravado (8 ou 16 bits).</p>
</div>
</div>

##### Instrução, barramentos e Registrador DBR

A cpu do Snes trabalha com bancos, porém no final o endereço que estamos lendo ou escrevendo tem que entrar no *barramento A* do Snes que tem *24 bits*. Então o endereço de 16 bits que colocamos na instrução é somado com o valor do registrador *DBR* que indica o banco atual, e o resultado é o endereço de 24 bits que vai entrar no barramento A.

A figura abaixo mostra como funciona isso.

<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:70%;"/>

No modo absoluto a instrução tem 3 bytes, onde o primeiro é o opcode da instrução, e os outros dois bytes são o endereço de 16 bits em formato *little endian*, onde o primeiro byte é o byte menos significativo e o segundo byte é o byte mais significativo.

##### Endereço Efetivo

Como no barramento temos que colocar um endereço de 24 bits, o endereço efetivo final é o endereço de 16 bits que colocamos na instrução mais o valor do registrador *DBR*, que é concatenado com o endereço de 16 bits, como mostra a imagem acima. Então o endereço efetivo final é o endereço de 24 bits que vai entrar no barramento A.

O Registrador *DBR* é o banco atual de onde a cpu vai ler ou escrever os dados, e o Registrador *PBR* é o banco que a cpu está executando as instruções, portanto podemos estar executando código em um banco, indicado pelo *PBR*, e lendo ou escrevendo dados em outro banco diferente, indicado pelo *DBR*.

<div class="info">
<img src="/assets/img/icons/snes1.gif">
<div style='display: block'>
<h4>Inicialização</h4>
<p>Quando o Snes inicia, o banco padrão que fica nos registradores DBR e PBR é o banco 0. O banco 0 é um banco de sistemas, conforme vimos na parte 34 desta série.l</p>
</div>
</div>

## Modo Absolute Long no Snes

O modo *absolute long* é idêntico ao *absolute* normal, porém indicamos um endereço de *24 bits*, que já é o próprio endereço efetivo que a cpu vai usar pra colocar no barramento.

Vamos ver um exemplo de como usar o modo *absolute long* no Snes. Vamos supor que queremos escrever o valor *0xff* na posição de memória *0x7f0000*. Então vamos usar a instrução *sta* que escreve um valor em uma posição de memória, e vamos usar o modo *absolute long* para indicar o endereço de memória.

{% capture _code %}{% highlight asm linenos=table %}
lda #$ff     // Immediate
sta $7f0000  // Absolute Long
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Não são todas as instruções que suportam o modo absoluto longo. Algumas suportam apenas o modo absoluto normal. Leva um tempo até saber quais modos são compatíveis com cada instrução, mas com o tempo você vai pegando o jeito. Na maior parte dos casos as instruções que utilizam o registrador *A* tendem a suportar mais modos.

<div class="info">
<img src="/assets/img/icons/mario4.gif">
<div style='display: block'>
<h4>Instruções Específicas</h4>
<p>Não são todas as instruções que suportam o modo absoluto longo. Algumas suportam apenas o modo absoluto normal. Leva um tempo até saber quais modos são compatíveis com cada instrução.</p>
</div>
</div>

##### Instrução e endereço efetivo

Como o modo absoluto usa um endereço de 24 bits, a instrução no total fica com 4 bytes, onde o primeiro é o opcode da instrução, e os outros três bytes são o endereço de 24 bits em formato *little endian*, onde os dois primeiros bytes são o bytes menos significativos e o terceiro byte é o banco.

A figura abaixo mostra como funciona isso.

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:80%;"/>

Vemos então que no modo absoluto longo o registrador *DBR* não é usado, e o endereço efetivo final é o endereço de 24 bits que colocamos na instrução. O registrador *DBR* não é alterado e continua com o mesmo valor, apenas não é usado na geração do endereço efetivo.

## Conclusão

O código abaixo é o mostrado no vídeo que resume o conteúdo deste episódio.

{% capture _code %}{% highlight bass linenos=table %}
seek($8000)
	clc
	xce
	nop

    /////////16 bits
    rep #$30
    lda #$2233          //Immediate
    sta $0000           //Absolute
    lda $a000           //Absolute
    lda $018000         //Absolute Long

    lda #$0000          //Clean A

    /////////8 bits
    sep #$20
    lda #$44            //Immediate
    sta $0000           //Absolute
    lda $a000           //Absolute
    lda $018000         //Absolute Long

gameover:
-;  bra -

seek($a000) //Bank 0
data:
    dw $1234

seek($018000) //Bank 1
data_bank_01:
    dw $5678
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}