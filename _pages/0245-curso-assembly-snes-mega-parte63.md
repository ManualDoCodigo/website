---
layout: page
title: "Mapeamento LoRom do SNES: A anatomia de um cartucho"
date: 2022/10/04
type: video
description: Neste vídeo, você vai aprender tudo sobre os cartuchos HiROM de SNES e como eles funcionam. Voltado para programadores e desenvolvedores de jogos para SNES, o vídeo vai desvendar os segredos do hardware desses cartuchos.
entry_number: 245
youtube_video_id: 2np9c-MpUik
repository: "0245-curso-assembly-snes-mega-parte63"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte63/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste episódio descubra o segredo por trás dos jogos clássicos do SNES com o mapeamento *LoRom*! Neste vídeo, vamos explorar a anatomia de um cartucho LoRom e desmistificar o seu funcionamento, com ênfase no papel do pino de endereço *A15*. Este conteúdo é voltado para programadores que desejam entender como o mapeamento LoRom afeta a jogabilidade de títulos icônicos, como ***Super Mario World*** e The ***Legend of Zelda***. Se você quer entender como os jogos do SNES foram criados, este vídeo é para você!

<div class="info">
<img src="/assets/img/icons/book1.gif">
<div style='display: block'>
<h4>Vejos os episódios anteriores</h4>
<p>O conteúdo deste episódio tem como base o conteúdo apresentado nos episódios anteriores. Se algo não ficar claro consulte os outros episódios.</p>
</div>
</div>

Boa parte do que vai ser mostrado aqui se baseia no que foi explicado nos episódios anteriores, então se você ainda não viu, recomendo que veja os vídeos anteriores antes de continuar. Dessa forma não precisarei repetir muita coisa e o vídeo ficará mais curto. Vamos lá?

## Primeiro exemplo: Cartucho LoRom sem Sram

Já vimos nos episódios passados como funciona um cartucho *HiRom* sem *Sram*, e na figura abaixo temos duas imagens, uma de um cartucho *HiRom* e outra de um cartucho *LoRom*. Consegue ver alguma diferença, além da cor e do tamanho do chip?

<img src="/pages_data/{{page.repository}}/img1.png" style="opacity:0.8; width:70%;"/>

A diferença principal é que o pino *A15* (pino ***40*** da conexão) não está conectado a nada. Mas qual a lógica disso, sendo que precisamos do endereço representado no barramento de endereco para acessar a memória? Bom, vamos ver como funciona o mapeamento *LoRom*.

Como vimos nos episódio onde expliquei as diferenças entre LoRom e Hirom, o LoRom são os jogos que estão utilizam apenas os ***32KB*** superiores de cada banco, como mostramos na imagem abaixo.

<img src="/pages_data/{{page.repository}}/img2.jpg" style="opacity:0.8; width:100%;"/>

Desta forma a memória rom não fica mapeada de forma linear na memória do Snes, mas fica alternado em blocos de ***32KB***, conforme vemos na imagem abaixo:

<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:60%;"/>

Então temos que descobrir uma forma de conectar o barramento de endereços do Snes no chip de Rom de forma que os endereços do Snes tenham o endereço correspondente correto na memória do chip de rom.

Por exemplo, considerando o jogo ***Hagane***, que tem 2MB de rom e mapeia o jogo em *00-3f:8000-ffff*, temos que o endereço *0x008000* do banco *00* (o primeiro byte de rom) deve ser mapeado para o endereço *0x000000* da memória do chip de rom, o endereço *0x008001* deve ser mapeado para o endereço *0x000001* da memória do chip de rom, e assim por diante. Para o banco *01*, o endereço *0x018000* deve ser mapeado para o endereço *0x008000* da memória do chip de rom, o endereço *0x018001* deve ser mapeado para o endereço *0x008001* da memória do chip de rom, e assim por diante. Até que o endereço *0x3f8000* seja mapeado para o endereço *0x1f8000* da memória do chip de rom.

A figura abaixo mostra os endereços nos extremos de alguns bancos na região *00-3f:8000-ffff* para vermos se conseguimos detectar algum padrão, como por exemplo algum pino que esteja sempre ligado ou desligado.

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:100%;"/>

Como podemos ver, em todos os endereços na região *00-3f:8000-ffff* o *A15* está sempre ligado, assim como os bit *A22* e *A23*.

Os pinos *A22* e *A23* servem pra identificarmos em qual dos 4 quadrantes o endereço está, como vimos em episódios passados. Se tivéssemos colocado o jogo em outro quadrante, os pinos *A22* e *A23* também iriam mudar. ***Então no final apenas o pino A15 ficaria sempre com o mesmo valor (1).***

<div class="info">
<img src="/assets/img/icons/chrono1.gif">
<div style='display: block'>
<h4>A15 sempre 1</h4>
<p>Em jogos LoRom, como o jogo sempre está na metade superior dos bancos, o A15 é sempre 1.</p>
</div>
</div>

No caso do cartucho que estamos estudando os pinos *A22* e *A23* nem precisam ser usados e não são conectados a nada no cartucho. Fazendo isso criamos mirrors da região *00-3f:8000-ffff* nas regiões *40-7d:8000-ffff*, *80-bf:8000-ffff* e *c0-ff:8000-ffff*. Então podemos usar esse cartucho da foto acima para colocar jogos em qualquer uma dessas regiões. Só lembrando que o bancos *7e* e *7f* são reservados para a Ram do sistema, o nesses bancos o pino */ROMSEL* fica com 1, o que desliga o chip de Rom. Portando no segundo quadrante só temos aproximatamente 1,9MB para uso, diferentemente dos outros quadrantes que temos 2MB dispiníveis, como mostrado na figura abaixo.

