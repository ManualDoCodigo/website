---
layout: page
title: "Os segredos dos cartuchos do SNES: LoRom e HiRom"
date: 2023/03/06
type: video
description: Neste episódio vamos aprender sobre o modo de endereçamento absoluto da cpu 65c816 do Snes. 
entry_number: 242
youtube_video_id: XDfSwl_SVkI
repository: "0242-curso-assembly-snes-mega-parte60"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte60/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste episódio vamos aprender a diferença entre os modos de endereçamento *LoRom* e *HiRom* do Snes.

Quase todos os jogos de Snes possuem esses dois tipos de endereçamento. Alguns poucos usam outros formatos como o *ExLoRom* e *ExHiRom*, mas isso ficará para um outro episódio.

Vários Rpgs clássicos usam o formato *HiRom*, como *Final Fantasy 6* , *Chrono Trigger* e *Secret of Mana 2*, porém tem vários (a grande maioria talvez) que usam o formato *LoRom*. O formato *LoRom* é mais comum de aparecer, principalmente nos jogos mais no início da vida do console.

<img src="/pages_data/{{page.repository}}/cartridgespcbs.png" style="opacity:0.8; width:100%;"/>

Esses tipos de endereçamento são importantes de entender pois ajudam a entender melhor como as memórias são mapeadas e detalhes bem legais de como os hardwares funcionam.

<div class="info">
<img src="/assets/img/icons/terranigma1.gif">
<div style='display: block'>
<h4>LoRom e HiRom</h4>
<p>Quase todos os jogos de Snes entram na categoria LoRom e HiRom. Alguns jogos com mais de 4MB tem mapeamentos com outros nomes.</p>
</div>
</div>

Veremos que o pino *A15* do barramento de endereços é peça fundamental para entendermos o funcionamento desses dois tipos de endereçamento.

## Do que se trata o endereçamento LoRom e HiRom?

Esses dois tipos de cartuchos tem a ver com o modo como os dados do jogo são mapeados na memória do Snes, mais especificamente onde iremos colocar a Rom no mapa de memória. Esses dois modos foram definidos na documentação oficial do console, porém poderíamos criar um jogo e fazer um mapeamento diferente desses dois formatos oficiais.

A diferença básica então está ligada à região do mapa de memória onde iremos mapear o nosso jogo (a Rom). Na figura abaixo podemos ver o mapa de memória do Snes, que já estudamos em episódios anteriores.

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:100%;"/>

Vemos então que podemos colocar o jogo em qualquer região em vermelho no mapa de memória acima.

O detalhe importante é que temos bancos de memória que possuem os 64KB de memória disponíveis para o jogo, e outros que possuem apenas 32KB. 

No episódio que aprendemos sobre o mapa de memória do Snes, chamamos esses bancos que possuem os 64KB para dados do jogo de *bancos de Rom* e os bancos que possuem apenas 32KB para dados do jogo de *bancos de sistema*, pois os primeiros 32KB são usados para mapear regiões do sistema do Snes.

<div class="info">
<img src="/assets/img/icons/dk1.gif">
<div style='display: block'>
<h4>LoRom e HiRom</h4>
<p>Esses tipos de mapeamento de memória tem a ver com a região em que colocaremos a Rom do jogo.</p>
</div>
</div>

Então quando formos criar um jogo pro Snes temos que decidir em qual desses dois tipos de bancos vamos colocar o jogo, e isso tem um impacto direto na forma como o jogo é desenvolvido e principalmente no hardware do cartucho, pois vários detalhes mudam dependendo da escolha que fizermos.

No final então um jogo é *LoRom* quando mapeamos um jogo nos *bancos de sistema* ou usamos apenas os 32KB superiores dos bancos de Rom, e é *HiRom* quando mapeamos o jogo nos *bancos de Rom*, usando todos os 64KB de cada banco. A figura abaixo mostra as regiões de memória que são usadas para cada tipo de endereçamento.

<img src="/pages_data/{{page.repository}}/img2.jpg" style="opacity:0.8; width:100%;"/>

Então se mapearmos o jogo na região ***00-3f:8000-ffff***, então o jogo é *LoRom*. Se mapearmos o jogo na região ***c0-ff:0000-ffff***, então o jogo é *HiRom*.

Os jogos *LoRom* podem também ser mapeados na região ***80-bf:8000-ffff***, mas é menos comum. Os jogos *HiRom* podem ser mapeados na região ***40-7d:0000-ffff***, mas também é menos comum. Lembrando que os bancos *7e* e *7f* são reservados para a memória Ram do Snes.

