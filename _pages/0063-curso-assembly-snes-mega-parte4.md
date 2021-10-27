---
layout: page
title: "Como Funcionam os TRANSISTORES? Curso de Assembly. Parte 4"
date: 2020-06-24
type: video
description: Neste da série eu mudo um pouco assunto e vou lá para as entranhas dos hardware para explicar o que são os transistores. É importante saber como os transistores funcionam para ter uma noção maior sobre como as coisas acontecem nos hardwares.
entry_number: 63
youtube_video_id: 6GCY4nPhUck
repository: 0063-curso-assembly-snes-mega-parte4
has_code: false
has_p5: false
tags: [Assembly, Snes, Mega Drive, Romhacking, Transistor]
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte4/
---

## Introdução

Neste episódio da série eu mudo um pouco assunto e vou lá para as entranhas dos hardware para explicar o que são os transistores. É importante saber como os transistores funcionam para ter uma noção maior sobre como as coisas acontecem nos hardwares. Esse conhecimento acaba te ajudando na hora de programar os hardwares.

## Voltagem nos Consoles

A voltagem tanto no Snes quando no Mega Drive é de 5 Volts. Isso implica que todos os chips do console trabalham com 5V. Portanto, nos barramentos e em todos os fios dos circuitos lógicos, ***ou vão estar com 5V ou com 0V***. Não existe valor intermediários nos fios. Ou é 5V ou é 0V. Isso é importante para entender a lógica dos circuitos.

## Como Funciona um Transistor Simples?

Um transistor tem 3 conexões, a ***base***, o ***coletor*** e o ***emissor***, como na figura abaixo:

<img src="/pages_data/{{page.repository}}/transistor1.png" style="opacity:0.7;width:70%;" alt="Transistor"/>

A base é a responsável por ligar ou desligar o transistor. Quando a diferença de potencial entre a base e o emissor estiver com 5V, ou seja, quando a base estiver com 5V, o transistor está ligado. Quando a base estiver com 0V o transistor está desligado.

Na base a corrente pode ser bem pequena, então o resistor da base pode ser bem grande. O que importa é a voltagem entre a base e o emissor, e a corrente no geral é a mínima possível pra ligar o transistor.

Quando o transistor está ligado ele se comporta como um fio, deixando toda a corrente passar do coletor para o emissor. Lembre que a corrente é convencionada para ir do positivo para o negativo, apesar de os elétrons fazerem o caminho inverso. Por isso o nome é emissor, pois os elétrons vem dele, mas o sentido da corrente que foi convencionado é o contrário (mais detalhes no vídeo). Então quando o transistor está ligado ele permite passar uma corrente grande por ele, sem resistência, atuando como uma chave liga e desliga. A figura abaixo mostra esse caso:

<img src="/pages_data/{{page.repository}}/transistor2.png" style="opacity:0.7;width:70%;" alt="Transistor"/>

Então uma corrente pequena na base consegue deixar passar uma corrente grande pelo transistor. Mas em circuitos lógicos a corrente não é o que mais importa, e sim a voltagem. Essa questão de corrente grande é mais relacionado com o uso de transistores para amplificadores, porém para circuitos lógicos estamos interessados em fazer o transistor trabalhar como uma chave, o que será explicado melhor mais abaixo.

Um detalhe muito importante é que o transistor quando está ligado, apesar de se comportar como um fio, ele só permite passar corrente do coletor para o emissor, e não o contrário. Mas no exemplo da figura isso nunca ocorreria pois as voltagem estão fixas, e o positivo está no coletor, então a corrente sempre vai do coletor para o emissor.

Quando o transistor está desligado o efeito é que ele impede qualquer corrente de passar do coletor para o emissor. Então é como se a chave estivesse fechada, como mostra figura abaixo:

<img src="/pages_data/{{page.repository}}/transistor3.png" style="opacity:0.7;width:70%;" alt="Transistor"/>

Com o transistor desligado é como se o fio que está lidando no coletor fosse cortado, pois não passa corrente ali.

## Ligando uma Saída no Circuito

Para darmos alguma utilidade para os transistores que vimos acima, vamos conectar um fio acima do coletor, como na figura abaixo:

<img src="/pages_data/{{page.repository}}/transistor4.png" style="opacity:0.7;width:70%;" alt="Transistor"/>

Esse fio qualquer momento vai estar com 5V ou 0V e o restante do circuito estará conectado nele.

Agora temos que analisar o que acontece com a voltagem neste fio quando o transistor está ligado ou desligado.

Quando o transistor está desligado, ou seja, a base está com 0V, é como se o fio ligado no coletor estivesse desconectado. Desta forma o fio de saída que colocamos vai ficar com 5V, pois neste caso ele está ligado "diretamente" no *Vcc*. Existe a resistência, que neste caso não influencia, deixando assim o circuito posterior ligado diretamente no Vcc. A figura abaixo resume isso:

<img src="/pages_data/{{page.repository}}/transistor5.png" style="opacity:0.7;width:70%;" alt="Transistor"/>

Quando o transistor está ligado ele deixa passar toda a corrente, agindo como se fosse um fio. Ora, neste caso então o 0V passa pelo emissor e fica visível no coletor. Portanto o fio de saída neste caso fica com *0V*, como mostra a imagem abaixo:

<img src="/pages_data/{{page.repository}}/transistor6.png" style="opacity:0.7;width:70%;" alt="Transistor"/>

A figura abaixo reforça esse questão do circuito atuando como um fio e o 0V chegando na saída conectada no coletor.

<img src="/pages_data/{{page.repository}}/transistor7.png" style="opacity:0.7;width:70%;" alt="Transistor"/>

Pela figura acima vemos o motivo de existir o resistor do coletor. ***Como o 0V chega no coletor, se não tiver a resistência daria curto circuito, pois os 5V seriam ligados diretamente nos 0V, o que não pode acontecer***.

## Utilidade do Transistor

A partir do que vimos acima, notamos que o circuito se comporta como uma ***porta lógica NOT***, pois se a base estiver com 0V a saída é 5V, e se a base estiver com 5V a saída é 0V.

Esse fato vai permitir a criação de outras portas lógicas mais avançadas, como ***and***, ***or***, ***xor***, ***nand***, etc, que são as bases dos circuitos lógicos.

Portanto a utilidade do transistor é a criação de *portas lógicas*, porém os detalhes de como criar essas portas lógicas veremos no próximo episódio.
