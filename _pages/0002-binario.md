---
layout: page
title: "Por que computadores usam Binário?"
date: 2020-02-04
type: video
description: Por que os computadores usam o sistema binário? Neste vídeo tento dar uma visão geral do motivo de usarmos o sistema binário.
entry_number: 2
youtube_video_id: oSWaCuNoc6U
repository: 0002-binario
has_code: false
has_p5: false
tags: [Fundamentos, Teoria, Binário, Baixo Nível]
permalink: /binario/

reference_links:
  - title: "Livro CODE, de Chales Petzold"
    url: "https://www.amazon.com.br/Code-Charles-Petzold/dp/0735611319"
---

### Introdução

Nesta página tentarei mostrar o porquê dos computadores usarem o sistema binário. Não tentarei fazer um tutorial sobre o sistema binário, pois pra isso existem centenas de tutoriais espalhados pela Net que explicam muito bem e são muito completos.  
Então tentarei aqui dar uma visão um pouco diferente do que geralmente vejo nos tutoriais, para que sirva de complemento para quem está aprendendo.

### Por que os computadores usam o sistema binário?

Quem está começando geralmente tem essa dúvida pois pra todo mundo o mais óbvio seria usar o sistema decimal que estamos acostumados. Muitos programadores
avançados não sabem a fundo o motivo de usarmos o sistema binário. O mais importante é saber usar, mas é legal saber as origens e história das coisas.  
Então por que o sistema binário é usado em processadores, memórias, etc?  
A resposta é que simplifica muito, principalmente o hardware. Parece estranho ter que usar o sistema binário, mas se alguém te desse milhões de dólares
e anos pra fazer um processador do zero, você também chegaria à conclusão de que o sistema binário é o mais simples. Não é à toa que as empresas projetam os
seus hardwares usando o sistema binário, pois ninguém ia gastar mais em uma coisa mais complexa e cara. 
Nas demais seções trabalharemos mais esse assunto.

### Por que usamos o sistema decimal?

Você já se perguntou o motivo de usarmos o sistema decimal no nosso dia a dia? Por que contamos até 10?  
A resposta é porque temos 10 dedos nas mãos, então os sistema decimal é mais natural para a nossa intuição. Se tivéssemos 4 dedos em cada mão usaríamos o
sistema octal ao invés do decimal.
Uma discussão completa sobre esse assunto fica muito longa de se colocar aqui, então recomento o [livro CODE do Charles Petzold](https://www.amazon.com.br/Code-Charles-Petzold/dp/0735611319){:target="_blank"}.
Esse livro detalha muito bem todo o assunto desta página e muito mais. Este livro é obrigatório para todos os programadores, tanto iniciantes como avançados!  
Esse conceito do motivo de usarmos decimal no nosso dia a dia e na nossa matemática é importante para entendermos a razão de usarmos binário.

### Por que o hardware fica mais simples com binário?

Vamos fazer um exercício. Se eu te pedisse pra me mostrar o número 8 com os dedos você mostraria os cinco dedos de uma mão e três dedos da outra, certo?
O campo de visão entre eu e você seria a "mídia" onde a informação (os dedos) é jogada para o outro lado ver.  
Agora, como portamos isso pra eletrônica? Imagine um fio; como colocar o número 8 nesse fio? Soa estranho né?  
Uma solução pra isso seria definir voltagens que representassem os números. Por exemplo, 0V (Volts) seria o número 0, 1V seria o número 1, 2V seria o número 2,
até os 9V que seria o número 9. Então no fio teríamos voltagens de 0 a 9V, e pela voltagem saberíamos qual número é. Pra números de 10 pra cima
precisaríamos de 2 fios, e assim por diante.  
Daria pra fazer isso, e economizaríamos fios e trilhas internas nos circuitos, porém o hardware ficaria complicado de fazer. Cada fio teria múltiplas
voltagens e oscilações nos sinais poderiam facilmente mudar a interpretação das voltagens.
E como as memórias funcionariam (Hds, Ram, etc)? Isso não teria nada a ver com bit, então dentro das memórias teríamos
que ter elementos que guardam 10 estados de voltagem. E não daria pra usar transistores, pois transistor é uma chave de liga e desliga, que cai como uma
luva pra binário mas não ajuda muito nesse caso. E pra fazer operações aritméticas por exemplo? Como faríamos uma soma nesse esquema? Teríamos um hardware bem mais
complicado pra fazer essas operações. E pra enviar dados pela rede por exemplo, como faríamos?  
Não seria mais simples cada fio ter apenas 2 estados, ou tem voltagem ou não tem? Com 2 estados no fio fica muito mais difícil de oscilações alterarem os valores,
pois no mesmo intervalo temos apenas 2 estados ao invés de 10. Os hardwares de memórias ficam mais fáceis de fazer pois internamente temos que guardar apenas sequências
de 2 valores ao invés de 10 valores, o que abre um leque muito maior de possibilidades. Com dois estados dá pra usar transistores, que implementam 
perfeitamente o esquema binário, é simples e pode ser miniaturizado imensamente. As operações aritméticas ficam fáceis de implementar em hardware, pois 
o hardware manipula apenas dois estados, o que abre a possibilidade de hardwares muito simples. As transmissões pela rede também ficam mais simples, pois a 
ausência ou não de sinal é muito mais fácil de se transportar à longas distâncias, uma vez que o sinal vai se atenuando ao longo dos cabos. Em outras 
mídias, como fibra ótica, o sistema binário é o que se encaixa perfeitamente.  
Sem falar na questão da sincronização por clock. Nem sei como ficaria num sistema decimal.

### Por que o software fica mais simples com binário?

Como a unidade é o bit, as operações binárias são bem simples. No geral o benefício não é tão visível pois praticamente todas as linguagens de programação 
tem suporte ao sistema decimal.

### Conclusão

Espero que este artigo tenha ajudado a entender um pouco sobre a razão de usarmos o sistema binário. O domínio deste tema leva um bom tempo pra entrar na mente, 
então sempre que possível leia e assista vídeos sobre o assunto para ver diferentes argumentos e exemplos sobre este tema. Como já disse no início, recomendo 
o [livro CODE do Charles Petzold](https://www.amazon.com.br/Code-Charles-Petzold/dp/0735611319){:target="_blank"}.




