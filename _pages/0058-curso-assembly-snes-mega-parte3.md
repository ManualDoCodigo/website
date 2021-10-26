---
layout: page
title: "Diagramas do Mega Drive. Curso de Assembly. Parte 3"
date: 2020-06-19
type: video
description: Nesta parte 3 do curso falo mais sobre o hardware do Mega Drive, mostrando os diagramas de bloco e o esquemático. Faço uma comparação com o Snes apontando as diferenças e similaridades.
entry_number: 58
youtube_video_id: Sx5K9HaIZt4
repository: 0058-curso-assembly-snes-mega-parte3
has_code: false
has_p5: false
tags: [Assembly, Snes, Mega Drive, Romhacking]
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte3/

reference_links:
  - title: "Could you theoretically build a MegaDrive/Genesis?"
    url: "https://forums.sonicretro.org/index.php?threads/could-you-theoretically-build-a-megadrive-genesis.33686/"
  - title: "forums nesdev - AtariAge CPU comparison"
    url: "https://forums.nesdev.com/viewtopic.php?f=12&t=14169&sid=aa8beac145c40b62a1fdeec97034af61&start=75"
  - title: "Mega Drive / Genesis"
    url: "https://www.copetti.org/projects/consoles/mega-drive-genesis/"
  - title: "Workings of the Mega Drive: Bus Interactions"
    url: "http://gendev.spritesmind.net/forum/viewtopic.php?t=337"
  - title: "Console Schematics"
    url: "https://gamesx.com/wiki/doku.php?id=schematics:console_related_schematics"

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste artigo falarei sobre os diagramas do Mega Drive, indicando as diferenças com o Snes.

## Diagrama de Blocos do Mega Drive

A figura abaixo contém o diagrama de blocos do Mega.

![block diagram mega](/pages_data/{{page.repository}}/block-diagram-mega.png "Diagrama de blocos do Mega Drive")

Como vemos existem várias diferenças com o Snes, principalmente no que diz respeito aos barramentos.


## Dois Processadores: 68000 e Z80

Diferentemente do Snes, o Mega tem uma arquitetura com dois processadores trabalhando mais ou menos de forma independente entre eles, o 68000 e o Z80.

No Snes o bloco de som é diferente do Mega, onde o SPC700 e o DSP são dedicados ao som, mas no Mega o Z80 é um processador de uso geral. Na prática ele é usado quase que exclusivamente para som, mas poderia ser usado para outras coisas.

A grande diferença entre os dois sistemas, nessa questão da arquitetura de hardware, é que no Snes apenas a Cpu 5A22 controla todo o barramento. Portanto a Cpu 5A22 é a única responsável por mover os dados de um lado para o outro (por Dma ou pelo processador). Com isso por exemplo o bloco de som apenas recebe dados transmitidos pela Cpu. O mesmo vale pra PPU, onde a memória de vídeo só é preenchida com dados enviados pela Cpu. Isso quer dizer que tanto os chips de som quanto os de vídeo não conseguem por conta própria pegar os dados da memória Ram ou cartucho e jogar em suas respectivas memórias. Essa transmissão só é feita pelo 5A22. Então apenas o 5A22 comanda os barramentos.

Já no Mega a coisa muda de figura. Não existe um chip que comanda tudo como no caso do Snes. No Mega tanto o 68000 quanto o Z80 e a VDP conseguem fazer transmissões por conta própria. Mas pra isso os chips tem que pedir acesso ao barramento, pois se um chip estiver transmitindo algo no barramento os outros tem que esperar, senão daria conflito.

Por isso no Mega existe um chip que é o ***Bus Arbiter***, que é o que gerencia os barramentos e faz com que apenas um chip por vez tenha domínio sobre os barramentos.

Como vemos no diagrama de blocos acima, o 68000 e o Z80 tem barramentos independentes e trabalham mais ou menos isolados um do outro, porém é possível que os dois barramentos se interconectem para que os chips nos dois barramentos troquem informações. Por exemplo, é possível que o 68000 envie dados para a memória de Som lá no barramento do Z80.

Todo esse controle dos barramentos é feito pelo *Bus Arbiter* e o chip de *I/O*.

## Barramentos

Como vemos no diagrama de blocos existem dois conjuntos de barramentos, uma pra cada processador (68k e Z80) por assim dizer. Porém é possível transmitir dados entre os dois barramentos e este controle é feito pelo *Bus Arbiter* e o chip de *I/O*.

Diferentemente do Snes, aqui não temos o equivalente ao *Bus-A* e o *Bus-B*, que são dois barramentos de endereços que trabalham em conjunto (ver o vídeo anterior dos diagramas do Snes). Como no Mega temos um chip dedicado que controla os barramentos (Bus Arbiter), o funcionamento é diferente do Snes.

## Cpu Motorola 68000

