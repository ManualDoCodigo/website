---
layout: page
title: "O que são Modos de Endereçamento em Assembly?"
date: 2022/02/10
type: video
description: Neste episódio vamos começar a aprender mais a fundo os modos de endereçamento disponíveis no Snes e no Mega Drive. 
entry_number: 230
youtube_video_id: qUaQ0au_B9U
repository: "0231-curso-assembly-snes-mega-parte54"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte54/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Uma instrução em assembly tem basicamente duas informações, o tipo da instrução e a localização dos parâmetros necessários para executar a instrução.

<div class="info">
<img src="/assets/img/icons/snes1.gif">
<div style='display: block'>
<h4>O que são Modos de Endereçamento?</h4>
<p>Os métodos para a localização dos operandos usados para executar uma instrução são o que chamamos de Modos de Endereçamento.</p>
</div>
</div>

Uma cpu geralmente possui vários modos de endereçamento, e cada instrução utiliza um sub-conjunto desses métodos de endereçamento. Algumas instruções suportam muitos modos, enquanto outras suportam apenas um modo. 

É necessário prática até ganhar familiaridade com os modos de endereçamento suportados por cada instrução.

Na figura abaixo temos a sintaxe da instrução *move* e podemos ver que ela necessita de dois parâmetros e cada parâmetro pode ter vários tipos de modos de endereçamento. 

<img src="/pages_data/{{page.repository}}/addrmode6.jpg" style="opacity:0.8; width:70%;"/>

Na figura o ***EA*** significa *Effective Address*, ou em português *Endereço Efetivo*. 

<div class="info">
<img src="/assets/img/icons/sonic2.gif">
<div style='display: block'>
<h4>O que é o Endereço Efetivo?</h4>
<p>O endereço efetivo (Effective Address) é a localização final do parâmetro a ser usado na instrução. Apesar de ter o nome <em>Endereço</em>, não necessariamente é um endereço de memória, mas pode ser também o nome de um registrador ou um imediato.</p>
</div>
</div>

Em vários modos de endereçamento a Cpu faz uma conta para chegar no endereço de memória final que será usado na instrução. Cada tipo de conta ou combinação possui um nome diferente, que são os modos de endereçamento diferentes.

Esses diferentes modos de endereçamento é o que vamos começar a estudar hoje. Mostrarei 3 modos no Mega Drive e 2 modos no Snes. 

<div class="info">
<img src="/assets/img/icons/sf1.gif">
<div style='display: block'>
<h4>Parâmetro ou Instrução?</h4>
<p>O Modo de Endereçamento não diz respeito à instrução como um todo, e sim aos parâmetros. Então se a instrução tiver mais de um parâmetro, cada um dos parâmetros pode ter um modo de endereçamento diferente.</p>
</div>
</div>

Algumas instruções forçam que um dos parâmetros seja de um certo tipo, como o ***add*** e o ***sub*** que já estudamos em episódios passados:

<img src="/pages_data/{{page.repository}}/addrmode7.jpg" style="opacity:0.8; width:50%;"/>

Nessas instruções um dos parâmetros tem que ter o modo *Data Register Direct*. Lembrando que no segundo parâmetro não podemos ter um imediato pois não faz sentido ter um imediato no destino. Esse tipo de detalhe se ganha com a prática.

Outras instruções como o ***cmpm*** só permitem um modo de endereçamento:

<img src="/pages_data/{{page.repository}}/addrmode8.jpg" style="opacity:0.8; width:50%;"/>

Nesta instrução o único modo permitido é o *Registrador de Endereço Indireto com Pós Incremento*, o qual estudaremos em um episódio futuro.

## Modos de Endereçamento no Mega Drive

A cpu do Mega Drive, o 68000 da Motorola, possui vários modos de endereçamento, alguns bem poderosos e que economizam instruções se comparados com os do Snes.

Apesar de a cpu do Snes ter mais modos de endereçamento comparado com o Mega, a cpu Mega é mais moderna e possui vários modos de endereçamento bem legais. 

A figura abaixo resume os modos encontrados no 68000:

<img src="/pages_data/{{page.repository}}/addrmode1.jpg" style="opacity:0.8; width:100%;"/>

