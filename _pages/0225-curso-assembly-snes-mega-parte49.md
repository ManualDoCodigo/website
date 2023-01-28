---
layout: page
title: "Comparando coisas no SNES e no MEGA DRIVE."
date: 2022/05/09
type: video
description: Neste episódio falo sobre as instruções de comparação, que estão entre as mais importantes pra entender programação assembly.
entry_number: 225
youtube_video_id: 5ldeNV1cLM0
repository: "0225-curso-assembly-snes-mega-parte49"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte49/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste episódio eu mostrarei como criar 

## 68000 CMP Family

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:50%;"/>

No cmp o destino é sempre um registrador de dados.

No cmpa o destino é sempre um registrador de dados e não tem acesso .b.

O cmpi é o único que aceita um endereço efetivo como destino.

O cmpm só aceita o modo de endereçamento com registrador de endereços com pós incremento.

<img src="/pages_data/{{page.repository}}/cmp2.jpg" style="opacity:0.8; width:50%;"/>

## Cmp no Snes

<img src="/pages_data/{{page.repository}}/cmp3.jpg" style="opacity:0.8; width:50%;"/>

Esses três instruções suportam vários modos de endereçamento.
Em dúvida sempre olhe o arquivo de arquitetura no Bass.

As instruções são afetadas pelo modo da cpu, 8 bits ou 16 bits.