O 68000 é o processador principal do Mega Drive. Nos vídeos anteriores eu dei algumas informações sobre o 68000 e sempre adicionarei novas informações conforme os vídeos forem avançando.

No caso do Snes a Cpu 5A22 foi feita para o Snes e encapsula várias coisas, como a Cpu 65c816, Dma, I/O, etc. Já no caso do Mega o 68000 é uma Cpu normal sem nenhuma modificação. Os elementos que a Cpu 5A22 do Snes encapsula, aqui no Mega esses elementos estão em outros chips desenvolvidos pela Sega. Como a Sega teve que desenvolver alguns dos chips do console, deixar o 68000 sem modificações foi uma estratégia para baratear o desenvolvimento.

<img src="/pages_data/{{page.repository}}/68000.jpg" style="opacity:0.7;" alt="z80"/>

## Cpu Z80

A Cpu Z80 tem por finalidade principal o controle dos sons e músicas dos jogos. Ele pode ser usados para outras coisas se necessário, porém o seu uso principal é o gerenciamento do som.

<img src="/pages_data/{{page.repository}}/z80.jpg" style="opacity:0.7;" alt="z80"/>

A aquitetura do Z80 é totalmente diferente da arquitetura do 68000, então dentro dos jogos existe código tanto para o 68000 quanto para o Z80. Toda a lógica do jogo é feita em assembly de 68000, porém o código relativo aos sons é feito em assembly de Z80.

## Working Ram

Essa é a memória Ram principal do Mega Drive. Working Ram significa memória de trabalho, que é a memória de propósito geral disponível para o sistema. São como se fossem os chips de Ram que você instala em um computador. São 64KiB de memória, localizada no bancos $ff (isso será explicado mais pra frente).

No Mega Drive original a Ram é dividida em dois chips de 32KiB, como vemos na figura abaixo.

Vemos então que o Mega tem metade da Working Ram do Snes, que tem 128KiB.

<img src="/pages_data/{{page.repository}}/mega-ram.jpg" style="opacity:0.7;" alt="z80"/>

## VDP (Video Display Processor)

A Vdp é o chip que processa os gráficos. A Vpd possui uma memória de vídeo (VRam) de 64KiB e serve para armazenar os elementos gráficos que são mostrados na tela.
A Vdp será descrita em detalhes no futuro.

<img src="/pages_data/{{page.repository}}/mega-vdp.jpg" style="opacity:0.7;" alt="z80"/>

Dentro da Vdp também está localizado o PSG, que é usado na geração de sons. Ele está descrito mais abaixo.

A Vdp também é a responsável por realizar o DMA no Mega. No Snes o bloco de Dma fica dentro da Cpu 5A22, mas no Mega fica dentro da Vdp. Dma será explicado em detalhes no futuro.

## Yamaha YM2612

Este é um chip de Fm responsável pelos sons do Mega Drive. O Z80 é o responsável por comandar e enviar os dados de som para este chip. Aprenderemos sobre som mais pra frente no curso.

<img src="/pages_data/{{page.repository}}/ym2612.jpg" style="opacity:0.7;" alt="z80"/>

## PSG

Este é um chip usado na produção de efeitos sonoros no Mega.
Ele fica localizado dentro da Vdp.

Ele também é usado na retrocompatibilidade com o Master System, e no fundo é o mesmo chip de som utilizado no Master System.

## Memória Ram do Z80

No barramento do Z80 existe um chip de Ram de 8KiB de tamanho. Essa memória serve para guardar os dados de programa do Z80 e os dados de som que serão enviados ao YM2612.

<img src="/pages_data/{{page.repository}}/z80ram.jpg" style="opacity:0.7;" alt="z80"/>

No Snes temos uma memória de som de 64KiB, aque no Mega temos apenas 8KiB!

## Audio Mixer

O Audio Mixer é o responsável por pegar o som final do YM2612 e do PSG e juntar em uma coisa só para pode ser enviado para a TV ou fone de ouvido. Lembrando que o Mega possui conector para fones de ouvido, coisa que o Snes não tem.

<img src="/pages_data/{{page.repository}}/audiomixer.jpg" style="opacity:0.7;" alt="z80"/>

O barramento de cartuchos e o conector de expansão também tem pinos que são ligados no Audio Mixer. Então é possível que um cartucho possa gerar um som analógico que é mixado junto com o som normal do jogo. O mesmo vale para o conector de expansão. O Sega CD por exemplo usa esses pinos para jogar o som que ele gera direto no mixer.

## Video Encoder

O Video Encoder é o bloco que gera a imagem final que será enviada para a televisão. Do ponto de vista do assembly esse bloco é transparente, pois a interface com o código é apenas a Vdp.

<img src="/pages_data/{{page.repository}}/videoencoder.jpg" style="opacity:0.7;" alt="z80"/>

