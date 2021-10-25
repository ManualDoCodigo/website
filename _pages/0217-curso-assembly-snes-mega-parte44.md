---
layout: page
title: "Afinal, quantos bits tem o Snes? 8 ou 16?"
date: 2021/10/25
type: video
description: Neste vídeo mostro que o Snes tem suporte a modos 8 bits e 16 bits e é comum ficar alternando entre esses modos a todo momento. Quando a Cpu está em modo 8 bits as instruções passam a trabalhar com dados de 8 bits. O mesmo vale para o modo 16 bits. No vídeo explico todas as opções.
entry_number: 217
youtube_video_id: FWVr3_hAHYo
repository: 0217-curso-assembly-snes-mega-parte44
has_code: false
has_p5: false
tags: [Assembly, Snes, Mega Drive, 8bits, 16bits]
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte44/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste artigo mostro uma característica importante do Snes que é a de ficar alterando entre os modos 8 e 16 bits de acordo com os dados que estamos processando.
As instruções que trabalham nessas questões são a ***rep*** e a ***sep***, que aparecem constantemente em códigos de jogos de Snes.
No Mega Drive existe esse tipo de coisa mas de forma diferente do Snes. No Mega a cpu 68000 trabalha com 3 tipos de tamanhos em várias instruções, usando o ***.b*** para byte, ***.w*** para word e ***.l*** para longword, porém a Cpu como um todo permanece na mesma. Já no Snes temos que alterar a Cpu para os modos 8 ou 16 bits, e ao alterar para um modo, todas as instruções passam a trabalhar neste modo, o que muda o acesso ao barramento.
Por exemplo, o barramento de dados do Snes é 8 bits, então se estamos no modo 16 bits, uma leitura da memória vai trazer 2 bytes, fazendo duas leituras sequenciais. No modo 8 bits apenas uma leitura é feita. Isso passa a afetar a cpu como um todo, diferente do Mega onde cada instrução é independente nessas questões.

A figura abaixo ilustra os modos, indicando o número de bytes em cada leitura e escrita para os dois tipos de modos:

<img src="/pages_data/{{page.repository}}/modes.jpg" style="opacity:0.7;" alt="Modos"/>

## Instruções REP e SEP

As instruções ***rep*** e ***sep*** servem para setar ou zerar bits da Status Register. A *sep* seta bits e a *rep* zera bits.
Nas duas instruções temos que passar uma máscara de 8 bits que indica quais bits setar ou zerar.

Na *sep* os bits ***1*** da máscara indicam quais bits da Status Register setar pra 1. Os bits que estão em *0* não alteram os bits correspondentes da Status Register, então o que estava com 0 fica com 0 e o que estava com 1 fica com 1.

Na *rep* os bits que estão em ***1*** indicam quais bits zerar na Status Register. Então note que um bit 1 na máscara indica que o bit ficará com o valor 0 na Status Register. O restando é igual ao *sep*.

A sintaxe então é desta forma:

{% capture _code %}{% highlight m68k linenos=table %}
  sep #mask
  rep #mask
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

## Status Register e influência nos modos

No Snes podemos ter os modos 8 bits e 16 bits, e esses modos são configurados por duas *flags* da Status Register.

<img src="/pages_data/{{page.repository}}/sr.jpg" style="opacity:0.7;" alt="Endianess"/>

As flags ***m*** e ***x*** da Status Register são as que controla os modos 8 e 16 bits.

A flag ***m*** controla se o registrador ***A*** trabalha em modo 8 ou 16 bits. Se a flag estiver em ***0*** o modo é 16 bits. Se estiver em ***1*** o modo é 8 bits.

A flag ***x*** controla se os registradores ***X*** e ***Y*** trabalham em modo 8 ou 16 bits. Se a flag estiver em ***0*** o modo é 16 bits. Se estiver em ***1*** o modo é 8 bits.

Essas flags alteram o tamanho dos registradores e também todas as instruções que trabalham com esses registradores. Então se o *A* estiver em modo 8 bits, ao ler um dado da memória com a instrução *lda*, a Cpu lê apenas um byte. Se estiver em modo 16 bits a Cpu lerá 2 bytes. Este é só um exemplo, mas o mesmo vale para todas as instruções que usam esses registradores.

