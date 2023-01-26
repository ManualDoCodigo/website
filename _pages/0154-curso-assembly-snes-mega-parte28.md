---
layout: page
title: "Programando pra MEGA DRIVE. Aprendendo sobre os REGISTRADORES do 68000."
date: 2021/04/14
type: video
description: Neste episódio eu falo sobre os registradores do Mega Drive, principalmente os registradores da Cpu 68000. É muito importante conhecer todos os registradores da arquitetura que vamos trabalhar.
entry_number: 154
youtube_video_id: zJGLTHMGVD4
repository: 0154-curso-assembly-snes-mega-parte28
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte28/
---

## Registradores do 68000

<img src="/pages_data/{{page.repository}}/megareg1.jpg" style="opacity:0.8; width:100%;"/>

## Registradores de Dados

<img src="/pages_data/{{page.repository}}/megareg2.jpg" style="opacity:0.8; width:70%;"/>

São de propósito geral.

Permite manipulação de bytes, o que é útil para manipulação de texto.

A manipulação de bytes, words e longwords se dá pelo uso dos sufixos ".b", ".w" e ".l", respectivamente.

Quando um byte ou word é alterado, isso não modifica o restante do registrador.

<img src="/pages_data/{{page.repository}}/megareg3.jpg" style="opacity:0.8; width:50%;"/>
<img src="/pages_data/{{page.repository}}/megareg4.jpg" style="opacity:0.8; width:90%;"/>
<img src="/pages_data/{{page.repository}}/megareg5.jpg" style="opacity:0.8; width:50%;"/>
<img src="/pages_data/{{page.repository}}/megareg6.jpg" style="opacity:0.8; width:90%;"/>
<img src="/pages_data/{{page.repository}}/megareg7.jpg" style="opacity:0.8; width:50%;"/>
<img src="/pages_data/{{page.repository}}/megareg8.jpg" style="opacity:0.8; width:50%;"/>

Quando fazemos uma operação com words em um registrador de endereços, ocorre extensão de sinal.

<img src="/pages_data/{{page.repository}}/megareg9.jpg" style="opacity:0.8; width:60%;"/>

## Pinos de Endereço

<img src="/pages_data/{{page.repository}}/megareg10.jpg" style="opacity:0.8; width:80%;"/>

<img src="/pages_data/{{page.repository}}/megareg11.jpg" style="opacity:0.8; width:50%;"/>