---
layout: page
title: "O cartucho de Chrono Trigger do SNES: uma análise técnica"
date: 2022/10/04
type: video
description: Neste episódio vamos continuar de onde paramos no episódio anterior e vamos ver como funciona um cartucho HiRom que tem save, e para isso utilizaremos o jogo Chrono Trigger como exemplo.
entry_number: 244
youtube_video_id: lwRQVh5vp6U
repository: "0244-curso-assembly-snes-mega-parte62"
has_code: false
has_p5: false
tags: []
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte62/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste episódio vamos continuar de onde paramos no episódio anterior e vamos ver como funciona um cartucho HiRom que tem save, e para isso utilizaremos o jogo Chrono Trigger como exemplo.

Faremos uma análise técnica detalhada do cartucho de Chrono Trigger do SNES. Abordaremos como é feito o mapeamento de memória e a conexão de hardware do cartucho, além de explicar como o cartucho seleciona a memória ROM ou a memória de save. Com um teor mais focado em programação e hardware, este vídeo é ideal para programadores e entusiastas de retro gaming que queiram entender melhor o funcionamento do cartucho do Chrono Trigger e por tabela, de todos os cartuchos HiRom do SNES.

<img src="/pages_data/{{page.repository}}/chrono.png" style="opacity:0.8; width:50%;"/>


## Cartucho do Chrono Trigger

Agora vamos ver um exemplo um pouco mais complexo, que é um jogo HiRom que usa memória de Save. Como já vimos em episódios anteriores, os cartuchos HiRom podem colocar a Rom nas regiões mostradas na figura abaixo:

<img src="/pages_data/{{page.repository}}/img9.jpg" style="opacity:0.8; width:100%;"/>

Vamos ver o exemplo do jogo Chrono Trigger, que mapeia a Rom na região ***c0-ff:0000-ffff***, porém tem também uma memória de Save na região ***20-3f:6000-7fff*** ou ***a0-bf:6000-7fff***, como mostrado na imagem abaixo.

<img src="/pages_data/{{page.repository}}/img1.jpg" style="opacity:0.8; width:100%;"/>

A Sram do jogo Chrono Trigger é de 8KB (0x2000 bytes), então ela é acessada mais frequentemente na região ***20:6000-7fff***, mas pode ser acessada de qualquer mirror nos bancos ***20-3f*** e ***a0-bf***.

Devido ao fato de termos agora uma memória de Save, o cartucho terá que verificar os endereços no barramento pra saber se deve colocar no barramento de dados o dado da Rom ou o dado da memória de Save.

No exemplo do episódio anterior, que era um cartucho HiRom sem save, o cartucho só precisava colocar no barramento de dados os dados da Rom quando o pino */ROMSEL* ficava ativo (com valor 0). Então apenas com o */ROMSEL* o cartucho já sabia se devia colocar no barramento de dados o dado da Rom ou não. *Portanto neste cartucho HiRom com Sram, a conexão da Rom fica exatamente igual ao chip HiRom sem Sram que estudamos no episódio passado.* Veremos mais detalhes a seguir.

<div class="info">
<img src="/assets/img/icons/chrono1.gif">
<div style='display: block'>
<h4>Conexão da Rom</h4>
<p>Neste cartucho HiRom com Sram que estamos estudando, o chip de Rom é conectado exatamente como no cartucho HiRom sem Sram que estudamos no episódio passado. A parte de Sram tem uma lógica separada.</p>
</div>
</div>

Agora no exemplo do Chrono Trigger o cartucho terá que colocar no barramento de dados o dado da Rom quando necessário, e quando o endereço no barramento estiver na região da memória de Save, o cartucho terá que colocar no barramento de dados o dado da memória de Save. Então o cartucho terá que passar a monitorar de alguma forma as regiões ***20-3f:6000-7fff*** e ***a0-bf:6000-7fff***.

<div class="info">
<img src="/assets/img/icons/terranigma1.gif">
<div style='display: block'>
<h4>Barramento de dados</h4>
<p>Em cartuchos com save o barramento de dados está conectado tanto no chip de Rom quanto na Sram. Mas eles nunca escreverão dados no barramento ao mesmo tempo, então não tem chance de conflito.</p>
</div>
</div>