Como vemos o 68000 possui 13 modos de endereçamento, onde hoje veremos os três que considero mais simples, marcados verde com um *OK*. Sempre que vermos um modo novo eu colocarei um *OK* para indicar quais já aprendemos.

<div class="info">
<img src="/assets/img/icons/mega1.gif">
<div style='display: block'>
<h4>Quantidade de Modos</h4>
<p>O nome e a quantidade de modos de endereçamento pode variar dependendo do livro ou documento que estiver estudando. Alguns livros mostram mais modos ou menos, e o nome pode variar um pouco. Isso ocorre de acordo como o escritor resolve organizar os modos. Por exemplo, algumas instruções não tem parâmetros, então alguns autores consideram isso um modo separado e outros não. Aqui resolvi colocar o que mais se vê nos livros em geral.</p>
</div>
</div>

Para o Mega Drive então veremos os modos ***Data Register Direct***, ***Address Register Direct*** e ***Immediate***, que estão entre os mais simples.

## Data Register Direct no 68000

Esse acho que é o mais simples. Quando utilizamos em um parâmetro o nome de um ***registrador de dados*** diretamente, esse é o modo de endereçamento *Data Register Direct*, ou em português ***Registrador de Dados Direto***. O código abaixo mostra o exemplo, onde os dois parâmetro usam o *Data Register Direct*

{% capture _code %}{% highlight python linenos=table %}
//Both Data Register Direct
move.b d0,d3
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Note que esse modo se trata apenas dos *registradores de dados*, pois quando é um registrador de endereço o nome do modo de endereçamento é *Address Register Direct* (explicado na próxima seção).

A figura abaixo mostra um exemplo que explica esse modo.

<img src="/pages_data/{{page.repository}}/addrmode3.jpg" style="opacity:0.8; width:70%;"/>

Neste exemplo os dois parâmetros possuem o modo *Data Register Direct*, onde estamos copiando o conteúdo do registrador *d0* para o registrador *d3*. Apenas o byte menos significativo é alterado pois a instrução é *.b*.

<div class="info">
<img src="/assets/img/icons/bowser1.gif">
<div style='display: block'>
<h4>Tamanho da instrução</h4>
<p>O tamanho da instrução (<em>.b</em>, <em>.w</em> ou <em>.l</em>) não tem a ver com o modo de endereçamento em si. São coisas distintas. Apesar de que alguns modos não permitem todos os tamanhos.</p>
</div>
</div>

## Address Register Direct no 68000

O *Address Register Direct*, ou *Registrador de Endereço Direto* em português, é idêntico ao *Data Register Direct* porém é quando utilizamos um registrador de endereços.

<div class="info">
<img src="/assets/img/icons/mario2.gif">
<div style='display: block'>
<h4>Address Register Direct</h4>
<p>Sempre que usarmos um registrador de endereços diretamente estaremos usando o modo de endereçamento <em>Address Register Direct</em>.</p>
</div>
</div>

O código abaixo mostra um exemplo do modo *Registrador de Endereço Direto*:

{% capture _code %}{% highlight python linenos=table %}
//Both Address Register Direct
movea.l a0,a3
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

A instrução ***movea*** já aprendemos em episódios passados e é a instrução que copia algum dado, vindo de algum *endereço efetivo*, para um *registrador de endereços*. Na instrução acima ambos os parâmetros possuem o modo *Address Register Direct*.

## Immediate no 68000

Já utilizamos os imediatos em vários episódios no passado, e nada mais são do que número fixo que utilizamos diretamente na instrução, o que faz com que este número faça parte do próprio binário da instrução. 

Sempre que usamos um imediato em uma instrução estamos utilizando o modo de endereçamento *Imediato* (Immediate)!

Este acho que é o modo de endereçamento mais simples.

<div class="info">
<img src="/assets/img/icons/magus1.gif">
<div style='display: block'>
<h4>Imediato</h4>
<p>Um imediato sempre começa com o símbolo <em>#</em>. Um número sem um <em>#</em> na frente <em>não</em> é um imediato. Se atente a isso!</p>
</div>
</div>

