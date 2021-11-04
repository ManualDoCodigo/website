---
layout: page
title: "Criando Portas Lógicas com Transistores. Curso de Assembly. Parte 5"
date: 2020-06-30
type: video
description: Neste vídeo eu continuo o assunto do vídeo anterior, mostrando como criar portas lógicas usando transistor. Isso é importante pra saber como os circuitos lógicos dentro dos processadores funcionam.
entry_number: 65
youtube_video_id: _nIOzpSLS8o
repository: 0065-curso-assembly-snes-mega-parte5
has_code: false
has_p5: false
tags: [Assembly, Snes, Mega Drive, Romhacking, Portas Lógicas, Transistor]
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte5/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste episódio eu vou mostrar como criar portas lógicas usando transistores. As portas lógicas são importantes para saber como os circuitos lógicos dentro dos processadores funcionam.
Elas são os blocos fundamentais para a criação de cpus e circuitos lógicos.

## Porta NOT

A porta not é uma porta lógica que inverte o valor do sinal. Se o sinal for 1, a porta retorna 0, se for 0, a porta retorna 1.
A criação da porta not é simples, basta criar um transistor e ligar o sinal de entrada ao transistor.
Já expliquei como essa porta lógica funciona no episódio passado.

<img src="/pages_data/{{page.repository}}/not.png" alt="Porta Lógica" style="opacity:0.7;width:70%;"/>

## Porta AND

A porta And é uma porta lógica que retorna 1 se todos os sinais de entrada forem 1. Se pelo menos um sinal for 0, a porta retorna 0.
A figura abaixo mostra a criação da porta And.
Se qualquer um dos sinais de entrada for 0, não passará corrente nos transistores e a saída ficará como se estivesse conectada no terra (0V).

<img src="/pages_data/{{page.repository}}/and.png" alt="Porta Lógica" style="opacity:0.7;width:70%;"/>

## Porta NAND

A porta Nand retorna 0 se todos os sinais de entrada forem 1. Se pelo menos um sinal for 0, a porta retorna 1.
A figura abaixo mostra a criação da porta Nand.
A lógica é a mesma da porta And, porém invertida. Apenas a saída muda de lugar, então se qualquer um dos sinais de entrada for 0, não passará corrente nos transistores e a saída ficará como se estivesse conectada no *Vcc* (5V).

<img src="/pages_data/{{page.repository}}/nand.png" alt="Porta Lógica" style="opacity:0.7;width:70%;"/>

## Porta OR

A porta Or é uma porta lógica que retorna 1 se pelo menos um sinal de entrada for 1. Se todos os sinais forem 0, a porta retorna 0.
A figura abaixo mostra a criação da porta Or.
A lógica é um pouco mais complexa pois as conexões são entrelaçadas, mas seguindo o fluxo da corrente vemos que a saída só fica 0 se todos os sinais forem 0.

<img src="/pages_data/{{page.repository}}/or.png" alt="Porta Lógica" style="opacity:0.7;width:70%;"/>

## Porta NOR

A porta Nor é uma porta lógica que retorna 0 se pelo menos um sinal de entrada for 1. Se todos os sinais forem 0, a porta retorna 1.
A figura abaixo mostra a criação da porta Nor.
A lógica é a mesma da porta Or, porém invertida. Apenas a saída muda de lugar, então se todos os sinais forem 0, não passará corrente nos transistores e a saída ficará como se estivesse conectada no *Vcc* (5V).

<img src="/pages_data/{{page.repository}}/nor.png" alt="Porta Lógica" style="opacity:0.7;width:70%;"/>

A figura abaixo é uma outra forma de representar a porta Nor, só que mais simples, com apenas um transistor.

<img src="/pages_data/{{page.repository}}/nor2.png" alt="Porta Lógica" style="opacity:0.7;width:70%;"/>

