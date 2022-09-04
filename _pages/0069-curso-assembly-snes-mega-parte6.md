---
layout: page
title: "Como as Memórias Funcionam? Explicando o Hardware. Curso de Assembly. Parte 6"
date: 2020-07-08
type: video
description: Neste vídeo eu explico como as memórias dos consoles funcionam, tanto a Ram, quanto a Rom. Explico a funções de todos os pinos dos chips. Esse conhecimento vai ser útil posteriormente quando formos fazer algo mais avançado nas aplicações.
entry_number: 69
youtube_video_id: iWxybBCOH6k
repository: 0069-curso-assembly-snes-mega-parte6
has_code: false
has_p5: false
tags: [Assembly, Snes, Mega Drive, Romhacking, Memória, Rom, Ram]
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte6/
---

### Introdução

Nesta parte 6 do curso vamos ver como os chips de memória funcionam. Isso é importante para vários aspectos que veremos no futuro. Entender isso vai nos ajudar a entender melhor como os consoles e cartuchos funcionam e também alguns detalhes legais, poe exemplo como alguns jogos fazem *Bank Switching*, como o Phantasy Star 4 do Mega Drive.

Também ajuda a entender melhor como o hardware funciona e porque os sistemas síncronos com clock são utilizados na prática, o que será o assunto da próxima parte do curso.

Vamos considerar aqui apenas memórias do tipo *NOR*, que são paralelas contém todos os pinos de endereço e de dados. Não vou falar de memórias NAND, que são seriais e não eram usadas na época do Snes e do Mega. Na verdade alguns cartuchos usaram memórias seriais, mas falarei disso em um vídeo futuro.

### Conexões das memórias

Vamos tomar como exemplo uma memória de 64KiB de tamanho.

Como a memória tem 64KiB, precisamos de 16 bits pra endereçar todos os bytes da memória. Então a memória tem que ter 16 *pinos de endereço*, pois 16 fios do barramento devem entrar na memória para indicar qual byte da memória será acessado.

A memória também tem que ter *pinos de dados*, que conterão os dados lidos ou gravados na memória. Vamos considerar essa memória como sendo de 8 bits. A memória precisa então de 8 pinos para os 8 bits de dados.

A imagem abaixo mostra um esquemático típico para as memórias da época do Snes e do Mega.

<img src="/pages_data/{{page.repository}}/memory.jpg" alt="Memória" style="opacity:0.75; width:70%;"/>

Fora os pinos de endereço e de dados precisamos também de pinos pra energizar o chip, então temos um pino que é o ***VCC***, que são os 5V que alimentam o chip, e o ***GND***, que é o terra (Ground).

O pino ***\CE*** na figura é o *Chip Enable*, que é o pino que liga ou desliga o chip. Este pino tem lógica invertida, indicado pelo *"\"* na frente, que significa que se o pino estiver em 1 (5V) o chip está desligado, e se tiver com 0 (0V) estará ligado. O que significa ligado e desligado ficará mais claro na parte de ***Tristate*** abaixo.

Na prática, se o pino *\CE* estiver em 1, não está saíndo nada nos pinos de dados (Tristate), independente do valor que estiver nos outros pinos.

Os pinos ***\RD*** e ***\WR*** indicam se o chip está em modo leitura (Read) ou escrita (Write). Esses pinos também tem lógica invertida, como o *\CE*.

Se o ***\RD*** estiver com 0, os pinos de dados contém o byte que está na memória no endereço representado pelos pinos de endereço.

Se o ***\WR*** estiver em 0, o valor que estiver nos pinos de dados são gravados no byte na posição indicada pelos pinos de endereço.

Os pinos ***\RD*** e ***\WR*** nunca podem estar com 0 ao mesmo tempo, pois não faria sentido. O hardware dos consoles são projetados para que isso não aconteça.

Lembrando que os pinos de endereço e de dados ***NÃO*** tem lógica invertida como os outros pinos de controle. Esses pinos são como se fossem os bits dos valores, então a lógica é a normal mesmo.

### Tristate, o que é isso?