Note no diagrama de blocos que a saída do Audio Mixer também entra no Video Encoder, pois é no Video Encoder que está a conexão com a televisão, que engloba áudio e vídeo.

## Conector de Cartuchos (Cartridge Connector)

O conector de cartuchos é onde encaixamos os nossos jogos. Nele está presente os barramentos de endereço e de dados do 68000 e vários outros pinos de controle do sistema.
Mais detalhes do conector serão dados em vídeo futuros quando necessário.

<img src="/pages_data/{{page.repository}}/cartridgeconnector.jpg" style="opacity:0.7;" alt="z80"/>

## Cartucho

Os cartuchos que encaixamos no console possuem um hardware com diversos elementos, como SRam e Rom por exemplo.

<img src="/pages_data/{{page.repository}}/cartridgepcb.jpg" style="opacity:0.7;" alt="z80"/>

Os barramentos de dados e de endereços do 68000 estão presentes nos cartuchos, então cartucho é como se fosse um elemento a mais no barramento do sistema. Podemos enxergar o cartucho como sendo o "HD" do sistema, que é conectado diretamente nos barramentos.

## Bus Arbiter

Como já dito anteriormente este chip é o responsável pelo gerenciamento dos barramentos, junto com o chip de I/O.

Quando um chip deseja usar o barramento ele deve "pedir" ao Bus Arbiter. Como no Mega diferentes chips podem fazer leituras e transmissões, é necessário que apenas um chip por vez seja o "Master" do barramento. Um barramento é um conjunto de fios, então se mais de um chip jogar informação em um fio vai bagunçar tudo.

<img src="/pages_data/{{page.repository}}/arbiter.jpg" style="opacity:0.7;" alt="z80"/>

Do ponto de vista do assembly o Bus Arbiter não influencia tanto pois a maioria das coisas é feita de forma transparente para o programador. Mas é bom saber o que acontecer por baixo para ter domínio sobre o código.

## Chip de I/O

Esse chip é o responsável por todo o mapeamento de memória do sistema e pelo gerenciamento dos controles. Também atua junto com o Bus Arbiter no gerenciamento dos barramentos.

No Snes a Cpu 5A22 é a responsável pelo mapeamento de memória (o que será explicado melhor mais pra frente) e é ela que trata todos os acessos aos registradores do sistema. Já no Mega esse trabalho fica no chip de I/O.

<img src="/pages_data/{{page.repository}}/io.jpg" style="opacity:0.7;" alt="z80"/>

Mais detalhes sobre mapeamento de memória e registradores serão dados em vídeos futuros.

## Conector de Expansão

Os desenvolvedores do Mega deixaram esse conector disponível para que no futuro fosse possível encaixar outros elementos de expansão. O Sega CD usa este conector.

<img src="/pages_data/{{page.repository}}/expansionport.jpg" style="opacity:0.7;" alt="z80"/>

## Controles

Os controle são conectados diretamente no chip de I/O.
A interface com os controles ficará clara quando iniciarmos com o assembly.

<img src="/pages_data/{{page.repository}}/controllers.jpg" style="opacity:0.7;" alt="z80"/>

## Esquemáticos

Para ir mais a fundo nos detalhes do hardware é necessário ter em mão os esquemáticos. Os esquemáticos em geral mostram com muito mais detalhes as conexões entre os dispositivos pois todos os pinos são individualmente mostrados.

Existem vários pinos de controle que estão conectados entre os dispositivos e que geralmente não são mostrados em diagramas de blocos.

Estou colocando três imagens de diagramas do Mega que poderemos usar futuramente quando começarmos a programar em assembly, para tirar alguma dúvida que vier a ocorrer.  A primeira imagem é um diagrama de blocos mais detalhado, onde podemos ver a numeração dos chips que são usados nos dois esquemáticos mostrados nas outras duas figuras.

<a href="/pages_data/{{page.repository}}/schematics-mega-1.png" target="_blank">
  <img src="/pages_data/{{page.repository}}/schematics-mega-1.png"/>
</a>

<a href="/pages_data/{{page.repository}}/schematics-mega-2.png" target="_blank">
  <img src="/pages_data/{{page.repository}}/schematics-mega-2.png"/>
</a>

<a href="/pages_data/{{page.repository}}/schematics-mega-3.png" target="_blank">
  <img src="/pages_data/{{page.repository}}/schematics-mega-3.png"/>
</a>

## Placa mãe do Mega Drive

A foto abaixo mostra a placa mãe do Mega Drive, versão 1. É recomendado conhecer o hardware físico para ter uma visão geral do sistema em que estamos programando.
*Errata: A Working Ram são dois chips de 32KiB, mas na foto está marcando 36KB.*

![motherboard mega](/pages_data/{{page.repository}}/motherboard-mega.jpg "Placa mãe Mega")
