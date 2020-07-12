---
layout: page
title: "Curso de Programação Assembly com Snes e Mega Drive. Parte 1"
date: 2020-05-11
type: video
description: Este é o primeiro vídeo de uma série onde estudaremos Assembly utilizando os videogames Snes e Mega Drive.
entry_number: 24
youtube_video_id: WoOVbPnpyjk
repository: 0024-curso-assembly-snes-mega-parte1
has_code: false
has_p5: false
tags: [Assembly, Snes, Mega Drive, Romhacking]
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte1/
---

### Introdução

Este é o primeiro vídeo/artigo do curso de assembly com Snes e Mega Drive que eu estou fazendo.  
Neste primeiro vídeo o objetivo é dar uma visão geral dos dois consoles, pois é importante conhecer bem o hardware para que possamos programar em assembly aquilo que queremos no sistema.  

### Processadores

O Snes possui uma Cpu baseada no Western 65C816. Em vídeo futuros detalharei melhor essa cpu e veremos que a Nintendo encapsulou o 65C816 junto com outras funcionalidades e no final a cpu usada é uma Ricoh 5A22. Mais detalhes serão dados no futuro.  
Já o Mega possui um Motorola 68000 como cpu principal. No caso do Mega nenhuma modificação foi feito para a Cpu, portanto na placa está soldado um 68000 padrão da Motorola. As diferenças nessas questões serão explicadas em vídeos futuros.  
No geral o 68000 possui uma arquitetura bem mais moderna que o 65C816 e também possui um clock bem mais alto. Mas no futuro veremos que um clock mais rápido não necessariamente indica que o processador é mais rápido.  

### Memória Ram

O Snes possui 128KiB de Ram contra 64MiB do Mega Drive. Esta é uma boa vantagem do Snes.

### Vídeo

O Snes possui um chip de vídeo bem interessante com vários modos gráficos. Esses modos diferem no número de planos, cores, resolução, etc. O sétimo modo (Mode-7) é o mais diferente e permite um gráfico pseudo 3D bem legal, o que é usado em jogos como Mario Kart por exemplo. O Snes possui 64KiB de Vram (Video Ram).  
Já o chip de vídeo do Mega é mais limitado e possui bem menos modos, porém roda em uma frequência maior. Isso será mais detalhado no futuro. O Mega também possui 64KiB de Vram.

### Sistema de Áudio

O sistema de áudio do Snes é mais poderoso que o do Mega, o que pode ser claramente evidenciado pelas músicas. O Snes possui dois chips dedicados à parte sonora. O SPC700 é um projeto da Sony, e tem uma interface muito simples e poderosa. Também possui um DSP (Digital Signal Processor) para efeitos sonoros. Possui também 64KiB de Ram para o áudio.  
O Mega possui 3 elementos dedicados ao som, o processador Z80, um chip de FM e um PSG que fica localizado dentro do chip de vídeo. Também possui 64KiB de Ram para o áudio.
