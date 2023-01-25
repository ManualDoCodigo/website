---
layout: page
title: "Estudando o Snes por DENTRO com os Diagramas de Bloco e Esquemáticos."
date: 2020-06-06
type: video
description: Neste episódio eu falo mais sobre o hardware do Snes, mostrando os diagramas de bloco e o esquemático. Temos que conhecer bem o hardware que estamos trabalhando, então os diagramas ajudam muito nisso.
entry_number: 50
youtube_video_id: JYETQqjTYFA
repository: 0050-curso-assembly-snes-mega-parte2
has_code: false
has_p5: false
tags: [Assembly, Snes, Mega Drive, Romhacking,Esquemáticos]
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte2/

reference_links:
  - title: "forums nesdev - Why does Address Bus B and /WRAM connect to Cartridge?"
    url: "http://forums.nesdev.com/viewtopic.php?f=12&t=10376&sid=8e78102be650d8b4634b67d4cc5694cf"

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

O objetivo principal que temos é implementarmos aplicações para rodar no Snes e no Mega. Para isso é necessário entender razoavelmente bem os hardwares que estamos trabalhando. Para isso temos alguns diagramas que nos ajudam a entender melhor o hardware, como o diagrama de blocos, esquemáticos, fotos das placas, etc.

## Diagrama de blocos do Snes

Se quisermos ter uma noção mais alto nível do hardware é aí que entra o diagrama de blocos, pois ele dá uma visão geral dos principais elementos presentes no hardware.

Com o diagrama de blocos conseguimos identificar os principais dispositivos e como eles estão conectados. Se quisermos ir mais a fundo aí podemos analisar os esquemáticos, explicado mais abaixo.

<div class="info">
<img src="/assets/img/icons/snes1.gif">
<div style='display: block'>
<h4>Diagrama de Blocos</h4>
<p>Praticamente todas as placas que você for trabalhar tem um diagrama de blocos na documentação, pois ajuda a visualizar os blocos internos do hardware em mais alto nível. Sempre procure esse diagrama.</p>
</div>
</div>

A figura abaixo mostra o diagrama de blocos do Snes.

![block diagram snes](/pages_data/{{page.repository}}/block-diagram-snes.jpg "Diagrama de blocos do Snes")

Analisando a imagem conseguimos identificar os principais elementos do Snes. Nas seções abaixo eu descrevo melhor esses elementos maiores.

## Barramentos

O Snes possui 3 barramentos, sendo 2 de endereços, o *A-Bus* e o *B-Bus*, e um barramento de dados, o *Data Bus*.
Os barramentos são as conexões (fios) que ligam os diferentes elementos na placa.

<div class="info">
<img src="/assets/img/icons/megaman2.gif">
<div style='display: block'>
<h4>Barramentos</h4>
<p>O conjunto dos fios que são relacionados entre si são os barramentos. Por exemplo, os 24 fios de endereços do Mega e do Snes são os barramentos de endereços de cada console.</p>
</div>
</div>

Veremos em vídeos posteriores qual a função de cada barramento e como a troca de mensagens entres elementos ocorrem.

## Cpu Ricoh 5A22

Esta é a Cpu principal do Snes. No vídeo anterior eu citei que o Snes usa a Cpu compatível com o 65C816, porém os desenvolvedores do Snes colocaram o 65C816 em um encapsulamento junto com outras coisas. Então a cpu principal não apenas executa as instruções dos programas (jogos) mas também é responsável por outras tarefas, como Dma, gerenciamento dos controles, acesso aos barramentos, etc.
Portanto a Cpu Ricoh 5A22 é um chip que foi criado para o Snes que engloba a cpu 65C816 mais outras funcionalidades necessárias para o Snes.

Essa foi uma decisão de projeto para simplificar o hardware, e quando formos estudar os diagramas do Mega Drive veremos que lá é diferente.

Mais pra frente no curso a Cpu será bem mais detalhada. Por enquanto temos que ter essa noção.

## Working Ram

Essa é a memória Ram principal do Snes. Working Ram significa memória de trabalho, que é a memória de propósito geral disponível para o sistema. São como se fossem os chips de Ram que você instala em um computador. São *128KiB* de memória, localizados nos bancos $7e e $7f (isso será explicado mais pra frente).

Vemos que os três barramentos chegam na Wram.

## PPU (Picture Processing Unit)

A *PPU* é o chip que processa os gráficos. Fisicamente são dois chips, porém do lado do programador enxergamos a PPU como uma entidade única, então o fato de ser dividida em dois chips não faz diferença pro assembly.

A Vram, que é a memória de vídeo, possui 64KiB de tamanho e serve para armazenar os elementos gráficos que são mostrados na televisão. A Vram é dividida em dois chips de 32KiB cada.

A PPU será detalhada melhor no futuro.