Além dessas questões relativas à Rom, que é o principal, a Nintendo também especifica nesses dois modos outras coisas, como por exemplo a localização da memória de Save (Sram), que é diferente para cada tipo de endereçamento. Falaremos sobre isso mais adiante. O principal é a questão da Rom.

## 4 regiões para os jogos

Temos então que temos basicamente 4 regiões principais onde podemos colocar os jogos. A tabela abaixo mostra essas regiões, juntamente com o tamanho da região e o tipo de endereçamento que é usado para cada região.

<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:100%;"/>

<div class="info">
<img src="/assets/img/icons/megaman2.gif">
<div style='display: block'>
<h4>3.9MB</h4>
<p>A região 40-7d:0000-ffff possue um pouco menos de 4MB pois os bancos 7e e 7f são os bancos da memória Ram.</p>
</div>
</div>

A soma total dessas regiões é de cerca de 11.9MB, que é o tamanho máximo de uma Rom para o Snes sem utilizar um *mapper*, porém na prática o máximo que vemos é um máximo de 6MB entre os jogos oficiais. 

## Linearidade das Memórias

Agora vamos ver um conceito que é muito importante para entender os detalhes desses mapeamentos de memória.

A primeira coisa a se notar é bem simples. A memória Rom é um chip de memória independente, indicado na figura abaixo.

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:40%;"/>

Se considerarmos o chip de forma isolada, e considerando como exemplo um chip de 4MB (o chip do Chrono Trigger por exemplo), então temos que os endereços dentro deste chip vão de *0x000000* até *0x3fffff*, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img5.jpg" style="opacity:0.8; width:40%;"/>

Cada endereço aponta para um byte de dados. O endereço *0x000000* aponta para o primeiro byte de dados, e o endereço *0x3fffff* aponta para o último byte de dados.

A Cpu do Snes trabalha com bancos de memória, como já aprendemos em vários episódios no passado, porém o chip de memória, seja Rom ou Ram, não tem nada a ver com isso. Os chips tem uma quantidade de memória e quando o sistema precisa ler um dado da memória ele tem que colocar nos pinos de endereço do chip de memória o endereço que ele quer ler.

Já aprendemos sobre memórias no episódio 6 dessa série, e o conceito principal aqui é que o chip de memória pode estar mapeado em qualquer range de endereços da memória do Snes, e que o Snes não tem nada a ver com o endereçamento interno do chip de memória. Por exemplo, se a Rom estiver mapeada na região *c0-ff:0000-ffff* e a Cpu acessar o endereço *0xc01234*, então o Snes vai colocar no endereço do chip de memória o endereço *0x01234*, pois como dito anteriormente o chip de forma isolada tem endereços que vão de *0x000000* até *0x3fffff* (neste exemplo de 4MB).

<div class="info">
<img src="/assets/img/icons/chrono2.gif">
<div style='display: block'>
<h4>Chips de Memória</h4>
<p>Os chips de memória são elementos independentes que guardam bytes. Cabe ao sistema (console + cartucho) ler o byte correto dependendo do endereço indicado pela Cpu.</p>
</div>
</div>

Para o caso do mapeamento HiRom, a coisa é mais simples pois a Rom fica mapeada em bancos sequenciais onde os 64KB são inteiros para os dados da Rom, então não tem muito segredo como veremos a seguir. Já para o LoRom, a coisa é um pouco mais complicada, pois o chip da Rom fica mapeado em bancos de sistema, onde apenas os últimos 32KB são destinados para os dados da Rom. Isso faz com que os endereços da Rom no mapa de memória do Snes não sejam sequenciais, pois ficam intercalados com blocos de 32KB de memória de sistema. 

Vamos começar explicando o *HiRom* que é o mais simples.

## Hirom

Cartuchos HiRom são cartuchos que possuem jogos com tamanho no máximo 4MB e cujos dados da Rom estão mapeados na região ***40-7d:0000-ffff*** ou ***c0-ff:0000-ffff***. Ou seja, a Rom está mapeada no que chamamos de *bancos de Rom*, que são os bancos onde os 64KB são inteiros para os dados da Rom.

Abaixo temos uma imagem do cartucho do jogo *Chrono Trigger* que é um jogo *HiRom*.

<img src="/pages_data/{{page.repository}}/img6.png" style="opacity:0.8; width:60%;"/>

Esse jogo é mapeado na região ***c0-ff:0000-ffff***, e utiliza os 4MB disponíveis nesta região.

A maior parte dos jogos *HiRom* são mapeados na região ***c0-ff:0000-ffff***, e com isso é comum esses jogos terem um limite de 4MB para o tamanho da Rom.