Um imediato então sempre começa com um *#* seguido de um número, e no assembler *Bass* podemos especificar o números nos formatos decimal, hexadecimal, octal ou binário, seguindo os formatos definidos nas regex abaixo:

<img src="/pages_data/{{page.repository}}/addrmode5.jpg" style="opacity:0.8; width:50%;"/>

Se você não entende o formato acima, é muito importante aprender sobre expressões regulares, pois aparece constantemente em programação.

De longe o modo mais utilizado é o ***hexadecimal***, então em quase todas as vezes veremos os imediatos começarem com *#$*, pois os imediatos começam com *#* e um número hexadecimal começa com *$*.

A instrução abaixo exemplifica o uso do modo de endereçamento *imediato*:  

{% capture _code %}{% highlight python linenos=table %}
//Immediate and Data Register Direct
move.l #$10204fff,d0
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Vemos que o primeiro parâmetro usa o modo *imediato* e o segundo parâmetro usa o modo *registrador de dados direto* (data register direct).

No caso do 68000 o imediato fica localizado em uma ou duas *extension words* (palavras de extensão) junto com o opcode da instrução. Então nas intruções que usam o modo de endereçamento imediato, além dos 16 bits da instrução existem mais duas words (de 16 bits) na sequência. Como o 68000 é *big endian* a primeira word (a mais significativa) vem primeiro. 

Quando a instrução tem tamanho *.b* ou *.w*, apenas uma extension word é usada, mas quando é *.l* aí são necessárias duas extension words. Quando é *.b* apenas os bits *0-7* são usados.

No caso do assembler *Bass* que utilizamos, a implementação da arquitetura do 68000 é bem flexível e permite que escrevamos os imediatos sem necessariamente colocarmos o tamanho exato da instrução, diferente do que acontece quando programamos pra Snes como veremos mais a frente. Então as duas linhas abaixo geram o mesmo código no final, pois em ambos os casos o imediato fica com o valor *$00000012* pois as instruções tem tamanho *.l*.

{% capture _code %}{% highlight python linenos=table %}
// Immediate and Data Register Direct
move.l #$00000012,d0
move.l #$12,d0
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Caso queira saber exatamento o que o Bass faz para gerar o código é só ver o arquivo de arquitetura da cpu para ver como a geração do código é feita para cada combinação. Isso é algo bem mais avançado, mas só como exemplo abaixo está o que o Bass faz para o caso de *imediato* para *registrador de dados direto*: 

{% capture _code %}{% highlight cpp linenos=table %}
move #*08,d*03   ; %0011 ~b %0 %00111 %100 >>08a ~a
move.b #*08,d*03 ; %0001 ~b %0 %00111 %100 $00 =a
move.w #*08,d*03 ; %0011 ~b %0 %00111 %100 >>08a ~a
move.l #*08,d*03 ; %0010 ~b %0 %00111 %100 >>24a >>16a >>08a ~a
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

O *~* nesta sintaxe indica que o Bass faz a conversão para o tamanho certo conforme necessário. Lá no Snes no geral sempre temos que colocar os imediatos no tamanho correto, pois lá a cpu funciona com modos 8 bits ou 16 bits, então o tamanho do imediato é necessário para gerar o código para o caso certo. Mas veremos isso na seção do Snes mais abaixo.

***Se você não entendeu esses detalhes do Bass não se preocupe que isso é algo mais avançado e esses detalhes são aprendidos com a prática.***

## Código do tutorial do Mega Drive

No vídeo eu utilizei o código abaixo como exemplo para rodar no debugger:

{% capture _code %}{% highlight python linenos=table %}
seek($200)
  nop
  nop

  //Immediate and Data Register Direct
  move.l #$10204fff,d0
  move.l #$1034f88a,d3

  //Both Data Register Direct
  move.b d0,d3

  //Immediate and Address Register Direct
  movea.l #$00200000,a0

  //Both Address Register Direct
  movea.l a0,a3

gameover:
  -; bra -
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

## Modos de Endereçamento no Snes

A cpu do Snes possue bem mais modos de endereçamento se comparado com o 68000 do Mega Drive, porém o detalhe é que no Snes os nomes mudam dependendo do tamanho dos parâmetros, o que não acontece no 68000. Então no fundo vários modos são parecidos com os do 68000, porém quebrados em nomes diferentes dependendo do tamanho. 

