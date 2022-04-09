---
layout: page
title: "Variáveis em Javascript"
date: 2020-05-18
type: video
description: Neste vídeo dou uma visão geral sobre os tipos de variáveis presentes no Javascript.
entry_number: 25
youtube_video_id: -i39qKp-rJQ
repository: 0025-javascript-variaveis-curso-js-p5-parte5
has_code: false
has_p5: false
tags: [Curso Javascript, P5, Variáveis]
playlists: [Curso de JavaScript com P5.js]
permalink: /curso-javascript-p5-5/

reference_links:
  - title: "JavaScript Data Types"
    author: w3schools
    url: "https://www.w3schools.com/js/js_datatypes.asp"
  - title: "JavaScript Fundamentals - Data types"
    url: "https://javascript.info/types"
  - title: "JavaScript data types and data structures"
    author: Mozilla
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures"
  - title: "JavaScript Essentials: Types & Data Structures"
    url: "https://codeburst.io/javascript-essentials-types-data-structures-3ac039f9877b"
  - title: "Variables and Types in JavaScript"
    author: Marius Schulz
    url: "https://mariusschulz.com/blog/variables-and-types-in-javascript"
  - title: "Sintaxe e tipos"
    author: Mozilla
    url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Values,_variables,_and_literals"
---

### Introdução

JavaScript é uma linguagem que possui vários tipos de variáveis, que serão descritos ao longo desta página. 
Variáveis são pedaços de memória de variados tamanhos que usamos durante a execução de um programa para realizar aquilo que o programa deve fazer.  
O objetivo aqui não é descrever de forma completa tudo relativo aos diversos tipos de variáveis presentes em JavaScript, mas sim dar um norte inicial e o meu modo de pensar no assunto.  
Cabe ao programador sempre procurar diversas fontes de ensinamento para ter uma visão mais completa dos assuntos.
Sempre que você imaginar uma variável, tenha a noção de que esta variável são bytes localizados em alguma região da memória, como na figura abaixo.  

*//Em construção*

Linguagens de sistema como C/C++ dão controle total da memória ao programador, com isso entra o conceito de ponteiros, onde é possível acessar manualmente qualquer endereço da memória do programa.  
Já linguagens de aplicação, como Javascript, Python e Java esse controle da memório é abstraído do programador. A razão é fazer com que o programador foque mais na lógica da sua aplicação e não se preocupe com detalhes de memória. Por isso nessas linguagens você se preocupa apenas em criar e usar as variáveis, sem ter que ficar se preocupando com detalhes mais baixo nível. Ambas as abordagens tem prós e contras, dependento do tipo de programa que você for fazer.  
Se você for fazer um programa que irá rodar em um microcontrolador, ou se você for fazer um sistema operacional que tem uma interface direta com os hardwares, ou se você for fazer um jogo onde tem que fazer muita manipulação de memória, aí faz sentido usar linguagens como C/C++ por exemplo, por essas linguagens proporcionam esses mecanismos de controle de memória. Já para aplicação mais alto nível, como aplicações Web, não queremos ter dor de cabeça e bugs relacionados a detalhes baixo nível de controle de memória, portanto usamos linguagens como JavaScript, Python, Java, etc.  
Por isso é bom sempre conhecer várias linguagens, pra saber o que é mais indicado pra cada projeto.  
Em Javascript então o programador não trabalha diretamente com ponteiros e não tem que se preocupar com detalhes de memória. Isso porém leva a entender certas regras da linguagem, pra saber o que a linguagem faz em certos casos. Por exemplo, se você tem uma variável que é um array (explicado mais abaixo), se você passar essa variável como parâmetro para uma função, a função recebe uma cópia do array ou uma referência? Se a função alterar o array então o array original também é alterado ou seria uma cópia que não altera o original? Em linguagens que tem ponteiros isso fica claro pelo tipo de parâmetro (se é um ponteiro ou não), mas em linguagens como Javascript e Python é necessário saber o que a linguagem faz nesses casos? As funções sempre recebem uma referência ou podem receber cópias também? Em quais casos é um ou outros? Essas perguntas serão respondidas ao longo do curso.  
Esses detalhes só são dominados com o tempo e com muita prática. Só ler sobre o assunto não adianta. Tem que ficar programando e testando pra assim ir entendendo ao longo do tempo.  

### JavaScript é uma linguagem dinâmica

Isso significa que quando você cria uma variável você não especifica o tipo da imagem. O valor que você coloca em uma variável é que vai determinar o tipo da variável. Por exemplo, se jogar um número em uma variável ela vai ser do tipo número. Se na sequência você jogar uma string na mesma variável ela passará a ser string.  
Isso é bem diferente de C/C++ por exemplo, que são linguagens estaticamente tipadas. Estaticamente tipada significa que quando uma variável é criada você precisa especificar o tipo dela. E como ela foi criada com um tipo, esse tipo não pode mudar. Então se você criar uma variável número e quiser jogar um string nela, vai dar erro. Já em linguagens dinamicamente tipadas isso é permitido.  
Ambas as abordagens tem vantagens e desvantagens. Muita gente não gosta de linguagens dinamicamente tipadas pois podem gerar bugs difíceis de serem encontrados. Por isso que hoje em dia muita gente usa TypeScript, que é uma linguagem que foi criada para colocar tipos no JavaScript (entre outras coisas), e que compila pra JavaScript no final.

### Os tipos de variáveis em JavaScript

- undefined
- null
- Boolean
- Número
- BigInt
- Objeto
- String

*//Em construção*