<div class="info">
<img src="/assets/img/icons/chrono1.gif">
<div style='display: block'>
<h4>HiRom</h4>
<p>Jogos HiRom tem no máximo 4MB e são mapeados na região 40-7d:0000-ffff ou em c0-ff:0000-ffff.</p>
</div>
</div>

Alguns jogos como o *Tales of Phantasia* possuem 6MB de tamanho, então eles mapeiam parte do jogo na região ***40-7d:0000-ffff***, porém esse tipo de jogo não será abordado aqui neste episódio, pois isso é o que chamamaos de *ExHiRom*.

Como os 4MB do chip da Rom estão mapeados na região ***c0-ff:0000-ffff***, os endereços podem ser convertidos diretamente para os endereços *0x000000* até *0x3fffff* do chip da Rom, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img7.jpg" style="opacity:0.8; width:40%;"/>

Desta forma o endereços *0xc00000* equivale ao endereço *0x000000* do chip da Rom, e o endereço *0xc00001* equivale ao endereço *0x000001* do chip da Rom, e assim por diante, até o endereço *0xffffff* que equivale ao endereço *0x3fffff* do chip da Rom.

Então, mesmo a Cpu do Snes trabalhando com bancos de memória, como os bancos na região ***c0-ff:0000-ffff*** são inteiros pra os dados da Rom, os endereços acabam sendo sequenciais para o chip da Rom, então a conversão é simples.	

##### Memória de Save em HiRom

Nos jogos que possuem memória de save (Sram), a Nintendo definiu para os jogos *HiRom* que a memória de save ficaria mapeada na região ***20-3f:6000-7fff***, conforme mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img11.jpg" style="opacity:0.8; width:100%;"/>

A região de *6000-7fff* possui 8KB de tamanho, e a maioria dos jogos *HiRom* possuem 8KB de memória de save, então os jogos podem usar qualquer um dos bancos *20-3f* pois o cartucho é roteado para que todos esses bancos fiquem com  o mirror da região *6000-7fff* em todos esses bancos (isso será explicado melhor nos próximos episódios).

<div class="info">
<img src="/assets/img/icons/pcb2.png">
<div style='display: block'>
<h4>Save em HiRom</h4>
<p>Nos jogos HiRom, quando houver uma leitura ou escrita na região 20-3f:6000-7fff, isso é um acesso à memória Sram dentro do cartucho. O cartucho tem que saber reconhecer esses acessos para fazer a escrita e a leitura no chip de Sram.</p>
</div>
</div>

Alguns jogos possuem menos de 8KB (ou 64Kb) de Sram, outros possuem mais, então cabe ao cartucho interpretar os pinos de endereço e de controle para saber qual o endereço da Sram que ele deve ler ou escrever.

##### Outras combinações de mapeamento em HiRom

Nas figuras acima vimos as regiões que são mapeadas para os jogos *HiRom*, mas existem outros mapeamentos que podem ser usados, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img13.jpg" style="opacity:0.8; width:100%;"/>

No geral os jogos *HiRom* ou usando os bancos *c0-ff* ou os bancos *40-7d*, mas também é possível acessar os mirrors nos bancos *00-3f* e *80-bf*, porém isso é mais raro de ver. 

O grande ponto aqui é que no mapeamento HiRom os possíveis acessos aos bancos *00-3f* e *80-bf* são feitos através de um mirror dos 32KB superiores dos bancos *40-7d* e *c0-ff* e não um mapeamento de fato nestes bancos, o que demandaria um mapeamento mais complexo que não seria mais HiRom.

No final de tudo, o mapeamento Hirom é o mapeamento para jogos com no máximo 4MB de tamanho, e que utilizam os bancos *c0-ff* ou *40-7d* e que conectam o pino *A15* do chip da Rom no pino *A15* do Snes. Isso será explicado melhor nos próximos episódios.

## LoRom

Cartuchos LoRom são cartuchos que possuem jogos com tamanho no máximo 4MB e cujos dados da Rom estão mapeados na região ***00-3f:8000-ffff*** ou ***80-bf:8000-ffff***. Ou seja, a Rom está mapeada no que chamamos de *bancos de sistema*, que são os bancos onde apenas os 32KB superiores são reservados para os dados da Rom. Também é possível usar as regiões ***40-7d:8000-ffff*** ou ***c0-ff:8000-ffff***, mas isso é mais raro de ver.

Abaixo temos uma imagem do cartucho do jogo *Super Mario World* que é um jogo *LoRom*.

<img src="/pages_data/{{page.repository}}/img8.png" style="opacity:0.8; width:60%;"/>

