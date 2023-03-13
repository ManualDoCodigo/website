---
layout: page
title: "Desvendando os segredos dos cartuchos HiROM de SNES"
date: 2022/10/04
type: video
description: Neste vídeo, você vai aprender tudo sobre os cartuchos HiROM de SNES e como eles funcionam. Voltado para programadores e desenvolvedores de jogos para SNES, o vídeo vai desvendar os segredos do hardware desses cartuchos.
entry_number: 243
youtube_video_id: ONiQ9sJV1Ig
repository: "0243-curso-assembly-snes-mega-parte61"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte61/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
  - title: "Coloque seu nome aqui ou algumas informações sobre você"
    author: "Seu Nome"
    url: "www.seusite.com.br"
---

## Introdução

Neste vídeo, você vai conhecer os segredos do hardware dos cartuchos HiROM de SNES e descobrir como o mapeamento de memória é feito dentro desses cartuchos. Ao longo do vídeo, você vai explorar o hardware dos cartuchos HiROM e aprender como a memória é organizada para armazenar dados e jogos no SNES. Com uma abordagem focada em aspectos técnicos, este vídeo é ideal para quem deseja entender melhor o hardware dos cartuchos HiROM e como eles funcionam. Se você é um entusiasta de videogames ou um programador experiente, este vídeo é uma oportunidade única para conhecer melhor o funcionamento do hardware dos cartuchos HiROM de SNES.

## Conector de cartucho do Snes

Antes de começarmos a ver detalhes sobre o mapeamento HiRom, vamos relembrar o diagrama de blocos do Snes, mostrado na imagem abaixo.

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:100%;"/>

Vemos que todos os barramentos chegam no conector de cartucho, e abaixo está uma imagem mostrando o que é cada pino do conector de cartucho do Snes.

<img src="/pages_data/{{page.repository}}/img2.jpg" style="opacity:0.8; width:60%;"/>

A imagem a seguir mostra os pinos visualizando pelo cartucho:

<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:100%;"/>

Para o entendimento dos mapeamentos de memória, estamos interessados apenas nos pinos de endereços, nos pinos de dados e em alguns pinos de controle.

Só pra deixar claro, quando falamos pinos de endereços, estamos falando do *Barrramento A*, que tem 24 bits. O *Barramento B* praticamente não é usado nos cartuchos, tanto que pelas fotos acima vemos que o barramento B fica localizado todo nos pinos extras que apenas alguns cartuchos usam.

Os pinos de endereços são os pinos *A0* até *A23*, que são os pinos de endereço do barramento A (Bus-A). 

Os pinos de dados são os pinos *D0* até *D7*, que são os pinos de dados do barramento de dados (Data Bus). 

Os pinos de controle são os pinos */RD*, *WR*, e o pino */ROMSEL*, que também é conhecido como */CART*. O pino */RESET* usaremos posteriormente para explicar o funcionamento da memória de Save, mas ficará pra outro episódio.

<div class="info">
<img src="/assets/img/icons/pcb1.png">
<div style='display: block'>
<h4>Outros pinos</h4>
<p>O conector de cartuchos do Snes tem vários outros pinos que são usados para outras coisas mais específicas. Para o entendimento dos mapeamentos HiRom e Lorom eles não são necessários.</p>
</div>
</div>

Os pinos de controle tem lógica invertida, ou seja, quando o pino está ativo ele fica com valor 0, e quando está inativo ele fica com valor 1. 

## O pino */ROMSEL*

O pino */ROMSEL* é muito importante para a construção dos cartuchos pois ele indica se o endereço no barramento de endereços é de um endereço de memória do cartucho ou de outra parte do sistema. A figura abaixo, que já vimos em episódios anteriores, mostra o funcionamento do pino */ROMSEL*.

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:100%;"/>

