---
layout: page
title: "Matemática em Jogos de Snes. Começou a Complicar!"
date: 2021/08/30
type: video
description: Neste episódio eu falo sobre algumas das instruções aritméticas do Snes, como soma, subtração, incremento e decremento.
entry_number: 209
youtube_video_id: SZHr_YH877s
repository: 0209-curso-assembly-snes-mega-parte41
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte41/
---

## Adc - Snes

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:50%;"/>

A soma é feita junto com a flag carry para permitir soma de números longos (maiores que 16 bits).

É muito comum aparecer uma instrução "clc" antes do "adc", para que a flag carry não influencie na soma.

## Sbc - Snes

<img src="/pages_data/{{page.repository}}/img2.jpg" style="opacity:0.8; width:50%;"/>

A lógica da flag carry aqui é invertida. Se a carry for 1 isso indica que não teve empréstimo e a subtração ocorre de forma "normal". Se a flag carry for 0 então houve empréstimo e é subtraído 1 do resultado.

É feito assim por na Cpu do Snes só existe circuito pra soma. Então pra subtrair tem que ser feito uma soma com o complemento de 2 do número. Como a cpu considera o carry pra fazer com de multi precisão, a cpu faz o "not" do valor, transformando ele em complemento de 1, o que seria o complemento de 2 menos 1. Por isso que temo que usar a "sec" antes da subtração, pois isso deixaria o número em complemento de 2 e a soma seria "normal", caso contrário a soma seria com o complemento de 1, o que iria subtrair o 1 que veio de empréstimo. Confuso pra quem está começando, eu sei.

## Subtração

<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:50%;"/>

## Inc/Dec - Snes

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:50%;"/>

Incrementa o A ou uma variável na memória.

O "inc" sem parâmetros incrementa o A. Com parâmetro incrementa o dado na memória.

## inx/iny/dex/dey - Snes

<img src="/pages_data/{{page.repository}}/img5.jpg" style="opacity:0.8; width:50%;"/>

Incrementa ou decrementa o X/Y.

<img src="/pages_data/{{page.repository}}/img6.jpg" style="opacity:0.8; width:50%;"/>