## Instrução SEP

A instrução ***sep*** serve para alterar para 1 os bits selecionados na máscada passada.
Então os bits que estão com 1 na máscara irão alterar pra 1 esses mesmo bits na Status Register.
Por exemplo a instrução abaixo:

{% capture _code %}{% highlight m68k linenos=table %}
sep #$30
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Essa instrução vai jogar pra 1 os bits 3 e 4 da Status register. Os outros bits não são alterados.
Portanto os bits que estão com 0 na máscara não causam efeito na Status Register.
Com uma análise mais profunda vemos que essa instrução faz um ***"or"*** da Status Register com a máscara, conforme pseudocódigo abaixo:

{% capture _code %}{% highlight m68k linenos=table %}
SR | mask
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

<img src="/pages_data/{{page.repository}}/sep.jpg" style="opacity:0.7;" alt="sep"/>

## Instrução REP

A instrução ***rep*** faz o contrário da ***sep***, ou seja ela seta pra 0 na Status Register os bits que estão com 1 na máscara.
Nesta instrução a máscara funciona exatamente como na ***sep***, onde os bits com 1 indicam os bits a serem modificados.
Por exemplo a instrução abaixo:

{% capture _code %}{% highlight m68k linenos=table %}
rep #$30
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Essa instrução vai jogar pra 0 os bits 3 e 4 da Status Register e os outros bits não são alterados.
Com uma análise mais profunda vemos que essa instrução faz um ***"and"*** da negação da máscara com a Status Register, conforme pseudocódigo abaixo:

{% capture _code %}{% highlight m68k linenos=table %}
SR & ~(mask)
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

<img src="/pages_data/{{page.repository}}/rep.jpg" style="opacity:0.7;" alt="rep"/>

## Modos 8 bits e 16 bits no Snes

Ok, agora que sabemos como essas instruções funcionam, vamos entender agora que o Snes tem suporte aos modos 8 bits e 16 bits, e esses modos são controlados pelas flags ***M*** e ***X*** da Status Register (veja figura da Status Register acima).
A flag ***M*** controla se o registrador ***A*** trabalha com 8 ou 16 bits. Se a flag ***M*** for 1, o registrador trabalha apenas com 8 bits, e se a flag for 0 o registrador fica 16 bits.
Mas não é só o registrador que fica 8 ou 16 bits. Se estiver em 8 bits por exemplo, todas as instruções que usam o ***A*** vão passar a ser 8 bits. Por exemplo, se temos a seguinte instrução:

{% capture _code %}{% highlight m68k linenos=table %}
lda $0000
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Se a flag ***M*** for 1 a Cpu está em modo 8 bits e apenas um byte é lido e colocado nos primeiros 8 bits do ***A***.
Mas se a flag ***M*** for 0, a Cpu está em modo 16 bits e dois bytes são lidos e colocados nos 16 bits do ***A***.
A mesma lógica vale para a flag ***X***, onde esta flag controla os tamanhos dos registradores ***X*** e ***Y***.
Se a flag estiver em 1, a Cpu está em modo 8 bits no ***X*** e no ***Y*** e todas as instruções que usam esses registradores passam a operar em 8 bits.
Se a flag for 0 então os registradores e as instruções que operam nesses registradores passam a ser 16 bits.

## Alterando entre os modos 8 bits e 16 bits

Ao programar para Snes, sempre nos deparamos com os seis tipos de instruções abaixo:

{% capture _code %}{% highlight m68k linenos=table %}
sep #$20 //Extremamente comum
rep #$20 //Extremamente comum
sep #$30 //Comum
rep #$30 //Comum
sep #$10 //Pouco comum
rep #$10 //Pouco comum
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

As instruções acima manipulam justamente as flags que controlam os modos 8 bits e 16 bits.
A instruções mais comuns são as que manipulam apenas a flag ***M***, pois na maioria das instruções e algoritmos estamos interessados em manipular dados em nível de bytes, e normalmente os registradores ***X*** e ***Y*** sempre ficam no modo 16 bits. Mas as vezes é necessário mudar o ***X*** e ***Y*** para 8 bits, e nesses casos também alteramos juntos o ***A***, por isso a máscara **#$30** é comum.
Raramente deixamos o ***X*** e ***Y*** em 8 bits e o ***A*** em 16 bits, por isso a máscara **#$10** é bem menos comum.