No diagrama de blocos vemos também que o bloco que faz o processamento gráfico também possui outros chips que fazem a conversão dos sinais para os formatos de vídeo necessários para a comunicação com os aparelhos de TV. Porém essa parte do circuito não tem interface nenhuma com o software, então é algo posterior à PPU que não tem acesso direto com o software.

## Sound System

O sistema de som do Snes possui dois elementos principais, o Sony SPC700 e o Sound DSP. Ambos são os elementos responsáveis pela parte de som do Snes e serão detalhados no futuro quando forem usados em algum projeto que formos fazer. Por enquanto não é essencial para a introdução ao assembly.

Somado aos 2 chips de som citados acima temos 64KiB de Ram para o som.

O clock dos chips de som é diferente do clock principal e roda a 24.576MHz.

Assim como no PPU, existe também uma parte do circuito responsável pela interface de áudio com o mundo externo, como amplificadores, etc. Porém essa parte do circuito não tem interface com o software.

## Conector de Cartucho (Cartridge Connector)

O conector de cartuchos é onde encaixamos os nossos jogos. Esse conector possui todos os três barramentos e possui todos os pinos necessários para que haja a comunicação do hardware do cartucho com os demais elementos internos do Snes.

Mais detalhes do conector serão dados em vídeos futuros quando necessário.

## Cartucho

Os cartuchos que encaixamos no console possuem um hardware com diversos elementos. Ao longo da vida do Snes foram criados vários chips de expansão para o Snes que estão localizados internamente nos cartuchos. Isso foi um grande diferencial do Snes na época.

Mais detalhes serão dados em vídeos futuros.

O mais importante a se notar é que os chips de memória do cartucho (SRam e Rom) estão conectados nos barramentos do console, assim como a Wram por exemplo. Então entenda o cartucho como sendo mais um elemento conectado no barramento assim como todos os outros elementos citados acima.

## Cic

O Cic é um chip que faz a autenticação do cartucho. Dentro do console existe um chip que é o Master (mestre) e em cada cartucho deve haver um chip do Cic que é o Slave (escravo). Quando o console é ligado, existe uma comunicação entre os dois chips. Essa comunicação é paralela ao funcionamento do jogo, pois esses dois chips ficam ligados de forma independente no barramento do cartucho.

Caso o cartucho não tenha o Cic ou não seja o Cic correto, o console reinicia automaticamente e fica bloqueado.  Esse bloqueio ocorre pois o Cic no console está conectado a um chip de RESET no console (não mostrado no diagrama de blocos), e com isso faz o bloqueio do console caso encontrar algum problema.

A grande sacada da Nintendo é que apenas ela fabricava esse chip, e as empresas que fabricavam jogos tinham que comprar os chips da Nintendo, portanto apenas jogos originais podiam rodar no Snes. Isso foi feito para impedir jogos piratas de rodarem.

No final uma versão do software interno do Cic dos cartuchos acabou vazando e todo esse plano foi por água abaixo. Mas até que o sucesso deste mecanismo foi grande.

Existem páginas e vídeos na internet que contam toda essa história de forma detalhada.

## Controles

Como dito na parte da Cpu acima, o hardware que faz o gerenciamento dos controles está dentro da Cpu Ricoh 5A22.
A interface com os controles ficará clara quando iniciarmos com o assembly.

## Osciladores

O Snes possui um oscilador de 21.477MHz, que alimenta a Cpu, a PPU e está disponível no barramento do cartucho para uso por chips extras nos cartuchos.

## Conector de Expansão

O Snes também possui um conector de expansão de 28 pinos que serve para conectar hardwares externos que viessem a ser fabricados. No futuro farei um vídeo com mais detalhes e curiosidades sobre esse conector, mas por enquanto não importa em nada para o que queremos.

## Esquemáticos

Para ir mais a fundo nos detalhes do hardware é necessário ter em mão os esquemáticos. Os esquemáticos em geral mostram com muito mais detalhesas conexões entre os dispositivos pois todos os pinos são individualmente mostrados.

Existem vários pinos de controle que estão conectados entre os dispositivos e que geralmente não são mostrados em diagramas de blocos.

Estou colocando uma imagem do diagrama do Snes que poderemos usar futuramente quando começarmos a programar em assembly, para tirar alguma dúvida que vier a ocorrer.

<a href="/pages_data/{{page.repository}}/schematic-snes.png" target="_blank">
  <img src="/pages_data/{{page.repository}}/schematic-snes.png"/>
</a>


## Placa mãe do Snes

A foto abaixo mostra a placa mãe do Snes. É recomendado conhecer o hardware físico para ter uma visão geral do sistema em que estamos programando.
*Errata: a Vram são os dois chips de 32KiB localizados perto das PPUs. Na imagem está como "Wram".*

![motherboard snes](/pages_data/{{page.repository}}/motherboard-snes.jpg "Placa mãe Snes")
