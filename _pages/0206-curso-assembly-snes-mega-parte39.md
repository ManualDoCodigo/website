---
layout: page
title: "Assembly de Snes. Vamos Aprender Várias Instruções. Movendo Dados."
date: 2021/08/11
type: video
description: Neste vídeo começo a falar sobre as instruções do Snes, inicialmente nas instruções de movimentação de dados, fazendo uma comparação com as instruções do Mega Drive.
entry_number: 206
youtube_video_id: 6IzgQz9TWBc
repository: 0206-curso-assembly-snes-mega-parte39
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte39/
---

## Família de Instruções MOVE no Snes

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:50%;"/>

## Instrucões Load e Store

<img src="/pages_data/{{page.repository}}/img2.jpg" style="opacity:0.8; width:50%;"/>

As instruções de Load carregam imediatos ou dados da memória para os registradores A, X e Y.

As instruções de Store copiam o conteúdo dos registradores A, X e Y para um endereço na memória.

O acumulador é o registrador que suporta o maior número de modos de endereçamento.

Na Status Register apenas as flags "n" e "z" são modificadas pelas instruções de Load. As instruções de Store não modificam a Status Registes, diferente do que acontece no Mega Drive.

## Instrucões de Transferência

<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:50%;"/>

As instruções e transferência copiam dados de um registrador para outro registrador.

Na Status Register apenas as flags "n" e "z" são modificadas pelas instruções de transferência.

## Stack (Pilha)

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:50%;"/>
<img src="/pages_data/{{page.repository}}/img5.jpg" style="opacity:0.8; width:50%;"/>
<img src="/pages_data/{{page.repository}}/img6.jpg" style="opacity:0.8; width:50%;"/>

