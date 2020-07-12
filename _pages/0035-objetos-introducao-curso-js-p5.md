---
layout: page
title: "Introdução a Objetos em Javascript"
date: 2020-05-26
type: video
description: Este vídeo introduz os Objetos em JavaScript, explicando os conceitos básicos.
entry_number: 35
youtube_video_id: abnRDdSuGZA
repository: 0035-objetos-introducao-curso-js-p5
has_code: false
has_p5: true
p5_code_id: WjxEd5izZ
tags: [Curso Javascript, P5, Objetos, Json]
playlists: [Curso de JavaScript com P5.js]
permalink: /curso-javascript-p5-13/
---

### Introdução

Objeto em Javascript é uma estrutura na qual você pode juntar variás variáveis e depois acessar essas variáveis de forma independente.  
As variáveis internas pode ser de qualquer tipo, incluindo funções e outros objetos.  
É comum chamar as variáveis internas de um objeto de *propriedades*.  
As variáveis que são funções são chamadas de métodos.  
Objeto é a forma como fazemos orientação a objetos em Javascript. Isso será explicado mais a fundo em vídeos futuros.  

### Como declarar um objeto

Um objeto em Javascript precisa estar envolto em chaves "{}". O código abaixo criar um objeto vazio:

{% capture _code %}{% highlight javascript linenos=table %}
let obj = {}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

### Como criar propriedades

Existem várias forma de criarmos propriedades em um objetos.  
Primeiramente podemos criar junto com a definição do objeto. Neste caso cada propriedade tem que ser inserida no formato ***nome: valor***. As propriedade também dever ser separadas por vírgulos, como no exemplo abaixo:

{% capture _code %}{% highlight javascript linenos=table %}
let circle = {
    radius: 50,
    x: 100,
    y: 200,
    color: "red"
}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Vemos que a separação entre o nome e o valor deve usar o dois pontos ":" e não o igual "=".  

### Como acessar as propriedades

Para acessar as propriedades de um objeto existem duas formas, a *"brackets notation"* e a *"dot notation"*.  
O "dot notation" (notação de ponto) usa um ponto entre o nome do objeto e o nome da propriedade. Se quisermos então imprimir no console o raio do círculo criado no objeto acima, podemos fazer assim:  

{% capture _code %}{% highlight javascript linenos=table %}
console.log(circle.radius)
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Isso imprime o valor 50 no terminal.  
Vemos então que os objetos organizam muito o código, pois podemos colocar variáves relacionadas em um lugar só, acessando-as através do seu objeto.  
Isso é conceito de orientação a objetos, onde criarmos um objeto com propriedades próprias, variáveis ou funções, e esse objeto encapsula sua lógica própria. Esse conceito será melhor detalhado em vídeos futuros.  
Já com a "bracket notation" colocamos o nome do objeto e o nome da propriedade entre colchetes. Seguindo o exemplo anterior, temos:  

{% capture _code %}{% highlight javascript linenos=table %}
console.log(circle["radius"])
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Com a forma com colchetes temos que colocar o nome entre aspas. As aspas são necessárias quando o nome é uma string, porém também pode ser um número, e neste caso não precisa de aspas. Porém falarei deste caso quando falar de arrays em um vídeo futuro.  

### Métodos em um objeto

Como em Javascript funções são elementos de primeira ordem, podemos colocar funções, em variáveis, portanto podemos ter funções dentro de objetos, como no exemplo abaixo:

{% capture _code %}{% highlight javascript linenos=table %}
let circle = {
    radius: 50,
    x: 100,
    y: 200,
    color: "red",
    draw: function() {
        console.log("I'm a circle!")
    }
}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

No código acima temos a propriedade "draw" que é uma função.  
Podemos chamar a função usando o "dot notation", como abaixo:

{% capture _code %}{% highlight javascript linenos=table %}
circle.draw()
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Ou seja, chamamos a "draw" como uma função normal, mas agora ela está dentro de um objeto.

### A palavra chave ***this***

A palavra chave ***this*** em Javascript é muito especial. Ela significa algo um pouco diferente dependendo da situação e farei um vídeo no futuro detalhando todos esses casos. Porém no contexto de um objeto, usamos o *this* dentro de uma função de um objeto para acessar as outras preopriedades do objeto do qual a função faz parte.  

No exemplo do círculo acima podemos fazer com que a função *draw* desenhe um círculo usando o raio e as coordenadas x e y do objeto. Fica então assim:

{% capture _code %}{% highlight javascript linenos=table %}
let circle = {
    radius: 50,
    x: 100,
    y: 200,
    color: "red",
    draw: function() {
        ellipse(this.x, this.y, this.radius, this.radius); /*ellipse here is the P5 function*/
    }
}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Vemos então que dentro do *draw* usamos o *this* para acessar as outras variáveis do objeto. Quando você coloca o *this*, o Javascript entende que você está acessando as outras variáveis que fazem parte do objeto do qual a função sendo executada faz parte. Sem o *this* não teria como a função saber o que é o *x*, *y* e *radius*.  
O *this* então é como se fosse um ponteiro ou referência para o objeto.

### Criando propriedades dinamicamente com o "dot notation"

Podemos também criar novas propriedades em um objeto já existem apenas especificando o nome e valor com a notação de ponto, e caso a propriedade não existir ela é criada com o nome e valor passados.  
Por exemplo, se quisermos adicionar um método *update* no objeto acima, podemos criar da seguinte forma:

{% capture _code %}{% highlight javascript linenos=table %}
circle.update = function(x,y) {
    this.x = x;
    this.y=y;
}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

O código acima cria uma nova propriedade *update* que atualiza as propriedades *x* e *y* do objeto.  
Portanto podemos criar propriedades dinamicamente com Javascript.  
Isso difere de outras linguagens orientadas a objetos, como C++, onde temos as classes que são estáticas, ou seja, depois que um objeto é instânciado não podemos criar novas propriedades. Mas em Javascript isso é possível.

### Deletando propriedades

Para deletar uma propriedade de um objeto devemos usar o operador ***delete***, da seguinte forma:

{% capture _code %}{% highlight javascript linenos=table %}
delete circle.update;
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Note que colocar *undefined* ou *null* na propriedade não a deleta, apenas faz com que as propriedades fiquem com esses valores.

### Objetos são hashtables

Objetos em Javascript

### Nota sobre Json

O formato de arquivo ***JSON*** segue o modelo dos objetos em JavaScript, tanto que o significado de Json é *JavaScript Object Notation*.  
Existem detalhes e diferenças a se considerar, como por exemplo funções, que não fazem sentido em Json.  

### Próximos estudos em relação a objetos

O que vimos até agora é o básico de objetos, porém na prática não criamos os objetos foi mostrada aqui quando queremos muitos objetos do mesmo tipo.  
Por exemplo, imagine que queiramos criar vários objetos *circle* que criamos anteriormente. Teríamos que replicar a criação do objeto várias vezes para criar cada um dos objetos. Isso fica impraticável se precisarmos de muitos objetos, então deve ter uma forma mais fácil de criar objetos do mesmo tipo apenas com valores diferentes.  
Este vai ser o assunto do próximo vídeo sobre objetos.