Os pinos de dados podem ter 3 valores: ***0***, ***1*** e ***Z***. Esse ***Z*** é o que chamamos de ***Tristate***. Isso nada mais é do que "desconectar" os pinos do barramento externo. Então é como se no interior do chip houvesse um interruptor que desconecta o pino do mundo exterior, como na figura abaixo.

<img src="/pages_data/{{page.repository}}/tristate1.jpg" alt="Memória" style="opacity:0.75; width:30%;"/>

Na verdade o que acontece é que o pino é ligado internamente em uma alta impedância, o que faz com que nenhum sinal saia ou entre pelo pino. Na prática seria o mesmo que desconectar o pino do mundo exterior, como expliquei acima.

O *Tristate* é necessário quando temos que colocar vários elementos no barramento, pois se um chip está colocando um dado (0 ou 1) no barramento, nenhum outro chip pode colocar um dado também, caso contrário seriam dois ou mais elementos colocando 0V ou 5V no barramento, o que daria conflito.

Portanto, somente um chip pode acessar o barramento por vez. Enquanto isso os outros chips ficam com a saída em *Tristate*. A figura abaixo ilustra isso.

<img src="/pages_data/{{page.repository}}/tristate2.jpg" alt="Memória" style="opacity:0.75; width:50%;"/>

### Funcionamento da Memória - Leitura

Quando formos fazer uma leitura da memória, precisamos primeiro colocar o endereço do byte a ser lido nos pinos de endereço. Os 16 bits do endereço então deverão estar nos 16 pinos de endereço do chip de memória.

O pino *\CE* pode ser ligado antes ou depois (ou junto) dos pinos de endereço serem configurados. O pino *\CE* é o que liga o chip, então ele tem que ir pra 0 antes de qualquer leitura ou escrita.

O que faz a leitura acontecer é colocar o pino *\RD* pra 0 (com o *\CE* também em 0). Quando o *\RD* vai pra 0 o chip passa a colocar nos pinos de dados o valor do byte que está no endereço definido pelos pinos de endereço.

Para a leitura, se o *\RD* ou o *\CE*, ou ambos, estiverem com 1, a saída é *Z*. Ambos os pinos *\RD* e *\CE* devem estar com 0 para que saia dados.
A figura abaixo resume as combinações para a leitura.

<img src="/pages_data/{{page.repository}}/table.jpg" alt="Memória" style="opacity:0.75; width:35%;"/>

### Funcionamento da Memória - Escrita

Para a escrita temos que colocar nos pinos de endereço o endereço do byte a ser alterado internamente na memória, e nos pinos de dados temos que colocar o novo valor do byte a ser gravado.

O *\CE* tem que ir pra 0 pra ligar o chip, e quando o *\WR* for pra 0 a escrita é feita.

### Estabilidade dos pinos de endereço

É extremamente importante só ativar a leitura ou escrita (pinos *\RD* e *\WR*) depois que os pinos de endereço estiverem com os valores estabilizados.

Para a leitura isso é menos importante, pois os efeitos colaterais são menores.

Por exemplo, imagine que os pinos *\CE* e *\RD* estejam em 0. Neste caso o chip de memória irá colocar nos pinos de dados o valor do byte indicado pelos pinos de endereço, conforme explicado acima. Porém se os pinos de endereço forem alterados enquanto o *\CE* e o *\RD* estiverem em 0, o chip mudará o valor lido de acordo com o novo endereço.

O efeito é pior no caso das gravações, pois se o valor do endereço não estiver estabilizado no momento em que os pinos *\CE* e *\WR* estiverem em 0, o chip sairá alterando os bytes internos de acordo com o que os pinos de endereço estiverem indicando. Isso pode ser catastrófico.

Portanto na prática os endereços são inseridos em um ciclo de clock e os pinos de controle são setados no próximo ciclo, o que garante que os pinos de endereço estão estabilizados. *Os pinos do chip não podem ser setados todos de uma vez. Os pinos de endereço e dados tem que ser setados antes dos pinos de controle.*