Toda essa região vermelha é a região onde podemos colocar dados da ROM dos jogos, então quando o barramento de endereço tive um endereço dentro dessa região, o pino */ROMSEL* estará em nível lógico baixo, ou seja, com valor 0, indicando que o endereço é de um endereço de memória do cartucho. Se o valor de */ROMSEL* for 1, então o endereço é de uma região do sistema do Snes, e não do cartucho, ou seja, fora desta área vermelha.

<div class="info">
<img src="/assets/img/icons/pcb2.png">
<div style='display: block'>
<h4>/CART</h4>
<p>O pino /ROMSEL também é chamado de /CART em alguns documentos.</p>
</div>
</div>

## Os pinos /RD e /WR

Os pinos */RD* e */WR* seguem a mesma lógica do pino */ROMSEL*, ou seja, quando estão ativos eles ficam com valor 0, e quando estão inativos eles ficam com valor 1.

O pino */RD* indica se a Cpu está fazendo uma leitura de memória, ou seja, se a Cpu está lendo um dado da memória, seja da Rom ou de qualquer outra parte do sistema, como a memória Ram, a Sram, os registradores do sistema, etc.

Então se ambos os pinos */ROMSEL* e */RD* estiverem ativos (em 0), então a Cpu está fazendo uma leitura de memória do cartucho. Isso é importante para a criação dos cartuchos.

<div class="info">
<img src="/assets/img/icons/book1.gif">
<div style='display: block'>
<h4>Pinos /RD e /WR</h4>
<p>Os pinos /RD e /WR nunca ficam com 0 ao mesmo tempo, pois não faz sentido ler e escrever ao mesmo tempo.</p>
</div>
</div>

O pino */WR* indica se a Cpu está fazendo uma escrita de memória. Neste caso não faz sentido escrever na região da Rom pois essa memória é apenas de leitura. Então não é pra acontecer de termos o pino */ROMSEL* e o pino */WR* ativos ao mesmo tempo, pois isso indicaria que a Cpu está tentando escrever na Rom, o que não faz sentido, a menos que o hardware do cartucho tenho algum chip extras com registradores mapeados nesta região, mas isso não é comum, uma vez que a maioria dos chips extras mapeiam os seus registradores em alguma região vazia dos *bancos de sistema*.

## Chip de Rom

Abaixo vemos a imagem de um chip de Rom que tem 4MB de tamanho, que é o que utilizaremos para explicar os cartuchos HiROM.

<img src="/pages_data/{{page.repository}}/img5.jpg" style="opacity:0.8; width:40%;"/>

Vemos então que o chip precisa de 22 pinos de endereço, ou seja, de *A0* até *A21*, pois 2ˆ22 = 4.194.304 bytes, que é o tamanho do chip de Rom.

Vemos também que o chip precisa de 8 pinos de dados, ou seja, de *D0* até *D7*.

<div class="info">
<img src="/assets/img/icons/mario2.gif">
<div style='display: block'>
<h4>Rom de 8 bits</h4>
<p>No Snes as memórias Rom tem barramentos de dados de 8 bits pois o barramento de dados é 8 bits. Já no Mega drive os chips de Rom tem 16 pinos de dados, pois o barramento de dados no Mega Drive é de 16 bits. Então os tipos de memória são diferentes entre os dois consoles.</p>
</div>
</div>

Temos também os pinos de controle */CE* e */OE*, que são os pinos de controle de *Chip Enable* e *Output Enable*, respectivamente. Esses pinos são usados para controlar o acesso ao chip. 

O pino */CE* é usado para ligar o chip, ou seja, quando o pino */CE* está com valor 0, o chip está ligado, e quando está com valor 1, o chip está desligado. 