Esse jogo é mapeado na região ***00-3f:8000-ffff***, e utiliza os 2MB disponíveis nesta região.

Aqui que começa a complicar, pois como os bancos *00-3f* são bancos de sistemas, os dados da Rom ficam apenas nos últimos 32KB de cada banco. O primeiros 32KBs é a região do sistema, onde ficam localizados os registradores do sistema, parte da memória Ram, etc. 

Com isso não temos um mapeamento direto entre o endereço do banco e o endereço do chip da Rom. Por exemplo, o endereço *0x000000* do banco *00* não é o mesmo endereço do chip da Rom, pois o endereço *0x000000* do banco *00* é a região de sistema, e o endereço *0x000000* do chip da Rom é o primeiro byte de dados da Rom.

O primeiro byte de dados da Rom fica no endereço *0x8000* do banco *00*, e o segundo byte de dados da Rom fica no endereço *0x8001* do banco *00*, e assim por diante, até o endereço *0xffff* que é o último byte de dados da Rom do banco *00*. Então os endereços *0x000000* até *0x007fff* do chip da Rom estão mapeados nos endereços *0x8000* até *0xffff* do banco *00*.

O próximo byte do chip da Rom, que seria o endereço *0x008000*, fica mapeado no endereço *0x8000* do banco *01*, e assim por diante, até o endereço *0x00ffff* que é o último byte de dados da Rom do banco *01*. Então os endereços *0x008000* até *0x00ffff* do chip da Rom estão mapeados nos endereços *0x8000* até *0xffff* do banco *01*.

O próximo byte do chip da Rom, que seria o endereço *0x010000*, fica mapeado no endereço *0x8000* do banco *02*, e assim por diante, até o endereço *0x017fff* que é o último byte de dados da Rom do banco *02*. Então os endereços *0x010000* até *0x017fff* do chip da Rom estão mapeados nos endereços *0x8000* até *0xffff* do banco *02*.

O próximo byte do chip da Rom, que seria o endereço *0x018000*, fica mapeado no endereço *0x8000* do banco *03*, e assim por diante, até o endereço *0x01ffff* que é o último byte de dados da Rom do banco *03*. Então os endereços *0x018000* até *0x01ffff* do chip da Rom estão mapeados nos endereços *0x8000* até *0xffff* do banco *03*.

Esta lógica se repete até que os endereços *0x1f8000* até *0x1fffff* do chip da Rom estão mapeados nos endereços *0x8000* até *0xffff* do banco *3f*.

Abaixo temos uma imagem que mostra a relação entre os endereços do chip da Rom e os endereços dos bancos.

<img src="/pages_data/{{page.repository}}/img9.jpg" style="opacity:0.8; width:40%;"/>

Pela imagem vemos que os endereços da Rom, que vão de *0x000000* até *0x1fffff*, estão divididos em blocos de 32kb de forma alternada entre os bancos *00* até *3f*. A imagem abaixo mostra uma tabela com a correspondência entre os endereços da Rom e os endereços dos bancos.

<img src="/pages_data/{{page.repository}}/img10.jpg" style="opacity:0.8; width:40%;"/>

##### Memória de Save em LoRom

No mapeamento *LoRom* a memória de save fica mepeada nas regiões *70-7d:0000-ffff* e *f0-ff:0000-ffff*, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img12.jpg" style="opacity:0.8; width:100%;"/>

Na região *70-7d:0000-ffff* é possível colocar 448KB de Sram, e na região *f0-ff:0000-ffff* é possível colocar 512KB de Sram, totalizando 960KB de Sram. Porém a maioria dos jogos com save utiliza Sram de 8KB (64Kb), acessando apenas a região *70:0000-1fff*. As outras regiões ficam como mirrors e também podem ser acessadas dependendo do jogo. 

##### Outras combinações de mapeamento em LoRom

No mapeamento *LoRom* também é possível acessar a região *8000-ffff* dos *bancos de Rom*, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img14.jpg" style="opacity:0.8; width:100%;"/>

Não é muito comum um jogo *LoRom* ter mais de 2MB de tamanho, mas alguns jogos, como o ***Treasure of Hunter G***, tem 4MB de tamanho, e utiliza a região *80-ff:8000-ffff* para mapear a Rom, o que dá 4MB de tamanho para a Rom.

No caso do LoRom não é possível acessar mirrors da Rom nas regiões *0000-7fff* dos bancos de Rom, pois em LoRom o pino *A15* do barramento de endereços não é conectado ao pino *A15* do chip da Rom. (mais detalhes nos próximos episódios).