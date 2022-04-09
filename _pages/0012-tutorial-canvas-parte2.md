---
layout: page
title: "Tutorial Html5 CANVAS. Parte 2. Animações."
date: 2020-03-09
type: video
description: Neste vídeo vamos aprender como fazer animações no Canvas. Após aprender isso o céu é o limite :D.
entry_number: 12
youtube_video_id: z8TTWrj5YGo
repository: 0012-tutorial-canvas-parte2
has_code: true
has_p5: false
tags: [Canvas,Javascript]
playlists: [Tutorial de Canvas]
permalink: /tutorial-canvas-parte2/

related_videos:
  - title: "HTML Canvas Reference"
    author: w3schools
    url: "https://www.w3schools.com/tags/ref_canvas.asp"
  - title: "Drawing On the Canvas | HTML5 Canvas Tutorial for Beginners - Ep. 2"
    author: Chris Courses
    url: "https://www.youtube.com/watch?v=83L6B13ixQ0"

reference_links:
  - title: "HTML Canvas Reference"
    author: w3schools
    url: "https://www.w3schools.com/tags/ref_canvas.asp"
  - title: "Drawing On the Canvas | HTML5 Canvas Tutorial for Beginners - Ep. 2"
    author: Chris Courses
    url: "https://www.youtube.com/watch?v=83L6B13ixQ0"

contributions:
  - title: "HTML Canvas Reference"
    author: w3schools
    url: "https://www.w3schools.com/tags/ref_canvas.asp"
  - title: "Drawing On the Canvas | HTML5 Canvas Tutorial for Beginners - Ep. 2"
    author: Chris Courses
    url: "https://www.youtube.com/watch?v=83L6B13ixQ0"    
---

<style>
    canvas {
        border: 1px solid black;
    }
</style>

### Introdução

Esta é a parte 2 do tutorial de Canvas onde aprenderemos sobre animações. As animações abrem um mundo de possibilidades, pois ela torna visível a visualização de praticamente tudo. Verifique a seção "Vídeos Relacionados" no final da página para ver os outros vídeos dessa série.

### Animações

A chave principal das animações no Canvas é a função ***requestAnimationFrame***. Pra criarmos um loop de animação temos que primeiro criar uma função de animação, que no vídeo foi chamada de ***animate***, mas também sempre chamada de ***draw*** (desenhar).  
Esta função *draw* (ou *animate*) deve ser executada várias vezes por segundo, para que o efeito de animação seja conseguido. A melhor forma é trabalhar na mesma taxa de atualização do Browser. É aí que a ***requestAnimationFrame*** entra, pois ela recebe uma função de animação como parâmetro e registra esta função internamente no Browser. Desta forma da próxima vez que o Browser for atualizar a sua própria tela ele também chamará esta rotina registrada pelo *requestAnimationFrame*. Esta chamada é feita apenas no próximo frame, portanto pra isso funcionar o *requestAnimationFrame* deve ser colocar no início da função de animação, para que a função de animação seja chamada em todos os frames. O código abaixo mostra isso:

{% capture _code %}{% highlight javascript linenos=table %}
function animate() {
    requestAnimationFrame(animate)

    /* Draw objects */
}

animate()
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Vale notar que o *requestAnimationFrame* não desenha nada, apenas registra a função internamente no Browser e já retorna. Portanto não há nada de recursivo aqui.

### Código

Abaixo temos a animação gerada no vídeo junto com o código.

<div id="canvas_div">
<canvas></canvas>
</div>

{% capture _code %}{% highlight javascript linenos=table %}
let canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

c = canvas.getContext('2d');

colors = ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"];
colors_rgba = ["rgba(230, 57, 70, 0.5)", "rgba(241, 250, 238, 0.5)", "rgba(168, 218, 220, 0.5)", "rgba(69, 123, 157, 0.5)", "rgba(29, 53, 87, 0.5)"];

class Circle {
    constructor() {
        this.radius = Math.random() * 100;
        this.x = Math.random() * (canvas.width - this.radius*2)+this.radius;
        this.y = Math.random() * (canvas.height - this.radius*2)+this.radius;
        this.velx = Math.random()*16 - 8;
        this.vely = Math.random()*16 - 8;
        this.color = colors_rgba[Math.floor(Math.random()*colors.length)];
    };

    update () {
        this.x += this.velx;
        this.y += this.vely;

        if (this.x + this.radius > canvas.width || this.x - this.radius <= 0) {
            this.velx = -this.velx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius <= 0) {
            this.vely = -this.vely;
        }
    }

    draw() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0, Math.PI *2);
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    }
}

circles = []

for (let i=0; i<700; i++) {
    circles.push(new Circle());
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas. height);
    
    for (let i=0; i<700; i++) {
        circles[i].draw();
        circles[i].update();   
    }
}

animate();
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

<script src="/pages_data/0012-tutorial-canvas-parte2/src_page/canvas.js">