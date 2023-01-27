---
layout: page
title: "Introdução aos PULOS em Assembly de Snes e Mega Drive."
date: 2022/02/10
type: video
description: Neste episódio começo a parte de branching em assembly. É com esse tipo de instrução que conseguimos fazer if, else, for, while, rotinas, etc.
entry_number: 224
youtube_video_id: pYYPy8FjQ8E
repository: "0224-curso-assembly-snes-mega-parte48"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte48/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

A partir de agora vamos começar a entrar na parte de *branchs* e *jumps*, que vão nos permitir criar código mais complexos, criando *ifs*, *loops*, *switchs*, *funções*, etc.
Este episódio é apenas a introdução onde falarei sobre *uncondition branchs*, ou *branchs sem condição*, que são as formas mais simples dessa família de instruções.

Falarei também sobre *Labels*, que são marcações que servem para referenciarmos endereços específicos. Dessa forma usamos nomes ao invés de endereços reais, o que seria muito complicado de se gerenciar.

## Endereços de Memória

Ao longo da série já estudamos sobre endereços de memória, indo a fundo dentro da Cpu e explicando os mapas de memória do Snes e do Mega Drive.

Neste parte de branchs, o que é necessário saber é que cada instrução possui um endereço de memória, e a Cpu vai executando as instruções uma após a outra, incrementando o endereço do registrador *PC* (Program Counter) a cada instrução executada. As instruções podem ter tamanhos diferentes, dependendo da instrução e do modo de endereçamento usado (isso será explicado melhor em episódios futuros).

Já expliquei também que nesses consoles não existe o conceito de arquivo, então dentro da ROM os blocos de dados estão todos misturados. Desta forma existem blocos de instruções em várias partes da ROM, e essas instruções de branch e jump são as que permitem pularmos para as várias partes do mapa de memória.

## Instruções de Branch e Jump

<img src="/pages_data/{{page.repository}}/memory.jpg" style="opacity:0.8;"/>
<img src="/pages_data/{{page.repository}}/branch1.jpg" style="opacity:0.8;"/>
<img src="/pages_data/{{page.repository}}/label.jpg" style="opacity:0.8;"/>
<img src="/pages_data/{{page.repository}}/branch2.jpg" style="opacity:0.8;"/>
<img src="/pages_data/{{page.repository}}/label2.jpg" style="opacity:0.8;"/>
<img src="/pages_data/{{page.repository}}/statusmega.jpg" style="opacity:0.8;"/>

## BRA

<img src="/pages_data/{{page.repository}}/bra.jpg" style="opacity:0.8;"/>

Geralmente é usada apenas com Label, pois não faz muito sentido colocar um número relativo fixo, uma vez que se adicionar novas intruções esse número mudará.

Pode-se usar .b ou .w. O que difere é a quantidade de bytes que a instrução pode pular pra frente ou para trás. No 68000 não tem .l

Se o endereço de destino tiver menos de 128 bytes de distância, use .b pois fica mais rápido

Se for .w, o segundo byte da instrução fica com o valor 0. 

Se o destino for uma instrução adjacente, então o Displacement seria 0, portanto nesta caso fica .w por padrão, mesmo se for usado .b. É só um detalhe interno e curiosidade, pois na prática não importa.

## JMP

<img src="/pages_data/{{page.repository}}/jmp.jpg" style="opacity:0.8;"/>

Geralmente é usada com um label, registrador de endereço ou um endereço absoluto, porém a instrução aceita alguns modos de endereçamento.

Nenhuma flag é alterada por esta instrução.

Não tem opção de tamanho pois não faz sentido para esta instrução.

<img src="/pages_data/{{page.repository}}/statussnes.jpg" style="opacity:0.8;"/>

## BRA Snes

<img src="/pages_data/{{page.repository}}/bra-snes.jpg" style="opacity:0.8;"/>

A instrução "bra" é um pulo relativo, e o parâmetro passado tem que ter apenas 1 byte de tamanho, e é tratado como um número com sinal. Portanto a distância do salto fica limitada a -128 até +127 bytes em relação à posição atual.

Esta instrução não altera nenhuma flag.

Como o salto é relativo, esta instrução é realocável. Isso significa que podemos mover o bloco de código da qual ela faz parte para outro local e o código vai continuar funcionando. Isso não acontece com o "jmp", uma vez que ele para um endereço absoluto, então se mudar o código de lugar pode ser necessário alterar o endereço.

<img src="/pages_data/{{page.repository}}/bra-bass.jpg" style="opacity:0.8;"/>
<img src="/pages_data/{{page.repository}}/jmp-snes.jpg" style="opacity:0.8;"/>
<img src="/pages_data/{{page.repository}}/jmp-bass.jpg" style="opacity:0.8;"/>