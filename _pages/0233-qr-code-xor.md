---
layout: page
title: "Você é programador? Encontre esse QRCODE."
date: 2022/10/04
type: video
description: Neste episódio vamos fazer um desafio envolvendo QRCode e XOR.
entry_number: 233
youtube_video_id: rGbRzz5rHRw
repository: "0233"
has_code: false
has_p5: false
tags: []
playlists: [Mini-Projetos e Algoritmos]
permalink: /qr-code-xor/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Desafio do QRCODE

Neste episódio vamos ter que resolver um desafio. Veja a imagem abaixo. Ela contém milhares de Qr Codes diferentes. Todos os Qr Codes possuem um texto aleatório qualquer, exceto um Qr Code especial que possui o seguinte formato:

```
iFlag{xxx}
```

Esse *xxx* é um texto aleatório, então o desafio é encontrarmos este Qr Code especial para extrairmos este texto aleatório dentro deste *iFlag{}*.

Para facilitar temos uma dica, que nos ajudará a encontrar a solução. A dica é: *"O XOR é seu amigo"*.

<div class="info">
<img src="/assets/img/icons/computer4.gif">
<div style='display: block'>
<h4>Dica do Desafio</h4>
<p>O XOR é seu amigo.</p>
</div>
</div>

Como vemos pela dica, a solução tem algo a ver com operação binária *xor*.

A imagem com os milhares de Qr Codes está abaixo:

<a href="/pages_data/{{page.repository}}/qrcodes.png" target="_blank">
  <img src="/pages_data/{{page.repository}}/qrcodes.png"/>
</a>

Aconselho você a tentar resolver o desafio antes de ver a solução abaixo. Mas antes de colocar a solução, vou explicar rapidamente sobre o *xor*.

## A operação XOR

O xor é uma operação binária muito usada em programação, juntamente com o *or*, *and* e afins.

Eu já fiz um vídeo aqui no canal explicando mais a fundo o *xor*. É o vídeo ***5*** que fiz lá no começo do canal. Vou explicar rapidamente aqui.

A lógica do xor está na imagem abaixo:

<img src="/pages_data/{{page.repository}}/xor1.jpg" style="opacity:0.8; width:30%;"/>

Nos textos e livros é comum dizer que a lógica do xor é que quando os dois bits são diferentes o resultado é 1 e quando são iguais o resultado é 0. Porém isso não mostra o poder do xor.

Se olhar atentamente dá pra perceber que na coluna B todas as posições que estão com o valor 1 a operação faz com que o resultado seja a coluna A com esses bits invertidos. Ou seja, se considerarmos a coluna B uma máscara e fazermos o xor dessa máscara com alguma variável, o resultado é a variável com todos os bits invertidos nas posições que estão com 1 na máscara.

A figura abaixo resume melhor isso:

<img src="/pages_data/{{page.repository}}/xor2.jpg" style="opacity:0.8; width:50%;"/>

Vemos então que o xor troca os bits da variável nas posições que a máscara tem bit 1. Ou seja, o xor é um interruptor de bits!

<div class="info">
<img src="/assets/img/icons/computer4.gif">
<div style='display: block'>
<h4>Interruptor de Bits</h4>
<p>Podemos pensar no xor como sendo um interruptor de bits, pois todos os bits que tem 1 na máscara são invertidos no resultado. </p>
</div>
</div>

##### Dois XORs seguidos

Outra característica interessante do xor é que se tivermos uma variável e fizermos um xor com uma máscara e depois pegarmos o resultado e fizermos um xor como a mesma máscara, voltamos para o valor inicial. A figura abaixo exemplifica isso:

<img src="/pages_data/{{page.repository}}/xor3.jpg" style="opacity:0.8; width:50%;"/>

Pra entender melhor o que acontece, imagine que a lampada do seu quarto está apagada. Se você chavear o interruptor a lâmpada vai acender, e se chavear novamente ela vai apagar, voltando ao estado original.

##### Múltiplos XORs seguidos

