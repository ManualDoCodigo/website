---
layout: page
title: "Como Somar Números no Mega Drive. Aprenda Programação com Consoles Antigos."
date: 2021/08/27
type: video
description: Neste episódio eu explico as instruções aritméticas da cpu Motorola 68000 do Mega Drive. Falo principalmente das instruções de soma (add) e subtração (sub).
entry_number: 208
youtube_video_id: mmMbM44h49k
repository: 0208-curso-assembly-snes-mega-parte40
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte40/
---

## Add/Sub

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:50%;"/>

No add, um dos parâmetros tem que ser um registrador de dados. As figuras ao lado mostram os dois casos possíveis.

O destino não pode ser um registrador de endereço. Para isso existe a instrução "adda".

Não é permitido somar memória com memória. Portanto é necessário mover o dado para um registrador antes da soma.

Suporta os 3 tipos de tamanho.

Não permite somar imediado com memória. Para isso existe o "addi".

## Adda/Suba

<img src="/pages_data/{{page.repository}}/img2.jpg" style="opacity:0.8; width:50%;"/>

Não opera em bytes, e quando tamanho word é usado, o resultado tem extensão de sinal para 32 bits.

O destino sempre tem que ser um registrador de endereço.

Usada para calcular o endereço de um item em uma estrutura de dados complexa.

As flags não são afetadas.

## Addi/Subi

<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:50%;"/>

Permite somar imediato com memória, ao contrário do "add" normal.

## Addq/Subq

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:50%;"/>

Permite somar números de 1 a 8. A razão é a velocidade, pois não precisa de extension word.

Suporta registrador de endereço no destino.

s