A figura abaixo mostra a região de Rom onde o */ROMSEL* fica ativo (região vermelha), a região onde o Chrono Trigger colocar a Rom (bancos ***c0-ff***), e a região onde o Chrono Trigger colocar a memória de Save (bancos ***20-3f*** e ***a0-bf***).

<img src="/pages_data/{{page.repository}}/img8.jpg" style="opacity:0.8; width:100%;"/>

Vemos que a memória de Save está fora da região onde o */ROMSEL* fica ativo, então o cartucho terá que monitorar os endereços no barramento para saber se deve colocar no barramento de dados o dado da Rom ou o dado da memória de Save.

Para esse monitoramento extra o cartucho tem que ter mais hardware, e geralmente são chips como o mostrado em vermelho na figura abaixo, que é uma imagem do próprio cartucho do Chrono Trigger.

<img src="/pages_data/{{page.repository}}/img2.png" style="opacity:0.8; width:70%;"/>

A lógica de conexão do chip de Rom é basicamente a mesma coisa quando o cartucho tem Sram ou não. Abaixo temos a placa mostrada no episódio anterior, e vemos que a no cartucho do Chrono Trigger temos a mais o chip de Sram e esse chip *Mad-1* que é o que detecta se o endereco no barramento está na região da memória de Save.

<img src="/pages_data/{{page.repository}}/img7.jpg" style="opacity:0.8; width:70%;"/>

Vou explicar aqui uma forma simples, explicando este hardware de monitoramento usando um algoritmo simples feito em Python.

Neste exemplo que vou mostrar os pinos do chip de Rom são conectados da mesma forma que no exemplo anterior, onde os pinos */ROMSEL* e */RD* são conectados diretamente ao pino */CE* e */OE* do chip de Rom respectivamente, e os pinos *A0* até *A21* são conectados diretamente aos pinos *A0* até *A21* do chip de Rom. Os pinos de dados do barramento de dados são conectados diretamente aos pinos de dados do chip de Rom. Assim fica a mesma coisa que no exemplo anterior.

Isso não afeta a memória de Save pois a Sram está mepeada na região ***20-3f:6000-7fff*** ou ***a0-bf:6000-7fff***, e nestas regiões o pino */ROMSEL* fica com valor 1, então o chip de Rom fica desligado, e o cartucho não precisa colocar nada no barramento de dados, portanto não tem como conflitar a Rom com a Sram.

Agora vem a questão de como funciona o monitoramento dos pinos de endereço pra sabermos se o endereço está na região da memória de Save ou não. Se estiver devemos ligar o chip de Sram para que ela coloque os dados no barramento de dados.

Abaixo temos uma imagem dos pinos de um chip de Sram de 8KB, que é o mesmo chip que o Chrono Trigger usa.

<img src="/pages_data/{{page.repository}}/img3.jpg" style="opacity:0.8; width:60%;"/>

Como a memória tem 8KB, só precisamos de 13 bits pra endereçar todos os bytes da memória, então os pinos *A0* até *A12* são conectados diretamente aos pinos *A0* até *A12* do chip de Sram. 

O pino */RD* pode ser conectado direto no pino */OE* da Sram, igual a conexão da Rom. A diferença é que no chip de Rom quem liga o chip é o */ROMSEL*, e no chip de Sram quem liga o chip é o chip de monitoramento (chip com o retângulo vermelho na imagem acima) quando ele detecta que o endereço está na região da memória de Save. Até o momento temos o seguinte circuito:

<img src="/pages_data/{{page.repository}}/img4.jpg" style="opacity:0.8; width:100%;"/>

Então neste chip de monitoramento, que na maioria dos cartuchos é um chip 74hc139 ou um MAD-1 (explicarei esses chips melhor em outros episódios), existe um pino de saída que é conectado diretamente no */CE* da Sram. Quando o chip detectar que o endereço está no range ***20-3f:6000-7fff*** ou ***a0-bf:6000-7fff***, ele vai colocar 0 no pino de saída, e isso vai ligar o chip de Sram, e o chip de Sram vai colocar os dados no barramento de dados.

Agora vamos tentar encontrar uma forma que exija o mínimo de pinos possível e que consiga detectar a região ***20-3f:6000-7fff*** ou ***a0-bf:6000-7fff***. Abaixo temos os bits do endereço *0x206000* e do endereço *0x3f7fff*, assim como os bits do endereço *0xa06000* e do endereço *0xbf7fff*, que são os extremos de cada região.