<img src="/pages_data/{{page.repository}}/img5.jpg" style="opacity:0.8; width:100%;"/>

Então aqui a questão gira em torno do pino *A15*, que sempre fica em 1 em todos os endereços de Rom das regiões LoRom.

Isso faz sentido, pois como pra LoRom os dados de Rom estão sempre na região *0x8000-ffff* dos bancos, o bit mais significativo, que é o *A15*, é sempre 1.

Ok, o segredo aqui então está em desconsiderar o bit *A15* dentro do cartucho. Como estamos colocando todos os dados do nosso jogo na região *0x8000-ffff* dos bancos, sabemos que quando o pino */ROMSEL* estiver em 0 (ativo), o pino *A15* sempre estará em 1. Não estamos considerando a hipótese de existir dados de rom na região *0x0000-7fff* dos bancos, mesmo nos bancos dos quadrantes 2 e 4 (que suportam Rom na região 0x0000-7fff), pois foi uma decisão de projeto do jogo colocar os dados de Rom apenas na região *0x8000-ffff* dos bancos escolhidos. LoRom tem essa característica.

Como já foi explicado no passado, o pino *A15* indica se estamos acessando a região *0x0000-7fff* ou *0x8000-ffff* dos bancos. Portanto não podemos conectar o *A15* do barramento direto no pino *A15* do chip de rom, pois isso faria com que o pino *A15* do chip de rom sempre estivesse em 1, o que não é o que queremos, pois fica impossível acessar qualquer endereço que terminasse em 0x0000-0x7fff dentro do chip de Rom, pois isso exigiria que o pino *A15* do chip de rom estivesse em 0, o que não é o caso, pois o pino *A15* do barramento sempre estará em 1 quando o */ROMSEL* estiver em 0.

<div class="info">
<img src="/assets/img/icons/chrono1.gif">
<div style='display: block'>
<h4>/ROMSEL e A15</h4>
<p>Em jogos LoRom, se o /ROMSEL estiver em 0, o A15 sempre estará em 1, pois a Rom sempre fica na região 0x8000-ffff em jogos LoRom.</p>
</div>
</div>

Se o pino *A15* do barramento estiver em 0, isso indica que estamos na região de sistema do Snes, e não a Rom. Nos quadrantes 2 e 4 dá pra colocar Rom na região 0x0000-7fff, e o *A15* seria 0, mas aí já não é mais LoRom. Seria HiRom ou outro mapeamento de Rom customizado.

Então para a conexão no chip de Rom nós desconsideramos o pino *A15* do barramento e conectamos os pinos *A16* a *A22* do barramento nos pinos *A15* a *A21* do chip de rom. 

Desta forma a memória Rom que ficava intercalada em regiões de 32KB com regiões de sistema, fica linearizada em uma região de 2MB, como mostrado na figura abaixo.

<img src="/pages_data/{{page.repository}}/img6.jpg" style="opacity:0.8; width:50%;"/>

Explicando de uma outra forma, se pegarmos a imagem mais acima onde tem os endereços nos extremos de alguns bancos, se retirarmos o pino *A15* e considerar apenas os outros pinos restantes como sendo o endereço que colocaremos no chip de rom, teremos o resultado desejado, conforma mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img7.jpg" style="opacity:0.8; width:100%;"/>

Então é por isso que o pino *A15* não é conectado ao chip de rom, pois sem ele conseguimos mapear os dados de rom linearmente em uma região de 2MB.

<div class="info">
<img src="/assets/img/icons/kirbi1.gif">
<div style='display: block'>
<h4>Resumo do LoRom</h4>
<p>A imagem acima contém o resumo do LoRom e explica o motivo de não conectarmos o A15 no chip de Rom. Certifique-se de entender o que está acontecendo na imagem acima.</p>
</div>
</div>

Os pinos *A22* e *A23* só indicam o quadrante que estamos acessando, então não precisamos conectá-los ao chip de rom. Portanto em qualquer um dos quadrantes que escolhermos colocar o jogo, a lógica é a mesma pois sem os pinos *A22* e *A23* a informação do quadrante não é considerada. Porém alguns jogos LoRom tem 4MB de tamanho, como o *Treasure Hunter G*, que é mapeado na região *80-ff:8000-ffff* dos bancos. Nesse caso o pino *A22* é conectado ao pino *A21* do chip de rom, pois os quadrantes 3 e 4 serão usados. Então apenas o pino *A23* é descartado. Se o jogo tiver mais de 4MB aí já não é mais LoRom.

<div class="info">
<img src="/assets/img/icons/sf4.gif">
<div style='display: block'>
<h4>HiRom vs LoRom</h4>
<p>Com o que foi explicado, podemos considerar como sendo HiRom os jogos que conectam o pino A15 no chip de Rom, e LoRom o jogos que não conectam.</p>
</div>
</div>

No final temos as seguintes conexões para um cartucho LoRom sem save:

<img src="/pages_data/{{page.repository}}/img8.jpg" style="opacity:0.8; width:100%;"/>

Temos em azul mais escuro os pinos *A16* a *A22* que foram conectados no lugar dos pinos *A15* a *A21*. Vemos que o pino *A15* do barramento não está conectado a nada.

Agora é só digerir toda esta informação. No próximo episódio vamos ver como funciona um jogo LoRom com save.
