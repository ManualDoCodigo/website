---
layout: page
title: "O Mega Drive é 64 BITS? E o SNES? Entre e Veja a Resposta."
date: 2021/09/15
type: video
description: Neste episódio mostro como é possível realizar operações de 64bits com o Mega Drive.
entry_number: 213
youtube_video_id: dZvp6X_dRuc
repository: 0213-curso-assembly-snes-mega-parte42
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte42/
---

## Addx/Subx

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:50%;"/>

Suporta apenas registrador com registrador ou memória com memória com pré-decremento.

O pré-decremento faz sentido pois assim apontamentos automaticamente para o novo dado a ser somado sequencialmente na memória.

O addx soma dois dados junto com o valor da flag X da status register. Com isso conseguimos fazer somas com 64 bits, 128 bits, etc...

Suporta os 3 tipos de tamanho.

Se o resultado for 0 não altera a flag Z, pois assim caso os blocos de dados anteriores tivessem gerado um resultado diferente de zero, o valor total dos 64bits (ou 128, etc) não seria 0, portanto a flag Z não deveria ser setada.

É necessário setar a flag Z para 1 antes de começar as contas, pois assim caso todas as somas sejam 0 a flag Z vai continuar em 1, gerando o resultado correto. Outra opção é fazer com que a primeira soma use um "add" normal, pois assim as flags são geradas e propagadas corretamente nas somas posteriores com o addx.

O subx funciona da mesma forma, porém a flag X é subtraída.

## Contas

<img src="/pages_data/{{page.repository}}/img2.jpg" style="opacity:0.8; width:50%;"/>

## Contas Hexadecimal

<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:50%;"/>

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:50%;"/>

<img src="/pages_data/{{page.repository}}/img5.jpg" style="opacity:0.8; width:50%;"/>

<img src="/pages_data/{{page.repository}}/img6.jpg" style="opacity:0.8; width:50%;"/>

A Flag Z tem que ficar com 0, mesmo que a última operação tenha gerado um zero, pois o valor total dos 64 bits é diferente de zero.

<img src="/pages_data/{{page.repository}}/img7.jpg" style="opacity:0.8; width:50%;"/>

A Flag Z tem que ficar com 1.

## Neg/Negx

<img src="/pages_data/{{page.repository}}/img8.jpg" style="opacity:0.8; width:50%;"/>

O neg faz o complemento de 2 do dado no registrador ou memória.

A instrução neg subtrai o dado de 0, que é o mesmo que fazer o complemento de 2.

O negx sutrai de 0 o valor do dado e também o valor da flag X da status register.

Suporta os 3 tipos de tamanho.

Se o resultado for 0 não altera a flag Z, pois assim caso os blocos de dados anteriores tivessem gerado um resultado diferente de zero, o valor total dos 64bits (ou 128, etc) não seria 0, portanto a flag Z não deveria ser setada.

É necessário setar a flag Z para 1 antes de começar as contas, pois assim caso todas as somas sejam 0 a flag Z vai continuar em 1, gerando o resultado correto. Outra opção é fazer com que a primeira soma use um "neg" normal, pois assim as flags são geradas e propagadas corretamente nas somas posteriores com o negx.

<img src="/pages_data/{{page.repository}}/img9.jpg" style="opacity:0.8; width:50%;"/>