Pra fechar, outra característica importante do xor, e que é a chave para resolver este desafio é que se ficarmos aplicando xor com diversas máscaras diferentes, e depois aplicarmos as mesmas máscaras novamente e em qualquer orderm, também voltamos ao valor original. A figura abaixo exemplifica.

<img src="/pages_data/{{page.repository}}/xor4.jpg" style="opacity:0.8; width:50%;"/>

Vemos que foram aplicadas as máscaras 1, 2 e 3 e depois foram aplicadas novamente na ordem 2, 3, 1, voltando ao valor inicial.

<div class="info">
<img src="/assets/img/icons/terranigma1.gif">
<div style='display: block'>
<h4>Múltiplas Máscaras</h4>
<p>Contanto que as máscaras apareçam em pares, o resultudo final volta para o original, não importando a ordem das aplicações.</p>
</div>
</div>

Uma forma de visualizar isto é com o exemplo da luz do quarto. Se você acender a luz e seu amigo apagar, se na sequência vocês novamente chevearem o interruptor o que vai acontecer é que um vai acender e o outro vai apagar. Não importa quem acenda ou apague, no final a luz vai ficar apagada.

## Solução do desafio

Agora vamos à solução. A primeira ideia é dar um zoom na imagem até chegar no nível de pixel. Carreguei a imagem no photoshop e dei um zoom pra ver os pixels, como na imagem abaixo:

<img src="/pages_data/{{page.repository}}/photoshop.png" style="opacity:0.8; width:100%;"/>

Olhando para os pixels aparentemente todos os qrcodes possuem a mesma quantidade de pixels. Abaixo capturei um imagem com um bloco de 3x3 qrcodes:

<img src="/pages_data/{{page.repository}}/qrcode9x9.png" style="opacity:0.8; width:70%;"/>

Isso indica que podemos criar uma aplicação que varre a imagem, recortando cada qrcode individualmente e processando os qrcodes individuais. 

Então qual é a dimensão em bytes de cada qrcode? A figura abaixo mostra 1 qrcode em zoom:

<img src="/pages_data/{{page.repository}}/qrcode1.png" style="opacity:0.8; width:60%;"/>

Pela imagem conseguimos ver que cada qrcode tem 27x27 pixels. 

<div class="info">
<img src="/assets/img/icons/sf2.gif">
<div style='display: block'>
<h4>Tamanho 27x27</h4>
<p>Conseguimos. Cada ponto preto é um pixel, então conseguimos ver que cada qrcode tem 27x27 pixels.</p>
</div>
</div>

Ok, agora podemos implementar uma aplicação que pega blocos de 27x27 pixels da imagem e processa cada um desses blocos, que é um qrcode, pra descobrir o que tem dentro.

Mas como processar uma imagem de um qrcode pra decodificar a mensagem? Deve ter bibliotecas pra isso que poderíamos tentar usar, mas acho muito complexo.

Qual o próximo passo?

##### E aquela dica do XOR?

Como a dica do desafio diz que o *xor* é nosso amigo, isso já dá uma boa indicação do que está acontecendo aqui.

Pelo que estudamos de xor e pela dica que foi dada, podemos deduzir que todos os qrcodes na imagem aparecem em pares, exceto por um deles, que é o qrcode que queremos encontrar!

Só pode ser isso, caso contrário não dariam essa dica de usar o xor, correto?

<div class="info">
<img src="/assets/img/icons/mario4.jpg">
<div style='display: block'>
<h4>Dica boa</h4>
<p>Se deram a dica do xor é porque todos os qrcodes devem estar repetidos em pares, exceto por 1.</p>
</div>
</div>

Supondo que seja isso mesmo e que todos os qrcodes estão repeditos em pares, exceto por um, como usar o xor pra descobrir o qrcode especial?

Podemos usar aquela característica de fazer múltiplos xors seguidos. Para cada posição na matrix 27x27 fazemos os xors de todos os pixels nesta posição para todos os milhares de qrcodes. Como os qrcodes estão em pares, o chaveamento dos bits de um xor é cancelado pelo seu par quando for feito o xor dele.

