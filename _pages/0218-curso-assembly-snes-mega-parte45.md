---
layout: page
title: "Assembler e Tamanho dos Dados"
date: 2021/10/27
type: video
description: Nesta parte da série vou falar um pouco sobre o tamanho dos dados nos modos 8 bits e 16 bits, e o possíveis problemas que podem ocorrer na hora da geração do código.
entry_number: 218
youtube_video_id: CMLvG6GfE-M
repository: 0218-curso-assembly-snes-mega-parte45
has_code: false
has_p5: false
tags: [Assembly, Snes, Mega Drive, 8bits, 16bits, assembler]
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte45/

reference_links:
  - title: "Documentação do Bass - Arquiteturas"
    url: "https://github.com/ARM9/bass/blob/master/doc/architectures.md"

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Nesta parte da série vou falar um pouco sobre o tamanho dos dados nos modos 8 bits e 16 bits, e o possíveis problemas que podem ocorrer na hora da geração do código. Vou explicar também alguns detalhes do funcionamento do assembler Bass.


## Bugs gerados pelo assembler

No episódio anterior desta série nós vimos os modos 8 bits e 16 bits do Snes, juntamente com as instruções ***sep*** e ***rep***.
Um detalhe que citei naquele episódio foi que se estamos em modo 16 bits, temos que carregar imediatos e dados de 16 bits, mesmo que for um número de tamanho pequeno.
Considere o código abaixo:

{% capture _code %}{% highlight m68k linenos=table %}
seek($8000)
    clc
    xce
    nop

    rep #$30   //Mode full 16 bits (A, X and Y)
    lda #$0078 //16 bits mode, so we need a 16 bits immediate

-;  bra -
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

O código acima roda corretamente pois a instrução *lda* carrega um imediato de 16 bits, sendo que a Cpu está em modo de 16 bits devido à instrução ***rep #$30*** anterior. Abaixo vemos o código gerado pelo assembler no debugger:

<img src="/pages_data/{{page.repository}}/code1.jpg" style="opacity:0.7;" alt="Código"/>

Vemos que o código gerado é o mesmo mostrado mais acima.

Agora, se mudarmos a instrução *lda* como no código abaixo, acontecerá um bug:

{% capture _code %}{% highlight m68k linenos=table %}
seek($8000)
    clc
    xce
    nop

    rep #$30   //Mode full 16 bits (A, X and Y)
    lda #$78   //8 bits immediate, but we are in 16 bits mode!!!

-;  bra -
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Aparentemente era pra funcionar da mesmo forma, pois estamos no modo 16 bits e o *lda* carrega um imediato de 8 bits, o que caberia no registrador ***A*** normalmente. O "certo" seria colocar o valor *0x0078* automaticamente, uma vez que estamos no modo 16 bits.

Porém veja no código abaixo o que acontece com o código gerado:

<img src="/pages_data/{{page.repository}}/code2.jpg" style="opacity:0.7;" alt="Código"/>

Vemos que o código gerado é diferente do que escrevemos, e ao rodar no debugger a aplicação executa instruções totalmente inválidas a partir deste código.

O mesmo acontece se estivermos em modo 8 bits e tentarmos carregar um imediato de 16 bits.
Veja o código abaixo:

{% capture _code %}{% highlight m68k linenos=table %}
seek($8000)
    clc
    xce
    nop

    sep #$30   //Mode 8 bits (A, X and Y)
    lda #$78   //8 bits immediate. The right way to code.

-;  bra -
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

O código gerado é o seguinte:

<img src="/pages_data/{{page.repository}}/code3.jpg" style="opacity:0.7;" alt="Código"/>

O código gerado é correto como deve ser. Porém se carregarmos um imediato de 16 bits enquanto estamos em modo 8 bits, o que acontece? Veja o código a seguir:

{% capture _code %}{% highlight m68k linenos=table %}
seek($8000)
    clc
    xce
    nop

    sep #$30   //Mode 8 bits (A, X and Y)
    lda #$0078 //16 bits immediate. What Happens?

-;  bra -
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

O código gerado é errado, conforme mostra a figura a seguir:

<img src="/pages_data/{{page.repository}}/code4.jpg" style="opacity:0.7;" alt="Código"/>

Apareceu uma instrução ***brk*** após o *lda*.

Mas qual o motivo destes bugs? É o que veremos na seção a seguir.

## Motivo dos Bugs

O motivo destes bugs é o fato de o Bass ser um assembler de tabelas. Muitos assemblers são feitos desta forma, e é necessário entender como o assembler funciona para entender a causa desses bugs e o que fazer para programar da maneira certa pra não gerar esses bugs.

Em um assembler de tabela exitem tabelas de instruções para as diversas arquiteturas que o assembler suporta. No caso do Bass existe um tabela para a Cpu do Snes, uma pra Cpu do Mega Drive e pra vários outros sistemas.

Esses arquivos de arquitetura ficam na pasta *data/architectures* do Bass. Existem muitos arquivos, sendo que o da Cpu do Snes é o ***wdc65816.arch*** e o da Cpu do Mega é o ***md.cpu.arch***.

O código abaixo mostra a tabela de geração para a instrução *lda*:

{% capture _code %}{% highlight python linenos=table %}
lda #*16       ;$a9 =a
lda #*08       ;$a9 =a
lda *08,s      ;$a3 =a
lda (*08,s),y  ;$b3 =a
lda (*08,x)    ;$a1 =a
lda (*08),y    ;$b1 =a
lda [*08],y    ;$b7 =a
lda (*08)      ;$b2 =a
lda [*08]      ;$a7 =a
lda *16,y      ;$b9 =a
lda *24,x      ;$bf =a
lda *16,x      ;$bd =a
lda *08,x      ;$b5 =a
lda *24        ;$af =a
lda *16        ;$ad =a
lda *08        ;$a5 =a
//
lda.w #*16     ;$a9 ~a
lda.b #*08     ;$a9 ~a
lda.w *16,y    ;$b9 ~a
lda.l *24,x    ;$bf ~a
lda.w *16,x    ;$bd ~a
lda.b *08,x    ;$b5 ~a
lda.l *24      ;$af ~a
lda.w *16      ;$ad ~a
lda.b *08      ;$a5 ~a
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Já existe uma documentação oficial explicando essa parte de arquiteturas e pode ser vista no site abaixo:

[https://github.com/ARM9/bass/blob/master/doc/architectures.md](https://github.com/ARM9/bass/blob/master/doc/architectures.md)

Não vou explicar essa parte pois já existe esta documentação oficial, então leiam lá para entender como funciona esse arquivo de arquitetura.

Então, o assembler verifica cada linha da tabela até encontrar um match. ***O assembler não guarda a informação se a Cpu está em modo 8 bits ou modo 16 bits***. O assembler apenas faz o match da instrução atual com a tabela de arquitetura.

Não caso do primeiro exemplo em que estamos em modo 16 bits e fazemos uma leitura com um imediato de 8 bits, o assembler não vai fazer um match na primeira linha da tabela acima pois o parâmetro tem apenas 8 bits e nesta linha da tabela existe a opção ***=a*** que força a ser um parâmetro de 16 bits pra poder ocorrer o match. Então o assembler vai para a próxima linha, que no caso vai ocorrer um match:


{% capture _code %}{% highlight python linenos=table %}
lda #*08       ;$a9 =a
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Porém com o match nesta linha o assembler vai gerar o código da instrução *lda*, mas como o parâmetro da linha tem apenas 8 bits, ele vai colocar apenas um byte do parâmetro após o opcode da instrução, o *a9* seguido do *78* no exemplo feito.
Mas na hora da execução, como a Cpu estará em modo 16 bits, ela esperará o *lda* com 2 bytes na sequência, e não apenas 1! Como a Cpu não sabe que o código foi gerado errado, ela vai executar da forma que está, pegando 2 bytes depois do opcode, e este último byte no caso será um byte da próxima instrução, que a Cpu erroneamente vai tratar como sendo o imediato da instrução *lda*. Por isso ocorre o erro.

## Forma Correta

Para as Cpus que possuem modos que alteram o número de bytes da Cpu, como no caso do Snes, é necessário sempre colocar os dados no tamanho correto de acordo com o modo atual da Cpu. Então se a Cpu estiver em modo 8 bits, sempre escreva os dados com 8 bits, e se estiver em 16 bits sempre escreva em formato 16 bits, mesmo se for um número pequeno como 0 ou 1, onde é necessário escrever #$0000 e #$0001. O mesmo vale para quando estamos em modo 8 bits, onde ser gravarmos um imediato de 16 bits vai dar pau, pois o assembler vai fazer o match com uma instrução de 16 bits, o que gerará um código errado.

***Vale ressaltar que esse assembler usa tabelas e não um parser com uma gramática***, o proporcionaria uma semântica muito mais avançada.

## Como Evitar os Erros?

Se vocês notarem na tabela que coloquei acima, existem várias linhas onde dá pra ver que o Bass suporta a sintaxe com ***.b*** e ***.w*** para o *lda*. Isso é uma funcionalidade proporcionada pelo Bass e não tem a ver com a Cpu em si, como acontece com a Cpu 68000 do Mega Drive.

Notem também que essas linhas que tem o ***.b*** e o ***.l*** também tem no final o ***~a***. Lendo a documentação do Bass vemos que quando é colocado um *til* o Bass vai fazer um *match fraco*. Isso quer dizer que ser fizermos a linha abaixo:

{% capture _code %}{% highlight m68k linenos=table %}
lda.w #$78
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Neste caso como é *.w* o Bass vai gerar o código como sendo com dois bytes no imediado, ou seja, com *#0078*. Então ele coloca o *00* automaticamente. Desta forma não precisamos colocar o tamanho exato dos dados de acordo com os modos. Se especificarmos o tamanho na instrução, o Bass vai gerar o código neste tamanho.

Portanto é muito indicado colocar a informação de tamanho ***.b*** ou ***.w*** no Snes para evitar possíveis bugs caso esqueçamos de colocar os tamanhos corretos.

Mas notem que você terá com sempre colocar ***.b*** se tiver em modo 8 bits e ***.w*** se tiver em modo 16 bits. Se, por exemplo, colocar *.b* sendo que o modo é 16 bits, vai dar erro, pois o código será gerado apenas com 1 byte de parâmetro sendo que a Cpu espera 2 bytes.