<img src="/pages_data/{{page.repository}}/img5.jpg" style="opacity:0.8; width:100%;"/>

Vemos que os únicos pinos que ficam iguais em todos os endereção são os pinos *A13*, *A14*, *A15*, *A21* e *A22*. Então podemos usar estes pinos para detectar a região da memória de Save.

O pino *A15* indica que o endereços está no range *0000-7fff*, e os pinos *A14* e *A13* indicam que o endereço está no range *6000-7fff*. Então se o pino *A15* estiver com valor 0, e os pinos *A14* e *A13* estiverem com valor 1, então o endereço está na região da memória de Save.

Ok, mas só isso não basta, pois por exemplo o endereço *0x7e6000* também tem os pinos nesses valores mas não está na região do Save, e sim na Ram. Outro exemplo seria o endereço *0xd26000*, que também tem os pinos nesses valores mas não está na região do Save, e sim na Rom.

Então até o momento sabemos detectar a região *0x6000-0x7fff*, mas falta agora detectar os bancos *20-3f* e *a0-bf*. Para isso vamos usar os pinos *A22* e *A21*.

O pino *A23* não precisa ser usado pois ele só serve pra detectar qual metade da memória está sendo acessada, como vimos anteriormente. 

O pino *A22* como vimos, divide a memória em quatro quadrantes. Porém os bancos desejados estão na metade da superior do primeiro e terceiro quadrantes.

Então com o *A21* conseguimos dividir cada quadrante em dois, conseguindo assim a granularidade que queremos.

Com o *A22* em 0 selecionamos o primeiro e terceiro quadrantes, que são os bancos *00-3f* e *80-bf*. Com o *A21* em 1 selecionamos a metade superior do primeiro e terceiro quadrantes, que são os bancos *20-3f* e *a0-bf*.

Então com esses pinos, *A15*, *A14*, *A13*, *A22* e *A21*, conseguimos detectar a região da memória de Save.

O algoritmo em Python então fica assim:

{% capture _code %}{% highlight python linenos=table %}
def detecta_save(A15, A14, A13, A22, A21):
    if A15 == 0 and A14 == 1 and A13 == 1:
        if A22 == 0 and A21 == 1:
            return True
    return False

if detecta_save(A15, A14, A13, A22, A21):
    chip_output = 0  # A lógica é invertida, pois o pino */CE* é ativo baixo
else:
    chip_output = 1
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Outra opção válida seria usar o */ROMSEL* no lugar do *A15*, pois o */ROMSEL* também sempre vai ser 0 quando o endereço estiver na região da memória de Save. Essa forma é usada nos cartuchos que tem o chip *MAD-1*, mas isso é assunto pra um possível episódio futuro.

Veremos em episódios futuros como os chips usados nos cartuchos conseguem implementar essa lógica. O importante a saber é que é isso que está acontecendo no cartucho.

No final temos o circuito todo conectado desta forma:

<img src="/pages_data/{{page.repository}}/img6.jpg" style="opacity:0.8; width:100%;"/>

Esse *MUX* da imagem é o chip que faz essa lógica de detectar a região da memória de Save. Ele é um chip 74hc139 ou um MAD-1 em quase todos os cartuchos.

Com isso o cartucho do Chrono Trigger que estamos usando como exemplo vai funcionar. E não tem como ocorrer conflito entre o chip de Rom e de Sram.

Conflito seria se de alguma forma acontecesse de o */CE* dos dois chips ficarem com 0 ao mesmo tempo, o que faria com que os dois chips tentassem colocar dados no barramento de dados ao mesmo tempo, o que colocaria lixo no barramento de dados e poderia até causar um curto circuito dependendo do caso.

<div class="info">
<img src="/assets/img/icons/bowser1.gif">
<div style='display: block'>
<h4>Conflito</h4>
<p>Quando temos vários chips conectados em um barramento que podem colocar informações no barramento, apenas um pode escrever por vez. Já a leitura pode ser feita por vários chips a qualquer momento, pois isso não causa conflito.</p>
</div>
</div>

No caso isso nunca aconteceria neste cartucho que criamos, pois pra Rom ligar o /ROMSEL tem que estar em 0, e pra Sram ligar o /ROMSEL tem que estar em 1, o que impediria os dois chips de ficarem com */CE* em 0 ao mesmo tempo.

É isso por hoje. Até o próximo episódio.