O pixel que usaremos está no formato *RGB* (Red, Green, Blue), e cada uma dessas 3 cores tem 1 byte de tamanho. Então um pixels tem 3 bytes, um pra cada cor. Então quando fizermos o xor dos pixels, teremos que fazer o xor das cores individualmente.

Parece complexo mas quando eu implementar o código vai parecer mais simples.

Então primeiro criamos uma imagem de 27x27 de tamanho com todos os pixels zerados, ou seja, os valores RGB de cada pixel com valor 0. Na sequência extraímos cada um dos qrcodes da imagem. Com cada qrcode em mãos varremos pixel por pixel do qrcode e fazemos um xor do pixel com o pixel correspondente na nova imagem que criamos. 

Só isso, no final é pra ficar apenas o qrcode sem par. 

A imagem abaixo serve para visualizar melhor este processo:

<img src="/pages_data/{{page.repository}}/qrcodecrop.png" style="opacity:0.8; width:90%;"/>

O processo de extrair um retângulo de dentro de uma imagem se chama *crop*.

## Algoritmo

Agora já podemos implementar o algoritmo discutido.

<div class="info">
<img src="/assets/img/icons/computer1.gif">
<div style='display: block'>
<h4>Algoritmo</h4>
<p>Criamos uma imagem 27x27 vazia. Fazemos o crop de cada qrcode na imagem. Para cada qrcode fazemos o xor dos pixels com os pixels da imagem criada. No final teremos o qrcode procurado.</p>
</div>
</div>

Para a implementação vou escolher *Python* pois é fácil de mostrar o algoritmo e tem muitas libs que manipulam imagem.

Vou escolher então a lib ***Pillow*** do Python, que é muito poderosa e aceita muitos formatos. A imagem que vamos trabalhar está no formato *png*.

Para instalar o *Pillow* rode os comandos abaixo:

```
python3 -m pip install --upgrade pip
python3 -m pip install --upgrade Pillow
```

Abaixo então temos o algoritmo final:

{% capture _code %}{% highlight python linenos=table %}
from PIL import Image

# Open the png file
img = Image.open("qrcode.png").convert("RGB")

# Get the width and height of the image
width, height = img.size

# The image is composed of blocks of 27x27 pixels, so we
# need to make a XOR operation between each block and we
# need to generate a final single block of 27x27 pixels

# Create a new image with final size 27x27
new_img = Image.new("RGB", (27, 27))

# Iterate through the pixels of the image
for x in range(0, width, 27):
    for y in range(0, height, 27):
        # Get the block of 27x27 pixels
        qrcode = img.crop((x, y, x+27, y+27))

        # Get the pixels of the qrcode
        pixels = qrcode.load()

        # Iterate through the pixels of the qrcode
        for i in range(27):
            for j in range(27):
                # Get the RGB values of the pixel
                r, g, b = pixels[i, j]

                # Make a XOR operation between the RGB values
                # and the RGB values of the final image
                r ^= new_img.getpixel((i, j))[0]
                g ^= new_img.getpixel((i, j))[1]
                b ^= new_img.getpixel((i, j))[2]

                # Set the new RGB values
                pixels[i, j] = (r, g, b)

        # Paste the qrcode in the new image
        new_img.paste(qrcode, (0,0))

# Save the image with the final qrcode
new_img.save("qrcodefinal.png")
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Usamos então o método *crop* do Pillow para extrair os qrcodes e depois percorremos pixel por pixel fazendo o xor das cores RBG.

Após acabar de rodar vai aparecer o qrcode desejado da foto abaixo:

<img src="/pages_data/{{page.repository}}/qrcodefinal.png" style="opacity:0.8; width:60%;"/>

<div class="info">
<img src="/assets/img/icons/sf3.gif">
<div style='display: block'>
<h4>Achamos!</h4>
<p>Se scanearmos o qrcode encontramos a string <em>iFlag{CrYpt0_WiTh_XoR}</em>.</p>
</div>
</div>

Se gostou deixe o like no vídeo. Valeu...