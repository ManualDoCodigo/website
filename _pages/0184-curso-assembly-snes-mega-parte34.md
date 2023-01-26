---
layout: page
title: "MAPA DE MEMÓRIA DO SNES. Fundamental para Programação neste Console."
date: 2021/06/18
type: video
description: Neste episódio eu explico o mapa de memória do Snes. O mapa de memória do Snes é um pouco mais complexo que o do Mega Drive devido ao fato da Cpu do Snes trabalhar com bancos.
entry_number: 184
youtube_video_id: gJ8XkMSQ7Rc
repository: 0184-curso-assembly-snes-mega-parte34
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte34/
---

## Bancos de Memória

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:30%;"/>

<div class="info">
<img src="/assets/img/icons/mario1.gif">
<div style='display: block'>
<h4>Bancos de Memória</h4>
<p>O Super Nintendo trabalha com bancos de memória de 64KB. Como o espaço de endereçamento é de 16MB, temos 256 bancos, numerados de 0x00 a 0xff.</p>
</div>
</div>

<img src="/pages_data/{{page.repository}}/img2.jpg" style="opacity:0.8; width:100%;"/>
<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:100%;"/>

## Banco de ROM

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:30%;"/>

<div class="info">
<img src="/assets/img/icons/mario1.gif">
<div style='display: block'>
<h4>Banco de ROM</h4>
<p>Neste tipo de banco todo o espaço é reservado para dados de jogo (ROM).</p>
</div>
</div>

## Banco de WRAM

<img src="/pages_data/{{page.repository}}/img5.jpg" style="opacity:0.8; width:30%;"/>

<div class="info">
<img src="/assets/img/icons/mario1.gif">
<div style='display: block'>
<h4>Banco de WRAM</h4>
<p>Neste tipo de banco todo o espaço é reservado para a RAM do console (WRAM). Como o Snes possui 128KB de WRAM, temos dois bancos reservados para a WRAM, os bancos 0x7e e 0x7f.</p>
</div>
</div>

## Banco de Sistema

<img src="/pages_data/{{page.repository}}/img6.jpg" style="opacity:0.8; width:30%;"/>

<div class="info">
<img src="/assets/img/icons/mario1.gif">
<div style='display: block'>
<h4>Banco de Sistema</h4>
<p>Neste tipo de banco o espaço é dividido em dois blocos de 32KB. Os 32KB superiores são reservados para ROM. Os 32KB inferiores são reservados para os registradores e outras partes do sistema, incluindo a SRAM.</p>
</div>
</div>

## Região do Sistema

<img src="/pages_data/{{page.repository}}/img7.jpg" style="opacity:0.8; width:70%;"/>

<div class="info">
<img src="/assets/img/icons/mario1.gif">
<div style='display: block'>
<h4>Região do Sistema</h4>
<p>Essa região possue registradores e os primeiros 8KB da memória Ram do banco 0x7e. O restante do espaço é sem uso ou reservado para certas coisas, como chips extras e SRAM. Alguns ranges possuem velocidades diferentes.</p>
</div>
</div>

## Quadrantes

<img src="/pages_data/{{page.repository}}/img8.jpg" style="opacity:0.8; width:100%;"/>

## Quadrante 4

<img src="/pages_data/{{page.repository}}/img9.jpg" style="opacity:0.8; width:40%;"/>

<div class="info">
<img src="/assets/img/icons/mario1.gif">
<div style='display: block'>
<h4>Quadrante 4</h4>
<p>O quadrante 4 é o mais simples. Todos os bancos são "Bancos de Rom". Então os 4MB desta região são destinados 100% a Rom.</p>
</div>
</div>

## Quadrantes 1 e 3

<img src="/pages_data/{{page.repository}}/img10.jpg" style="opacity:0.8; width:90%;"/>

<div class="info">
<img src="/assets/img/icons/mario1.gif">
<div style='display: block'>
<h4>Quadrantes 1 e 3</h4>
<p>Os quadrantes 1 e 3 possuem apenas "Bancos de Sistema".</p>
</div>
</div>

## Quadrante 2

<img src="/pages_data/{{page.repository}}/img11.jpg" style="opacity:0.8; width:40%;"/>

<div class="info">
<img src="/assets/img/icons/mario1.gif">
<div style='display: block'>
<h4>Quadrantes 1 e 3</h4>
<p>O quadrante 2 é o mais diferente. Ele é quase igual ao quadrante 4, porém os bancos 0x7e e 0x7f são os bancos onde se encontram os 128KB  da WRAM.</p>
</div>
</div>

<img src="/pages_data/{{page.repository}}/img12.jpg" style="opacity:0.8; width:100%;"/>
<img src="/pages_data/{{page.repository}}/img13.jpg" style="opacity:0.8; width:100%;"/>
<img src="/pages_data/{{page.repository}}/img14.jpg" style="opacity:0.8; width:100%;"/>