O pino */OE* é usado para habilitar a saída de dados do chip, ou seja, quando o pino */OE* está com 0, a saída de dados do chip está habilitada. Isso quer dizer que nos pinos de dados o valor do byte correspondente ao endereço no barramento de endereço será colocado. Quando o pino */OE* está com valor 1, a saída de dados do chip está desabilitada, ou seja, o valor dos pinos de dados ficam em *tri-state*, ou seja, não tem valor definido. Já aprendemos sobre tri-state no [episódio 6](https://www.manualdocodigo.com.br/curso-assembly-snes-mega-parte6/), e esse estado é como se os pinos de dados estivessem desconectados.

Os pinos *Vcc* e *GND* são os pinos de alimentação e terra, respectivamente.

## Pinos A23 e A22

Nesta seção vamos falar sobre os pinos *A23* e *A22*, pois é importante entender as regiões da memória que eles controlam, o que tem um impacto direto na construção dos cartuchos.

Já sabemos que o barramento de endereço tem 24 bits, ou seja, de *A0* até *A23*. Então o pino *A23* é o pino que indica qual a metade do mapa de memória que está sendo acessada. Se o pino *A23* estiver com valor 0, então a metade do mapa de memória que está sendo acessada é a metade inferior, ou seja, a metade que vai de *0x000000* até *0x7fffff*. Se o pino *A23* estiver com valor 1, então a metade do mapa de memória que está sendo acessada é a metade superior, ou seja, a metade que vai de *0x800000* até *0xffffff*, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img6.jpg" style="opacity:0.8; width:100%;"/>

Todos os endereços de *0x000000* até *0x7fffff* tem o pino *A23* com valor 0, e todos os endereços de *0x800000* até *0xffffff* tem o pino *A23* com valor 1.

O próximo pino *A22* continua a mesma lógica, dividindo as duas metades do mapa de memória em quatro partes, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img7.jpg" style="opacity:0.8; width:100%;"/>

Todos os endereços de *0x000000* até *0x3fffff* tem o pino *A22* com valor 0, e todos os endereços de *0x400000* até *0x7fffff* tem o pino *A22* com valor 1. Todos os endereços de *0x800000* até *0xbfffff* tem o pino *A22* com valor 0, e todos os endereços de *0xc00000* até *0xffffff* tem o pino *A22* com valor 1.

Esses dois pinos então dividem o mapa de memória em quatro partes, cada parte com 4MB de tamanho. Se lembrarmos do [episódio sobre o mapa de memória do Snes](https://www.manualdocodigo.com.br/curso-assembly-snes-mega-parte34/), dividimos o mapa em 4 quadrantes pra facilitar a explicação, então os pinos *A23* e *A22* servem para vermos em qual quadrante do mapa de memória o endereço está.

<div class="info">
<img src="/assets/img/icons/goku1.gif">
<div style='display: block'>
<h4>Crescimento exponencial</h4>
<p>No sistema binário, cada bit que adicionamos dobra o número de combinações. Com 8 bits temos 256 combinações, com 9 bits temos 512, com 10 bits temos 1024 combinações, e assim por diante.</p>
</div>
</div>

No caso dos cartuchos HiRom o jogo ou é mapeado no quadrante 2 ou no quadrante 4, onde os pinos *A23* e *A22* ficam com valor 01 e 11, respectivamente, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img8.jpg" style="opacity:0.8; width:100%;"/>

## Primeiro exemplo: Hirom sem Save

Para entendermos como um cartucho HiROM funciona, vamos fazer um exemplo simples, onde o cartucho não tem memória de Save e possui 4MB de tamanho, como por exemplo o jogo *Mortal Kombat 3*.

Um cartucho que suporta este jogo está mostrado na figura abaixo.

<img src="/pages_data/{{page.repository}}/img9.jpg" style="opacity:0.8; width:70%;"/>

Neste jogo o cartucho é mapeado na região ***c0-ff:0000-ffff***.

Como vimos anteriormente, o pino */ROMSEL* é usado para indicar se o endereço do barramento de endereço é de um endereço de memória do cartucho ou de um endereço de memória do sistema. Então se o endereço no barramento de endereço estiver dentro da região ***c0-ff:0000-ffff***, então o pino */ROMSEL* deve estar com valor 0.

O pino */RD* é usado para indicar se a Cpu está fazendo uma leitura de memória, ou seja, se a Cpu está lendo um dado da memória, seja da Rom ou de qualquer outra parte do sistema, como a memória Ram, a Sram, os registradores do sistema, etc. Com isso, quando a Cpu for ler um dado da memória do cartucho, o pino */RD* deve estar com valor 0.

Desta forma podemos ligar o pino */ROMSEL* dos Snes no pino *CE* do chip de Rom, e o pino */RD* do Snes no pino */OE* do chip de Rom, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img10.jpg" style="opacity:0.8; width:100%;"/>

Porém em várias placas de cartucho a Nintendo inverteu esta conexão, conectando o pino */ROMSEL* do Snes no pino */OE* do chip de Rom, e o pino */RD* do Snes no pino */CE* do chip de Rom. Não entendo 100% o motivo desta escolha, mas pode ser que as maskroms (chips de Rom) da época tivessem os dois pinos como sendo apenas o */CE*, tipo um */CE1* e */CE2*. Existem reproduções de cartuchos que fazem as conexões invertidas, e funcionam normalmente, então no final das contas não faz muita diferença, contanto que a memória seja rápida o suficiente (120ns). O clock do Snes é lento o suficiente para que a lógica do chip de Rom consiga acompanhar em qualquer um dos casos.

<div class="info">
<img src="/assets/img/icons/megaman3.gif">
<div style='display: block'>
<h4>Conexões invertidas</h4>
<p>Muitas placas de cartuchos do Snes invertem a conexão dos pinos de controle, conectando o /ROMSEL no /OE da maskrom e o /RD no /CE da maskrom. No final ambas as formas funcionam.</p>
</div>
</div>

Os pinos de dados do Snes são conectados aos pinos de dados do chip de Rom, ou seja, os pinos *D0* até *D7* do Snes são conectados aos pinos *D0* até *D7* do chip de Rom. O *Vcc* e o *Gnd* também são conectados normalmente, como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img11.jpg" style="opacity:0.8; width:100%;"/>

A parte mais complicada de entender nos cartuchos é a conexão dos pinos de endereço do Snes com os pinos de endereço do chip de Rom. No caso do exemplo, os endereços do jogo no mapa de memória do Snes estão na região *c0-ff:0000-ffff*, porém o chip de Rom tem endereços que vão de *0x000000* até *0x3fffff*, ou seja, o chip de Rom tem 22 bits de endereço, enquanto que o Snes tem 24 bits de endereço.

No caso dos cartuchos HiRom a conexão é muito simples. Conectamos os pinos *A0* até *A21* do Snes nos pinos *A0* até *A21* do chip de Rom.

Como vimos no [episódio passado](https://www.manualdocodigo.com.br/curso-assembly-snes-mega-parte60), a região *c0-ff:0000-ffff* é toda pra Rom, então os bancos *c0* até *ff* são todos de Rom, diferente dos bancos de sistema que apenas os 32KB superiores são de Rom. Então a memória fica linear nesta região.

Pelo que foi mostrado na seção anterior, o jogo está mapeado no quadrante 4, onde os pinos *A23* e *A22* tem o valor 1. Esses pinos não são ligados no cartucho pois só estamos interessados nos endereços dentro dos 4MB do quadrante 4, e os pinos *A23* e *A22* são sempre 1 neste caso e só indicam que estamos no quadrante 4.

Com isso o mapeamento completo da Rom fica como mostra a figura abaixo.

<img src="/pages_data/{{page.repository}}/img12.jpg" style="opacity:0.8; width:100%;"/>

Lembrando que os pinos */ROMSEL* e */RD* podem aparecer invertidos em alguns cartuchos.

O pino chamado *NC* significa que o pino não está conectado, ou seja, não está sendo usado. O nome vem de *Not Connected*.

##### Mirror do cartucho

Então no cartucho do exemplo não precisamos usar os pinos *A22* e *A23* pra nada. Sabemos que o jogo usa apenas o range *c0-ff:0000-ffff*, então todos o endereços estão neste range.

O pino */ROMSEL* indica que é uma região de cartucho. O pino */RD* indica que é uma leitura de memória. 

Então só com esses pinos de controle e os pinos *A0* até *A21* já conseguimos mapear o jogo na região *c0-ff:0000-ffff*.

Mas como não estamos utilizando os pinos *A22* e *A23* no cartucho, isso cria mirrors da região *c0-ff:0000-ffff* nos outros quadrantes.

Por exemplo, se no jogo acessarmos o endereço *0x412345*, isso equivale a acessar o endereço *0xc12345*, pois o endereço *0x412345* é um mirror do endereço *0xc12345*, umas vez que os dois bits mais significativos (*A23* e *A22*) não são usados no cartucho.

Para o endereço *0x412345* o pino */ROMSEL* fica com valor 0 (pois fica dentro da região de Rom), o pino */RD* fica com valor 0 quando for feita uma leitura, e os pinos *A0* até *A21* ficam com valor *0x12345*. Então o cartucho não consegue ver a diferença pois os pinos *A23* e *A22* não estão conectados no cartucho.

Se pegarmos os números hexadecimais *0x412345* e *0xc12345* e zerarmos os dois bits mais significativos, ficamos com o número *0x012345* nos dois casos, que é o endreço que entra no chip de Rom. Isso é manipulação binária básica. Se não entende isso talvez seja melhor dar um passo atrás e estudar mais sobre binário e hexadecimais. É importante entender esse tipo de coisa para não ter tantas dificuldades com o assunto no futuro.

<div class="info">
<img src="/assets/img/icons/chrono2.gif">
<div style='display: block'>
<h4>Mirrors</h4>
<p>Comos os bits A23 e A22 não são ligados no chip de Rom, os endereços que só tem esses dois bits diferente apontarão para o mesmo lugar na Rom. Exceto para as regiões em que o endereço for de uma região em que o /ROMSEL não esteja ativo.</p>
</div>
</div>

Dando mais um exemplo, poderíamos acessar o endereço *0xfe0000*, que corresponde ao endereço *0x3e0000* no cartucho, mas não poderíamos acessar esse byte no cartucho pelo mirror do quadrante 2, pois o endereço seria *0x7e0000*, que é o banco da memória Ram, então nos acessos aos bancos *7e* e *7f* o pino */ROMSEL* fica com valor 1, o que não ligaria a Rom. Esse é um detalhe muito importante pra dominar esse assunto de mapa de memória e mirrors. Nem todos os mirros funcionam, pois alguns endereços são reservados para outros usos. No caso se lembrar do [vídeo de mapa de memória do Snes](https://www.manualdocodigo.com.br/curso-assembly-snes-mega-parte34), vemos que os quadrantes 2 e 4 são quase idênticos, com a diferença de que no quadrante 2 os bancos *7e* e *7f* são de Ram. Então esses dois bancos não são mirros dos bancos *fe* e *ff* do quadrante 4, pois os bancos *7e* e *7f* são de Ram, e não de Rom.

O mesmo vale para os mirros nos quadrantes 1 e 3. Se acessarmos por exemplo o endereço *0x008000* ou o endereço *0x808000*, isso equivale a acessar o endereço *0xc08000*, pois nesses endereços o pino */ROMSEL* fica com valor 0, e como não usamos os pino *A22* e *A23* no cartucho, o acesso funcionaria normalmente.

Mas o endereço *0xc01234* por exemplo não tem mirror nos quadrantes 1 e 3, pois seriam os endereços *0x001234* e *0x801234*, que são endereços na região de sistema, não de Rom, e o pino */ROMSEL* fica com valor 1, então o acesso não funcionaria.

Mas só pra deixar claro, mesmo sendo possível acessar os dados pelos mirrors, não há necessidade de acessar os dados pelos mirrors, pois isso só complica o código. Então se um jogo define que vai ser mapeado na região *c0-ff:0000-ffff*, então todos os endereços do jogo estarão nessa região. Tem jogos que usam acessos aos mirrors para evitar hacks que aumentam o tamanho da memória por exemplo, mas isso é um assunto extra para outro momento.

É isso por hoje.