Porém existem detalhes importantes relativo aos tamanhos, como é o caso dos modos chamados *Direct Page*, que veremos em outro episódio.

<div class="info">
<img src="/assets/img/icons/snes1.gif">
<div style='display: block'>
<h4>Cpu do Snes</h4>
<p>Como a Cpu do Snes é de acumulador e trabalha com bancos de 64 KB, existem diferenças bem legais de aprender comparando com o Mega Drive.</p>
</div>
</div>

A figura abaixo resume os modos de endereçamento do Snes:

<img src="/pages_data/{{page.repository}}/addrmode2.jpg" style="opacity:0.8; width:100%;"/>

Vemos que existem 25 modos de endereçamento no Snes contra 13 no Mega Drive. Mas veremos que no Snes muitos modos são bem semelhantes entre si, só mudando o tamanho dos dados e alguns poucos detalhes.

Neste episódio aprenderemos os modos *Immediate* e *Accumulator*, que considero os mais simples. 

A Cpu do Snes tem acumulador, então não tem toda aquela quantidade de registradores de dados e endereços que o 68000 contém, portanto aqui não existem os modos *Data Register Direct* e o *Address Register Direct*.

<div class="info">
<img src="/assets/img/icons/terranigma1.gif">
<div style='display: block'>
<h4>No máximo 1 parâmetro</h4>
<p>Lembre-se de que na cpu 65c816 do Snes cada instrução pode ter no máximo um parâmetro, então muda muita coisa comparado com o 68000, que pode ter até dois parâmetros por instrução.</p>
</div>
</div>

## Immediate no 65c816 do Snes

O modo imediato na cpu do Snes segue a mesma coisa do 68000 do Mega Drive, onde o valor do imediato fica embutida junto com o binário da instrução, em bytes de extensão.

A diferença é que o tamanho do imediato varia de acordo com modo de acesso à memória que a Cpu está no momento (8 ou 16 bits). Já vimos no passado esses detalhes de como alterar a cpu entre os modos 8 e 16 bits.

Quando a cpu estiver em modo *8 bits*, o imediato tem que ter o tamanho de 8 bits exato, como na instrução abaixo:

{% capture _code %}{% highlight python linenos=table %}
lda #$12
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Quando a cpu está em modo 16 bits, os imediatos tem que ter 16 bits exatos, como na instrução abaixo:

{% capture _code %}{% highlight python linenos=table %}
lda #$0012
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Note que o tamanho do imediato tem que respeitar o modo da cpu (8 ou 16 bits), pois caso contrário ocorrerá geração errada de código. 

***O assembler não tem como saber que modo a cpu está no momento em que vai gerar o código de uma instrução, portanto o assembler precisa que o imediato esteja no tamanho certo para que ele saiba como gerar o código binário correto.***

Se você se questinar se as instruções *sep* e *rep*, que já aprendemos, poderiam ser usadas pelo assembler para saber o modo atual da cpu (8 ou 16 bits), a resposta é ***NÃO***, pois nada garante que o assembler pense que a cpu está em modo 8 bits, depois de por exemplo encontrar uma instrução *sep #$20* mais acima, e alguma outra parte do código que esteja em modo 16 bits pular para esta instrução atual sendo gerada. Existem muitas opções pra essa lógica quebrar, então isso não funciona.

O código abaixo mostra dois bugs gerados pelo tamanho errado sendo usado no imediato:

{% capture _code %}{% highlight python linenos=table %}
sep #$20    // Entrando em modo 8 bits
lda #$0012  // Ops, era pra ser #$12. Bug!

rep #$20    // Entrando em modo 16 bits
lda #$12    // Ops, era pra ser #$0012. Bug!
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

