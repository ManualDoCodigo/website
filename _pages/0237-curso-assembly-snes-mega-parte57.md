---
layout: page
title: "O que é um endereço de memória no SNES?"
date: 2022/10/04
type: video
description: Neste episódio vamos aprender sobre o modo de endereçamento absoluto da cpu 68000 do Mega Drive. 
entry_number: 237
youtube_video_id: 7lQSQk4aFUE
repository: "0237-curso-assembly-snes-mega-parte57"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte57/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste episódio vamos aprender sobre o que é um endereço de Snes no baixo nível.

Pra começar, temos que relembrar o que aprendemos sobre os barramentos do Snes. Vamos ver isso em conjunto com o esquemático do console. Em seguida vamos ver mais detalhes sobre alguns registradores da Cpu, principalmente os registradores *PBR* e *DBR*, que estão intimamente ligados com essas questões relativas a endereços.

## Barramentos do Snes

Na figura abaixo temos o diagrama de blocos do Snes, que já vimos em um episódio lá no começo da série.

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:100%;"/>

O que estamos interessados no momento são os 3 barramentos que o Snes possui, o *barramento de endereços A* (***Address Bus-A***), o *barramento de endereços B* (***Address Bus-B***) e o *barramento de Dados* (***Data Bus***).

Na cpu 5A22 do Snes temos os 3 barramentos conectados no chip, como mostra a imagem abaixo:

<img src="/pages_data/{{page.repository}}/img7.jpg" style="opacity:0.8; width:70%;"/>

Então boa parte dos pinos da Cpu correspondem aos pinos desses 3 barramentos.

##### Address Bus-A

O *barramento de endereços A* é um barramento de 24 bits que a Cpu utiliza para acessar todo o mapa de memória do Snes. *É esse barramento que estamos interessados no momento*.

<div class="info">
<img src="/assets/img/icons/mario1.gif">
<div style='display: block'>
<h4>Três barramentos</h4>
<p>O Snes possui 3 barramentos, mas nesse episódio estamos interessados no barramento de endereços A, que é o que contém os endereços que manipulamos quando programamos em assembly.</p>
</div>
</div>

Como este barramento é de 24 bits, ele pode endereçar os 16MB de memória do Snes, o que já foi discutido em um episódio anterior e que está resumido na imagem abaixo:

<img src="/pages_data/{{page.repository}}/img2.jpg" style="opacity:0.8; width:100%;"/>

Então quando estamos programando uma aplicação pra Snes, os endereços que usamos nas intruções na quase totalidade dos casos estão entrando no barramento de endereços A.

##### Address Bus-B

O *barramento de endereços B* é um barramento de 16 bits que a Cpu utiliza para acessar registradores de I/O do Snes, e é utilizado principalmente para a comunicação com a PPU e a APU. Falaremos mais sobre isso em um episódio futuro.

##### Data Bus

O *barramento de dados* é um barramento de 8 bits que a Cpu utiliza para enviar e receber dados dos vários elementos do Snes. Todos os dados que trafegam entre o cartucho, Ram, PPU, APU, etc, passam por esse barramento.

## Snes trabalha com bancos de memória

Como já vimos muitas vezes anteriormente, o Snes trabalha com bancos de memória. Então quando programamos em assembly, temos que ter em mente que os endereços que usamos na maioria das vezes são endereços relativos a um banco de memória específico. Os bancos tem 64KB de tamanho, e o Snes possui 256 bancos de memória, então geralmente estamos trabalhando com endereços de 16 bits que estão dentro de um banco de memória específico. É possível utilizar endereços de 24 bits, como veremos em episódios futuros, mas no geral, os endereços que usamos são de 16 bits.

Porém se analizamos o esquemático do Snes vemos que temos 24 pinos de endereços, e não 16. Então como é que funciona isso?

<a href="/pages_data/0050-curso-assembly-snes-mega-parte2/schematic-snes.png" target="_blank">
  <img src="/pages_data/0050-curso-assembly-snes-mega-parte2/schematic-snes.png"/>
</a>

A resposta é que apesar de trabalharmos com bancos de 64KB, na hora da Cpu utilizar o barramento é formado um endereço de 24 bits, e esta lógica veremos agora.

## Registradores de endereçamento

A figura abaixo mostra os registradores do Snes.

<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:100%;"/>

O Snes possui 3 registradores que são responsáveis por fazer a lógica de endereçamento, o *PC*, o *PBR* e o *DBR*. Vamos ver mais detalhes sobre eles.

## Etapas de uma instrução

Já vimos no passado que uma instrução precisa de vários ciclos de clock para ser executada, e o número de ciclos depende da instrução. 

Uma coisa que todas as instruções tem em comum é que a Cpu precisa primeiro ler o código da instrução do cartucho (ou da Ram), e depois executar a instrução. 

Para que a Cpu possa ler o código da instrução, ela precisa saber o endereço da instrução. Então este é um tipo de endereço. 

Durante a execução da instrução a Cpu pode precisar ler ou escrever dados em algum lugar da memória do sistema, e pra isso ela também precisa saber o endereço de leitura e/ou escrita. Então estes são outros tipos de endereços.

Então temos 3 tipos de endereços que a Cpu precisa saber:

    * Endereço da instrução
    * Endereço de leitura de dados
    * Endereço de escrita de dados

E como a Cpu monta os endereços que ela coloca no barramento?

<div class="info">
<img src="/assets/img/icons/megaman2.gif">
<div style='display: block'>
<h4>Instruções vs Dados</h4>
<p>A cpu do Snes separa internamente a localização das instruções sendo executadas dos dados sendo lidos ou gravados. Então a cpu pode estar executando instruções em um banco e acessando dados em outro banco.</p>
</div>
</div>

##### Fetch da instrução

Quando a cpu vai pegar a instrução na memória, ela precisa saber o banco de memória da qual ela está lendo as intruções. Isso é indicado pelo registrador *PBR* (Program Bank Register). Já o endereço dentro do banco é indicado pelo registrador *PC* (Program Counter). Então o endereço da instrução é formado pela combinação do registrador *PC* com o registrador *PBR*, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:70%;"/>

##### Acesso a dados

Quando a cpu vai ler ou escrever dados na memória, ela precisa saber o banco de memória da qual ela está lendo ou gravando os dados. Isso é indicado pelo registrador *DBR* (Data Bank Register). Já o endereço dentro do banco depende da instrução, e o endereço depende do modo de endereçamento da instrução. 

Então o endereço de leitura ou escrita de dados é formado pela combinação do registrador *DBR* com o endereço da instrução, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img5.jpg" style="opacity:0.8; width:70%;"/>

## Endereço no barramento

Dado o que foi explicado anteriormente, o que a cpu do Snes coloca nos 24 pinos do barramento ou é a junção do registrador *PC* com o registrador *PBR*, ou é a junção do registrador *DBR* com o endereço gerado pela instrução.

<img src="/pages_data/{{page.repository}}/img6.jpg" style="opacity:0.8; width:70%;"/>

Na imagem acima vemos que ao escolher o endereço que vai no barramento a cpu tem que escolher entre o endereço da intrução e o endereço do dado. Coloquei um Mux pra indicar esta escolha. 
