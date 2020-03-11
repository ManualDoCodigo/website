---
layout: page
title: "Tutorial Html5 CANVAS. Parte 1. Básico de Canvas."
date: 2020-03-09
type: video
description: Este é o primeiro vídeo em uma série de tutoriais sobre o Canvas. Nesta parte 1 tratamos inicialmente de imagens estáticas.
entry_number: 11
youtube_video_id: qXg-s-h2aRI
repository: 0011-tutorial-canvas-parte1
has_code: true
has_p5: false
tags: [Canvas,Javascript]
permalink: /tutorial-canvas-parte1/

reference_links:
  - title: "HTML Canvas Reference"
    author: w3schools
    url: "https://www.w3schools.com/tags/ref_canvas.asp"
  - title: "HTML5 Canvas Tutorial for Beginners | An Intro to Becoming a Pro - Ep. 1"
    author: Chris Courses
    url: "https://www.youtube.com/watch?v=EO6OkltgudE"
---

<style>
    canvas {
        border: 1px solid black;
    }
</style>

### Introdução
Esta é a primeira parte do Tutorial de Html5 Canvas. Neste vídeo eu falo um pouco sobre o Canvas e dou uma introdução sobre como realizar os primeiros desenhos e como a lógica do Canvas funciona.  
No vídeo eu fiz alguns exemplos e a versão final pode ser visualizada abaixo.

<div id="canvas_div">
<canvas></canvas>
</div>

### Código

O código abaixo diz respeito ao canvas desenhado na imagem acima. Esse código está presente na pasta ***src_page*** do repositório deste vídeo (botões no topo da página). O código do vídeo está presente na pasta ***src*** do repositório do vídeo.  
Note no código abaixo que nas linhas 3 e 4 eu mudei o tamanho do canvas para que o canvas dessa página se adapte a diversos formatos de tela. Na linha 25 também estou colocando um número de esferas baseada no tamanho da tela, para ficar similar em vários tamanhos de tela.

{% capture _code %}{% highlight javascript linenos=table %}
canvas = document.querySelector("canvas");

canvas.width = document.getElementById("canvas_div").clientWidth;
canvas.height = innerHeight/3;

c = canvas.getContext('2d');

/*Rectangles*/
c.fillStyle='#ff0000';
c.fillRect(100,80,150,200);
c.fillStyle='rgba(0,255,0,0.5)';
c.fillRect(200,100,500,100);
c.fillRect(200,400,350,100);

/*lines*/
c.beginPath();
c.moveTo(50,450);
c.lineTo(700,50);
c.lineTo(500,300);
c.lineTo(700,300);
c.strokeStyle = "#ff0000";
c.stroke();
c.fill();

for (let i=0; i<canvas.width/14; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    /*circle*/
    c.beginPath();
    c.strokeStyle = "#0000ff";
    c.arc(x,y,Math.random()*100,0, Math.PI *2);
    c.fillStyle = "rgba(0,0,255,0.4";
    c.stroke();
    c.fill();
}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

<script src="/pages_data/0011-tutorial-canvas-parte1/src_page/canvas.js">