No primeiro bug acima quando o assembler chegar na instrução *lda #$0012* ele gerará o código supondo que a cpu está em modo 16 bits, pois o *sep* mais acima não garante nada. O assembler então vai gerar o opcode do *lda* e vai colocar dois *extension bytes* na frente (0x1200). O *0x12* fica na frente pois a cpu é *little endian*. O problema ocorrerá quando a cpu executar o código, pois como ele estará em modo 8 bits ela irá esperar que exista apenas um byte de imediato na frente, porém terá dois. A cpu não sabe disse, então ela pegará um byte normalmente porém o próximo byte de extensão, que seria o *0x00* será tratado como a próxima instrução, que no caso é um *brk*, o que gerará um bug catastrófico.

<div class="info">
<img src="/assets/img/icons/bowser1.gif">
<div style='display: block'>
<h4>Cuidado com o bug</h4>
<p>Em assembly de Snes sempre coloque o imediato no tamanho exato de acordo com o modo da cpu (8 ou 16 bits). Errar nisso é bug chato na certa.</p>
</div>
</div>

Às vezes é difícil saber em que modo estamos quando vemos um código de Snes. Por causa disso o Bass permite que em algumas instruções nós coloquemos um *.b* ou *.w* na instrução, o que faz o assembler gerar o código supondo que a cpu está no modo indicado e fica mais fácil de analizar os códigos. Porém se colocar o modo errado vai gerar bug do mesmo jeito. 

Já falei sobre isso em um episódio passado.

Abaixo tem uns exemplos pra relembrar:

{% capture _code %}{% highlight python linenos=table %}
sep #$20      // Entrando em modo 8 bits
lda.b #$12    // Ok
lda.b #$0012  // Ainda Ok, pois é .b, então o Bass converte pra #$12
lda.w #$0012  // Bug! Vai gerar supondo 16 bits pois é .w
lda.w #$12    // Bug! Vai converter pra #$0012 pois é .w

rep #$20      // Entrando em modo 16 bits
lda.w #$0012  // Ok
lda.w #$12    // Ainda Ok. Como é .w converte pra #$0012
lda.b #$0012  // Bug! Como é .b vai converter pra #$12
lda.b #$12    // Bug! Mesmo erro. Gerará apenas um extension byte.
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Vemos então que está sintaxe força apenas 1 extension byte quando é *.b* e 2 extension words quando é *.w*, o que gera bug se colocar o modo diferente do que a cpu está no momento da execução.

Esses problemas de tamanho não ocorrem na cpu do Mega Drive pois no 68000 as instruções são sempre 16 bits, então o assembler sempre sabe como gerar a instrução corretamente.

## Modo Accumulator no 65c816 do Snes

O modo *Accumulator* (Acumulador) é extremamente simples e diz respeito às instruções que usam o registrador *A* de forma implícita e apenas alterar o valor do A, sem utilizar nada da memória nem nenhum imediate. 

Como exemplo temos a instrução *inc* abaixo:

{% capture _code %}{% highlight python linenos=table %}
inc
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Esta instrução incrementa o *A* diretamente, sem precisar de nada extra. Outro exemplo seria a instrução *asl* (arithmetic shif left) abaixo:

{% capture _code %}{% highlight python linenos=table %}
asl
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Ainda não aprendemos essa instrução na série, mas a instrução apenas faz um shift dos bits do *A* para a esquerda, sem precisar de nada extra.

<div class="info">
<img src="/assets/img/icons/mario3.gif">
<div style='display: block'>
<h4>Modo Acumulador</h4>
<p>As instruções que pegam o valor do registrador A, alteram esse valor e guardam o resultado novamente no registrador A utilizam o modo de endereçamento <em>Accumulator</em>.</p>
</div>
</div>

Alguns livros e documentos colocam esse modo junto com o modo *Implied* (implícito) que veremos em outro episódio. Porém aqui está separado pois o modo *Implied* geralmente supões dois operandos diferentes, como na instrução *tax* por exemplo, onde copiamos do *A* pro *X*. Já o modo *Accumulator* é ***unário***, onde a fonte e o destino é o mesmo registrador, no caso o *A*.

## Código do tutorial do Snes

No vídeo eu utilizei o código abaixo como exemplo para rodar no debugger do Snes:

{% capture _code %}{% highlight python linenos=table %}
seek($200)
  rep #$30

  //Immediate
  lda #$2001

  //Accumulator
  asl

  //Immediate
  sep #$20
  lda #$55
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}