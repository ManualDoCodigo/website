---
layout: page
title: "Por que programadores usam Hexadecimais?"
date: 2020-02-04
type: video
description: Por que os programadores usam números no formato hexadecimal? Não complica mais? Essas são dúvidas comuns para quem está começando.
entry_number: 3
youtube_video_id: 5AuFecbTykk
repository: 0003-hexadecimais
has_code: false
has_p5: false
tags: [Fundamentos, Teoria]
playlists: [Fundamentos da Computação]
permalink: /hexadecimais/

reference_links:
  - title: "Code: The Hidden Language of Computer Hardware and Software"
    author: Chales Petzold
    url: "https://amzn.to/3hr28gP"

related_videos:
  - title: "Por que computadores usam Binário?"
    author: "Manual do Código"
    url: "/binario"
---

### Por que programadores usam hexadecimais? E binários?

Essas são perguntas comuns para quem está começando a programar. Pra quem está começando é comum se perguntar o porquê de não se usar decimal pra tudo,
já que é o que estamos acostumados na nossa vida de diário. Então por que complicar colocando hexadecimais? E por que os compudatores não são feitos
usando decimal em vez de binário? Por que escolheram binário. São boas perguntas.  
Em relação ao sistema binário, eu já fiz um vídeo explicando o assunto. Acesse [clicando aqui](/binario).

### Resposta para o uso de hexadecimais

Os programadores usam hexadecimais porque fica muito mais fácil de converter o número pra binário. Em outras palavras, é muito mais fácil saber quais os 
bits de um número hexadecimal do que de um número decimal. Como nós, como programadores, sempre temos que manipular binários em nossos programas, usar
hexadecimal facilita muito.  
Por exemplo, considere o número **18232** em decimal. Como que fica esse número em binário? É difícil saber e teríamos que gastar um bom tempo fazendo a conversão
ou usar a calculadora. O mesmo número em hexadecimal é **0x4738** (é comum colocar um "0x" ou "#" na frente de números hexa pra sabermos que é hexa e não decimal),
e olhando pra esse número dá pra saber na hora que o binário é ***100011100111000***. Fica muito mais rápido converter pra binário do que usar uma calculadora.  
A resposta objetiva então é que usamos hexacimais pois facilita muito nossa vida na hora de trabalharmos com binário.

### Se algo é usado há muito tempo, então é porque ajuda

Tenha na mente o seguinte, se algo é usado há muito tempo é porque ajuda e facilita nossa vida, e não o contrário. Ninguém usaria algo que complicaria ao invés de
simplificar. Se algo complica mais do que ajuda então essa coisa não vai durar muito, pois ninguém usará por muito tempo, a não ser que não tenha nada melhor.
É normal quando aprendemos algo novo termos alguma resitência e achar que essa coisa é complicada. Temos a tendência de continuar usando o que usávamos pois
já estamos acostumados e conseguimos fazer o que tem que ser feito. Porém na maioria das vezes quando passamos essa barreira inicial vemos que essas coisas novas
facilitam muito as nossas vidas, o que nos faz ganhar um tempo absurdo no médio e longo prazo.  
Portanto não tenha aversão a coisas novas por achar muito complicado. Se algo é usado é porque facilita a vida em várias situações. Essa mentalidade é muito
importante para programadores, pois vai te fazer evoluir muito mais rápido.

### Por que contamos até 10?

Você já parou pra pensar por que usamos o sistema decimal? Por que contamos até 10? A resposta é que usamos o sistema decimal pois temos 10 dedos nas mãos, então
simplifica muito usarmos o sistema decimal pois podemos usar os dedos pra ajudar nas contas.  
Isso parece muito estranho, mas é estranho pois estamos imersos nesse sistema desde que nascemos e é o natural para o nosso cérebro.  
Se tivéssemos quatro dedos em cada mão usaríamos o sistema octal e isso seria o natural pra gente.  
Uma discussão completa sobre esse assunto fica muito longa de se colocar aqui, então recomento o [livro CODE do Charles Petzold](https://amzn.to/3hr28gP){:target="_blank"}. Esse livro detalha muito bem todo o assunto desta página e muito mais. Este livro é obrigatório para todos os programadores!

### Formato dos números hexadecimais

Nós usamos sistema decimal no nosso dia a dia, pois pra nós é normal contar até 10. Por isso temos símbolos númericos que vão de 0 a 9. Depois do 9 (o 10),
aumentamos uma dezena e seguimos a regra do sistema decimal que é tão conhecido por todos.  
Mas e para o sistema hexadecimal, como funciona? É a mesmo coisa, porém como contamos até 16 no sistema hexadecimal, temos símbolos de 0 a 15. Os primeiro 10
símbolos são os mesmos do sistema decimal (0 a 9). Já para os símbolos de 10 a 15 usamos as letra de "a" a "f". Portanto em hexa os símbolos são
**0123456789abcdef**. A regra segue a mesma do sistema decimal, depois do "f" vem o 0x10. Ou seja, aumentamos uma "dezena" (ou seria hexena :) ) seguindo a mesma
lógica.  
Como exercício, como seria no sistema octal, que conta até 8? Resposta: Teríamos símbolos númericos de 0 a 7, e depois do 7 viria o 010 (é comum em octal começar o
número com "0" pra indicar que é octal e não decimal, assimo como o hexa começar com "0x" ou "#").  
Exercício 2: E como fica pra binário? Mesma regra. Contamos até 2, então temos símbolos númericos de 0 a 1. Depois do 1 vem o 10. Note que binário é o menor sistema que é
possível.

