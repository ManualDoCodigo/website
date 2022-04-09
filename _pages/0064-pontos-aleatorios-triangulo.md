---
layout: page
title: "Calculando Pontos Aleatórios em um Triângulo."
date: 2020-06-26
type: video
description: Neste vídeo eu implemento um algoritmo que retorna pontos aleatórios em um triângulo. Isso pode ser útil em jogo por exemplo. Implemento dois métodos diferentes.
entry_number: 64
youtube_video_id: EKWxx6q7B30
repository: 0064-pontos-aleatorios-triangulo
has_code: false
has_p5: true
p5_code_id: mU6VcITEw
tags: [Algoritmo, Random, Triângulo]
playlists: [Mini-Projetos e Algoritmos]
permalink: /pontos-aleatorios-triangulo/
---

### Introdução

Neste vídeo eu mostrarei dois algoritmos para gerar pontos aleatórios em um triângulo.

### Problema

Dado um triângulo com pontos **A**, **B** e **C**, onde esses pontos são um par *(x,y)*, crie uma função que retorne um ponto aleatório no triângulo.  
Apresentarei dois métodos, descritos abaixo.

### Método 1

Primeiro defina duas variáves ***s*** e ***t***, onde cada uma contém um número aleatório entre **[0,1]**. Em JavaScript o *Math.random()* retorna um número aleatório entre **[0,1]** e pode ser usada. A função *random()* (sem parâmetros) do P5 também pode ser usada.  
As expressões abaixo calculam um ponto **Q** no triângulo com vértices **A**, **B** e **C**.

<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>a</mi><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mn>1</mn><mo>-</mo><msqrt><mi>t</mi></msqrt><mspace linebreak="newline"/><mi>b</mi><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mfenced><mrow><mn>1</mn><mo>-</mo><mi>s</mi></mrow></mfenced><mo>&#xD7;</mo><msqrt><mi>t</mi></msqrt><mspace linebreak="newline"/><mi>c</mi><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mi>s</mi><mo>&#xD7;</mo><msqrt><mi>t</mi></msqrt><mspace linebreak="newline"/><mi>Q</mi><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mi>a</mi><mi>A</mi><mo>&#xA0;</mo><mo>+</mo><mo>&#xA0;</mo><mi>b</mi><mi>B</mi><mo>&#xA0;</mo><mo>+</mo><mo>&#xA0;</mo><mi>c</mi><mi>C</mi></math>

O ***t*** nas equações acima servem para determinar uma linha aleatória dentro do triângulo e o ***s*** serve para determinar um ponto aleatório dentro desta linha. A raiz quadrada serve para espalhar a probabilidade dentro do triângulo, para evitar que os pontos fiquem concentrados próximos dos vértices.  
A explicação e prova matemática dessas equações fogem do escopo deste documento.  

Abaixo está o código em JavaScript que retorna o ponto aleatório.

{% capture _code %}{% highlight javascript linenos=table %}
function method1() {
  let t = random();
  let s = random();
  
  let a = 1 - sqrt(t);
  let b = (1-s) * sqrt(t);
  let c = s * sqrt(t);
  
  /* Calculate the Point Q*/
  let qx = a*x1 + b*x2 + c*x3;
  let qy = a*y1 + b*y2 + c*y3;

  /* Return the Q point */
  return [qx,qy];
}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

### Método 2

Esse segundo método seque o esquema do método anterior. Temos duas variáves ***s*** e ***t***, onde cada uma contém um número aleatório entre **[0,1]**.  
O pseudo-código abaixo descreve o algoritmo.

{% capture _code %}{% highlight pseudocode linenos=table %}
  if s+t > 1 then
    s = 1-s
    t = 1-t
  endif

  a = 1-s-t
  b=s
  c=t

  Q = aA + bB + cC
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

O *if* no código acima serve para que o ponto gerado fique no triângulo, pois caso contrário ficará no paralelogramo gerado por dois triângulos juntos.  
Este algoritmo é muito melhor que o anterior pois não precisa da raiz quadrada, que é uma operação custosa.  
O código abaixo mostra o código em JavaScript.

{% capture _code %}{% highlight javascript linenos=table %}
function method2() {
  let t = random();
  let s = random();
  
  if (s+t > 1) {
    s = 1-s;
    t = 1-t;
  }
  
  a = 1-s-t;
  b = s;
  c = t;
  
  /* Calculate the Point Q*/
  let qx = a*x1 + b*x2 + c*x3;
  let qy = a*y1 + b*y2 + c*y3;
  
  /* Return the Q point */
  return [qx,qy];
}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=MML_HTMLorMML"></script>