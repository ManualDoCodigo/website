---
layout: page
title: "Instrução MOVE no MEGA DRIVE. Programando em Assembly."
date: 2021/07/28
type: video
description: Neste episódio começamos a aprender as instruções do console Mega Drive, iniciando com a instrução MOVE, que é uma das instruções mais, se não a mais, utilizadas em assembly.
entry_number: 201
youtube_video_id: IsWKk0Vec3w
repository: 0201-curso-assembly-snes-mega-parte37
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte37/
---

## Família de Instruções MOVE

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:50%;"/>

## Instrução MOVE

<img src="/pages_data/{{page.repository}}/img2.jpg" style="opacity:0.8; width:50%;"/>

## Instrução MOVEA

<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:50%;"/>

## Instrução MOVEQ

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:50%;"/>

## Tamanho das Instruções - Expansion Words

<img src="/pages_data/{{page.repository}}/img5.jpg" style="opacity:0.8; width:50%;"/>

## Instrução MOVE

<img src="/pages_data/{{page.repository}}/img6.jpg" style="opacity:0.8; width:50%;"/>

<div class="info">
<img src="/assets/img/icons/snes1.gif">
<div style='display: block'>
<h4>Instrução MOVE</h4>
<p>O move suporta apenas os registradores de dados. Se for usado um registrador de endereço o assembler converte para a instrução "movea".</p>
</div>
</div>

## Instrução MOVEA

<img src="/pages_data/{{page.repository}}/img7.jpg" style="opacity:0.8; width:50%;"/>

<div class="info">
<img src="/assets/img/icons/snes1.gif">
<div style='display: block'>
<h4>Instrução MOVEA</h4>
<p>No movea o destino é sempre um registrador de endereços.</p>
</div>
</div>


## Instrução MOVEQ

<img src="/pages_data/{{page.repository}}/img8.jpg" style="opacity:0.8; width:50%;"/>

<div class="info">
<img src="/assets/img/icons/snes1.gif">
<div style='display: block'>
<h4>Instrução MOVEQ</h4>
<p>Preencher.</p>
</div>
</div>

## Status Register para o Move e MoveQ

<img src="/pages_data/{{page.repository}}/img9.jpg" style="opacity:0.8; width:50%;"/>

<div class="info">
<img src="/assets/img/icons/snes1.gif">
<div style='display: block'>
<h4>Status Register</h4>
<p>As flags "n" e "z" são setadas de acordo com o valor da operação. As flags "v" e "c" sempre são zeradas.</p>
</div>
</div>

## Status Register para o Movea

<img src="/pages_data/{{page.repository}}/img10.jpg" style="opacity:0.8; width:50%;"/>

<div class="info">
<img src="/assets/img/icons/snes1.gif">
<div style='display: block'>
<h4>Status Register</h4>
<p>O Movea não modifica a Status Register.</p>
</div>
</div>

## Números Negativos

<img src="/pages_data/{{page.repository}}/img11.jpg" style="opacity:0.8; width:50%;"/>