### O formato binário dos sistema numéricos

Vamos fazer um exercício. Qual o formato binário dos dígitos do sistema decimal (0 a 9)?  
O zero é 0, e o nove é *1001*, então considerando 4 bits pra todos os números temos:

{% highlight c %}
0: 0000
1: 0001
2: 0010
3: 0011
4: 0100
5: 0101
6: 0110
7: 0111
8: 1000
9: 1001
{% endhighlight %}

Note que faltaram algumas combinações para os 4 bits na tabela acima, como o *1010*, *1011*, etc.  
E pra hexadecimal, como ficam os binários para cada dígito (0 a f)? A tabela abaixo mostra.

{% highlight c %}
0: 0000
1: 0001
2: 0010
3: 0011
4: 0100
5: 0101
6: 0110
7: 0111
8: 1000
9: 1001
a: 1010
b: 1011
c: 1100
d: 1101
e: 1110
f: 1111
{% endhighlight %}

Olhando a tabela acima vemos que pra hexa todas as combinações de 4 bits são usadas, de *0000* a *1111*. Isso é o ponto chave.  
**Essa tabela tem que ser decorada por todo programador!**

### Mas por que hexadecimal e não qualquer outra base?

Até aqui vimos o porquê de usarmos hexadecimal, pois facilita a conversão pra binário. Mas por que usamos hexadecimal e não outra base?  
Primeiro, a menor granularidade de memória que usamos é o **byte**, que são 8 bits. Bit é a menor unidade de informação, porém todos os hardwares trabalham com a
granularidade de bytes. Você não vê uma memória Ram ou Hd, por exemplo, que tenha um número quebrado de bits. É tudo múltiplo de 8 bits (byte). Qualquer acesso a
Hds ou memórias Ram vai retornar um certo número de bytes, não bits.  
Com isso em mente, em linguagens de programação trabalhamos com variáveis com tamanho de byte pra cima. Tem excessões, mas no geral é tudo de byte pra cima.  
Portanto, hexadecimal é o sistema mais fácil pra converter bytes em binário. Sabemos que um byte tem 8 bits, então isso equivale a 256 valores diferentes.
Agora vamos quebrar esses 8 bits no meio pra ficarmos com 2 conjuntos de 4 bits. Ora, como vimos na seção anterior, **o sistema hexa usa todas as combinações de
4 bits pra representar os seus dígitos (0 a f), portanto podemos usar dois números hexadecimais pra representar os 8 bits de um byte!**  
Para o sistema decimal não daria certo, pois analisando a tabela dos decimais na seção anterior, não daria pra colocar 2 ou mais decimais juntos e ter todas 
as combinações de 8 bits. Já pra hexadecimal dá certinho com 2 dígitos hexa e só temos que decorar 16 formas binárias, de "0" a "f".  
Por curiosidade, e base 256, não daria pra usar, uma vez que um byte tem 256 combinações de bits? A resposta é que daria, porém você teria que decorar 256 combinações
de bits e ter 256 símbolos diferentes, o que seria muito mais difícil. Com hexa precisamos decorar apenas 16 combinações e juntar 2 símbolos pra ter as mesmas
256 combinações.

### Resumo para os hexadecimais

Pra dominar os haxadecimais você tem que decorar as 16 combinações de bit para os símbolos de "0" a "f" (tabela acima), e pra converter um número hexa pra binário é só
substituir cada símbolo pelos seus 4 bits equivalentes. Lembre-se de usando 4 bits, mesmo se o símbolo precisar de menos. Por exemplo, o zero em binário é apenas "0", 
porém sempre escreva "0000" na hora de converter de hexa pra binário.  
Agora podemos voltar para o exemplo do ínicio, como é o número 0x4738 em binário? Simples, só converter cada dígito para o seu equivalente em binário, ficando assim: 
"0100 0111 0011 1000". Simples né?  
E o número 0xbeef? Mesma coisa: "1011 1110 1110 1111". Pra quem não entendeu o 0xbeef é um número que usa apenas os símbolos "b", "e" e "f" do sistema hexa. Lembre
que em hexa os símbolos vão de "0" a "f".

### E octal daria certo?

Boa pergunta. Um byte tem 8 bits, então o sistema octal que conta até 8 não seria melhor? Não daria certo. Os símbolos do sistema octal vão de 0 a 7. Como o 7 em 
binário é "111" precisamos de 3 bits pra representar o sistema octal, e também usamos todas as combinações de 3 bits certinho. Mas não daria certo pois um byte
tem 8 bits, então com um símbolo representamos 3 bits, como outro símbolo representamos mais 3 bits e sobraria 2 bits pra completar os 8 bits, o que quebraria a lógica, 
pois com mais um octal daria 9 bits! Já com 2 hexas dá os 8 bits certinhos, pois cada hexa é representado por 4 bits como vimos acima.  
Pra finalizar essa discussão, e a base 4? Com base 4 também daria certo, pois os símbolos vão de 0 a 3, então os binários podem ser representados por 2 bits, sendo
"00", "01", "10" e "11", e todas as combinações de dois bits são usados. Porém na prática fica pior que o hexa pois precisaríamos de 4 dígitos pra representar um byte 
(4 conjuntos de 2 bits). O único ganho seria ter que decorar apenas 4 símbolos em binário, mas na prática não faz diferença, e com hexa fica muito mais enxuta a 
representação.  

### Conclusão

Portanto o sistema hexadecimal é o grande campeão, pois é o melhor sistema contando facilidade de uso e representação em binário.