## Registradores A, B e C

Conforme já aprendemos o Snes é uma Cpu com acumulador, e boa parte das instruções trabalham com o registrador ***A***.
O registrador A tem 16 bits, conforme já aprendemos em vídeos passados. O detalhe é que quando a Cpu passa a trabalhar no modo 8 bits (flag M=1), o registrador A passa a ser tratado tendo 8 bits, e os 8 bits mais significativos não são alterados quando fazemos uma leitura, por exemplo.
Porém é possível usar os 8 bits mais significativos do registrador A quando estamos em modo 8 bits. Como? É o que veremos na sequência.
Quandos estamos em modo 8 bits, o registrador A passa a ser os 8 bits menos significativos, e neste momento os 8 bits mais significativos são chamados de B. Então o registrador B é o byte mais significativo do registrador A quando a Cpu está em modo 8 bits.
Quando queremos considerar os 16 bits totais do registrador A, independente do modo da Cpu, chamamos o registrador A de C. Então o registrador C é o registrador A quando estamos manipulando os 16 bits totais do registrador, independente do modo.
Alguma instruções usam essa nomenclatura, que é o que veremos a seguir.

## Registrador B - Instrução XBA

A instrução ***xba*** é usada para trocar os valores dos registradores *A* e *B*. Lembrando que o B é 0 byte mais significativo do acumulador. A figura abaixo mostra o layout desses registradores.

<img src="/pages_data/{{page.repository}}/rega.jpg" style="opacity:0.7;" alt="Endianess"/>

Essa instrução é muito usada quando estamos em modo 8 bits, pois podemos salvar o A atual (8bits) no B usando a *xba*, e depois voltar com o valor original chamando novamente a instrução.

Essa instrução faz a troca e não a cópia.

As flags *n* e *z* são alteradas por essa instrução e utilizam o valor A (8 bits) como valor para o cálculo das flags, independente do modo.

## Código

O código mostrado no vídeo para exemplificar o assunto está listado abaixo:

{% capture _code %}{% highlight m68k linenos=table %}
// vim: ft=snes
arch snes.cpu

output "snesapp.sfc/snesapp.sfc", create

fill $200000

macro seek(variable offset) {
  origin ((offset & $7F0000) >> 1) | (offset & $7FFF)
  base offset
}

include "snes-header.snes.asm" // Include Header & Vector Table

seek($8000)
  clc
  xce
  nop

  rep #$30 //Mode full 16 bits (A, X and Y)

  lda #$1234 //16 bits mode, so we need a 16 bits immediate
  sta $0000 //Writing 2 bytes
  ldx $0000 //Reading 2 bytes to X
  ldy $0000 //Reading 2 bytes to Y
  lda #$0078 //8 bits immediate. What Happens?

  sep #$20 //8 bits mode
  sta $0010 //Now writes only 1 byte
  lda $0020 //Reads 1 byte

  lda #$ff //Maximum value for a byte
  inc //What Happens?

  rep #$20 //Back to 16 bits again. X and Y are already 16 bits
  lda #$00ff //Again
  inc // And now?

  ldx #$0000 //Cleaning X and Y
  ldy #$0000

  sep #$10 //X and Y now 8 bits
  ldx $0000
  ldy $0000
  ldx #$ff //Same test
  ldy #$ff
  inx
  iny

  rep #$10

  //Here we are full 16 bits

  lda #$1234
  xba

  lda #$8912
  xba

-
  bra -
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

## Status das Instruções

Nesta parte da série vimos 3 novas instruções, ***sep***, ***rep*** e ***xba***. A imagem abaixo mostra as instruções que aprendemos nesta parte em rosa e em verde as que já foram aprendidas no passado.

<img src="/pages_data/{{page.repository}}/instructions.jpg" style="opacity:0.7;" alt="Instruções"/>
