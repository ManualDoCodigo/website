---
layout: page
title: "Explicando sobre Clocks e Flip-Flops. Curso de Assembly. Parte 7"
date: 2020-07-10
type: video
description: Neste vídeo explico porque usamos clock nos circuitos e também explico o elemento Flip-Flop, que tem um papel muito importante nesta questão.
entry_number: 70
youtube_video_id: 04eisZdA-Kg
repository: 0070-curso-assembly-snes-mega-parte7
has_code: false
has_p5: false
tags: [Assembly, Snes, Mega Drive, Romhacking, Flip Flop]
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte7/

reference_links:
  - title: "D Flip Flop Simulator"
    url: "https://www.falstad.com/circuit/e-edgedff.html"


---

### Introdução

Clock é o mecanismo fundamental na eletrônica atual. A frequência de clock é uma medida muito comum na hora de avaliarmos o desempenho de um computador.  
O clock faz o circuito ficar síncrono, pois o estado do circuito é atualizado a cada pulso do clock.  
Para entender esse conceito é necessário entender o que é um Flip-Flop, pois este elemento ilustra bem como esse processo funciona.

### Flip-Flops

Flip-Flops possuem vários tipos, porém a funcionalidade principal é travar um determinado sinal que entra no Flip Flop durante a borda de subida (ou descida) de um outro sinal que chamaremos de clock. Então em um Flip Flip existem dois sinais de entrada, sendo um o sinal que queremos "travar" e o segundo é o clock. Esse "travar" significa que o Flip Flop possui um sinal de saída que mantém o valor do sinal de entrada que estava presente quando o clock foi de 0 pra 1 (borda de subida). Depois que o sinal é travado, ou memorizado, o sinal de entrada pode ser alterado de qualquer forma que não altera o sinal de saída, que fica fixo com o valor que estava quando o clock teve a borda de subida. O valor da saída do Flip Flop só poderá ser alterado novamente na próxima borda de subida do clock.  
A figura abaixo mostra um Flip Flop simples do tipo D.  

<img src="/pages_data/{{page.repository}}/dflipflop.png" alt="D Flip Flop" style="width:40%;"/>

Na imagem acima vemos que temos como entrada no Flip Flop o clock e o sinal "Data", que é o sinal que queremos que o Flip Flop armazene.  
O clock é um sinal que fica alterando o valor de 0 pra 1 (ou de 0V pra 5V no caso dos consoles) com uma certa frequência. A figura abaixo mostra o formato típico de um clock.

<img src="/pages_data/{{page.repository}}/clock.png" style="width:50%;"/>

Nos circuitos mais complexos é comum existirem vários clocks diferentes, com diferentes frequência para diferentes partes do circuito. Mas em um Flip Flip pode ser usado qualquer tipo de sinal como clock, e não um que tenha uma frequência fixa o da foto acima. Isso vai da lógica do hardware. O que deve ser entendido é que o Flip Flip armazena o valor na borda de subida do sinal de clock, mas a duração entre uma borda de subida e outra não interessa pro Flip Flop. Como eu disse, depende da lógica que se deseja obter.  
No vídeo eu mostro visualmente o funcionamento de um Flip Flop usando um simulador online. Veja a seção de referência no final desta página.  

### Flip Flop como Memórias

Pela descrição do funcionamento de um Flip Flop, podemos ver que ele pode ser usado como uma memória de 1 bit. O Flip Flop consegue manter um bit de informação por um tempo indefinido, controlado pelo sinal de clock. Na prática ele é usado como memória ou pra manter um estado intermediário de uma operação complexa.  
Se juntarmos 8 Flip Flops conseguimos guardar um byte, o que é justamente como os ***registradores*** são implementados, mas isso veremos nas próximas partes do curso.

### Necessidade de clock no sistema

Na parte anterior do curso, onde falei de memórias, eu argumentei que a leitura ou escrita só deve ser ativada nos chips depois que os pinos de endereço e/ou dados já estiverem estabilizados.  
Eu citei que os componentes eletrônicos possuem um tempo de propagação dos sinais, pois nada é instantâneo. Então uma determinada trilha do circuito pode passar por mais elementos e ter um tempo de propagação maior.  
Então se não existisse clock e os circuitos fossem puramente reativos, os sinais iam sendo gerados e iam sendo propagados internamente nos circuitos com tempos diferentes elementos iriam gerar resultados intermediários diferentes devido ao fatos dos sinais chegarem em momentos diferentes. Então tudo seria uma coisa só trabalhando de forma totalmente reativa, o que levaria a uma bagunça total, e provavelmente nada funcionaria. Ficaria muito complexo trabalhar dessa forma com circuitos complexos, como um processador.  
Um processador executa instruções. Os dados do programa fica a ser executado fica em alguma memória (no cartucho no caso dos consoles). Um processador precisaria então pegar a intrução, injetar esses bits da instrução internamente no processador, decodificar pra ver qual instrução é pra saber o que fazer, executar a instrução, o que muitas vezes envolver operações matemáticas, e no final enviar o resultado pra algum outro lugar, como memória, chip de vídeo, etc.  
Se não tivesse clock, os bits da instrução iriam entrar no processador porém devido ao tempo de propagação diferentes que cada iria sofrer, nada ficaria sincronizado. Se o processador tiver que fazer uma conta de adição por exemplo, o circuito que faz a contar iria receber os bits em tempos diferentes e o resultado iria ficar com valores intermediários diferentes até todos os bits chegarem. O resultado que sai do processador iria ficar todo bagunçado.  
Vou parar por aqui no exemplo, mas dá pra ver que ficaria difícil implementar um processador dessa forma.  
O clock então serve pra resolver esse problema. Quando um sinal é injetado no processador (ou qualquer outro tipo de elemento), podemos ter Flip Flops que travam o sinal. O segredo é fazer com que o tempo entre uma borda de subida de um clock até a próxima borda de subida seja longo o suficiente para que os sinais se estabilizem. Desta forma dividimos o circuito em várias etapas, que são sincronizadas com a batida do clock.  
O Flip Flip é um elemento fundamental neste esquema, pois com ele podemos travar os sinais.  
Então em um processador por exemplo, uma instrução leva vários ciclos de clock para ser completada, pois em cada ciclo de clock alguma coisa é feita.  
Conforme a tecnologia vai avançando, menores ficam os transistores e mais rápidos ficam os componentes, então isso permite que clocks mais rápidos possam ser usados.

