---
layout: page
title: "O conceito mais importante da linguagem RUST. C vs Python vs Rust"
date: 2022/10/04
type: video
description: Neste episódio vamos ver um dos conceitos mais importantes para quem está aprendendo a linguagem RUST. O conceito de Ownership e Borrow. 
entry_number: 235
youtube_video_id: 5eo87qHNPDU
repository: "0235"
has_code: false
has_p5: false
tags: []
playlists: [Rust]
permalink: /rust-c-python/

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste episódio vamos ver um dos conceitos mais importantes para quem está aprendendo a linguagem RUST. O conceito de Ownership e Borrow. Este conceito é muito importante para entender como a linguagem funciona e como ela se diferencia de outras linguagens como C e Python.

Nas seções abaixo vou fazer um programa simples nas 3 linguagens e veremos algumas diferenças importantes entre elas.

## Linguagem C

Abaixo temos um programa simples em C onde temos uma estrutura que implementa um vetor 3D bem simples, com componentes x, y e z. Temos uma função *incX* que recebe o vetor e incrementa o valor de x em 1. O programa então imprime o valor da componente x do vetor antes e depois de chamar a função *incX*.

{% capture _code %}{% highlight c linenos=table %}
#include <stdio.h>

struct Vector {
    int x;
    int y;
    int z;
};

void incX(struct Vector v);

int main() {
    struct Vector v1 = {1, 2, 3};
    printf("Antes: v1.x = %d\n", v1.x);
    incX(v1);
    printf("Depois: v1.x = %d\n", v1.x);

    return 0;
}

void incX(struct Vector v) {
    v.x++;
}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Neste primeiro exemplo passamos para a função *incX* a própria estrutura *v1*, como pode ser visto na linha 14 e na assinatura da função *incX* na linha 8. 

O que vai ser impresso nas linhas 13 e 15?

O resultado está mostrado abaixo:

```
Antes: v1.x = 1
Depois: v1.x = 1
```

Como vemos o valor da componente x do vetor não foi alterado. Isso acontece porque quando passamos a estrutura *v1* para a função *incX* estamos passando uma cópia da estrutura. A função *incX* recebe uma cópia da estrutura e não um ponteiro para a estrutura.

<div class="info">
<img src="/assets/img/icons/megaman2.gif">
<div style='display: block'>
<h4>Parâmetros em C</h4>
<p>Em C os parâmetros de uma função são sempre copiados.</p>
</div>
</div>

Em C então todos os parâmetros de uma função são copiados para a *stack* (pilha) da função. Isso significa que quando passamos uma estrutura para uma função estamos passando uma cópia da estrutura e não um ponteiro para a estrutura.

Isso pode ser o que queremos, mas na maioria das vezes não queremos fazer a cópia da estrutura, pois a estrturura pode ser muito grande e isso pode ser custoso. Neste caso queremos passar um ponteiro para a estrutura, para que a função possa alterar a estrutura original.

O código abaixo mostra como podemos fazer isso:

{% capture _code %}{% highlight c linenos=table %}
#include <stdio.h>

struct Vector {
    int x;
    int y;
    int z;
};

void incX(struct Vector *v);

int main() {
    
    struct Vector v1 = {1, 2, 3};
    printf("Antes: v1.x = %d\n", v1.x);
    incX(&v1);
    printf("Depois: v1.x = %d\n", v1.x);

    return 0;
}

void incX(struct Vector *v) {
    v->x++;
}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Agora na função *incX* estamos recebendo um ponteiro para a estrutura *v1* e não mais uma cópia da estrutura. Na linha 15 então passamos o endereco da estrutura *v1* para a função *incX*, utilizando o operador *&*.

O resultado agora é:

```
Antes: v1.x = 1
Depois: v1.x = 2
```

<div class="info">
<img src="/assets/img/icons/computer2.gif">
<div style='display: block'>
<h4>Parâmetros por Valor ou Referência</h4>
<p>É comum vermos em tutoriais e livros de C que podemos passar as variáveis por valor ou referência. Isso é um abstração de mais alto nível, pois no fundo o código gerado pelo compilador sempre faz a cópia da variável que vai como parâmetro. A diferença é que quando passamos por referência estamos passando uma variável do tipo ponteiro, que tem 4 ou 8 bytes, mas não deixa de ser uma cópia do mesmo jeito.</p>
</div>
</div>

Resumindo então, em C todos os parâmetros e uma função são copiados para a *stack* da função, seja do tipo ponteiro ou não. Para estruturas definidas pelo programador geralmente queremos passar parâmetros do tipo ponteiro, para evitat possíveis cópias desnecessárias que podem ser custosas e afetar o desempenho do programa.

## Linguagem Python

Abaixo temos o mesmo exemplo em Python:

{% capture _code %}{% highlight python linenos=table %}
class Vector:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

def incX(v):
    v.x += 1

v1 = Vector(1, 2, 3)
print(f"Antes: v1.x = {v1.x}")
incX(v1)
print(f"Depois: v1.x = {v1.x}")
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

O resultado é:

```
Antes: v1.x = 1
Depois: v1.x = 2
```

Vemos então que o comportamento é diferente do C. Em Python quando passamos um objeto para uma função estamos passando uma referência para o objeto. Isso significa que a função pode alterar o objeto original.

Em Python não trabalhamos com ponteiros diretamente, mas podemos pensar que quando passamos um objeto para uma função estamos passando um ponteiro para o objeto.

Como na maioria das vezes não queremos copiar o objeto, que pode ser gigante, o Python implicitamente já passa uma referência para a função.

<div class="info">
<img src="/assets/img/icons/python1.gif">
<div style='display: block'>
<h4>C vs Python</h4>
<p>Vemos então que C e Python trabalham de formas basicamente contrárias. Em C é feita a cópia, mas em Python já é passada a referência implicitamente.</p>
</div>
</div>

## Linguagem Rust

Abaixo temos o mesmo exemplo em Rust:

{% capture _code %}{% highlight rust linenos=table %}
struct Vector {
    x: i32,
    y: i32,
    z: i32,
}

fn main() {
    let mut v1 = Vector { x: 1, y: 2, z: 3 };
    println!("Antes: v1.x = {}", v1.x);
    incX(v1);
    println!("Depois: v1.x = {}", v1.x);
}

fn incX(mut v: Vector) {
    v.x += 1;
}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

O que acontece quando tentamos compilar este código?

O compilador reporta um erro dizendo que a variável *v1* foi movida para a função *incX* e não pode ser mais utilizada na linha 11.

O que acontece é que em Rust quando passamos uma variável para uma função, ela é movida para a função, que passa a ser dona da variável. Isso significa que a variável não pode ser mais utilizada na função que a chamou, pois ela sai de escopo na função no momento em que é movida.

Esse comportamento é bem diferente do C e Python, onde a variável é copiada para a função ou passada a referência e continua existindo na função que a chamou.

Temos então em Rust o conceito de *ownership* que significa que uma variável só pode ter um dono em um dado momento. Quando passamos uma variável para uma função, ela é movida para a função, que passa a ser dona dela, e não pode ser mais utilizada na função que a chamou.

<div class="info">
<img src="/assets/img/icons/python1.gif">
<div style='display: block'>
<h4>Ownership</h4>
<p>Em Rust uma váriável pode ter apenas um dono em um dado momento, e quando passamos uma variável como parâmetro o ownership é passado para função sendo chamada, que passa a ser dona da variável. A partir deste momento a variável sai de escopo na função que passa o ownership.</p>
</div>
</div>

O detalhe aqui é que não é feita a cópias dos dados, como acontece em C, mas sim é passado uma referência, o que fica muito mais eficiente. Só é feita uma cópia quando a estrutura implementa o trait *Copy*. Por exemplo, tipos primitivos como *i32* implementam o trait *Copy* e são copiados para a função, mas tipos como *String* não implementam o trait *Copy* e são passados por referência. Também podemos utiliza o método *clone()* para forçar a cópia de uma variável, o que está disponível em muitos tipos, mas por baixo dos panos é criado um novo objeto que é movido para a função.

Essa regra de *ownership* é muito importante em Rust, pois evita muitos problemas de memória que acontecem em outras linguagens. Esta regra torna o Rusta uma linguagem mais difícil de programar, mas também mais segura e com menos bugs.

##### Borrow

Às vezes não queremos passar o ownership para uma função pois iremos utilizar a variável mais pra frente na mesma função. Neste caso podemos usar o conceito de *borrow* que significa emprestar uma variável para uma função. Para isso usamos o operador `&` antes do nome da variável, que indica que queremos emprestar a variável para a função sem perder o ownership.

O código abaixo mostra como podemos usar o *borrow* para consequirmos compilar o código:

{% capture _code %}{% highlight rust linenos=table %}
struct Vector {
    x: i32,
    y: i32,
    z: i32,
}

fn main() {
    let mut v1 = Vector { x: 1, y: 2, z: 3 };
    println!("Antes: v1.x = {}", v1.x);
    incX(&mut v1);
    println!("Depois: v1.x = {}", v1.x);
}

fn incX(v: &mut Vector) {
    v.x += 1;
}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

No código acima mudamos a forma de passar a variável na linha 10 e mudamos o parâmetro da função na linha 14.

Como estamos emprestando a variável *v1* para a função *incX*, podemos continuar a utilizar a variável *v1* na função *main*. Desta forma o código passa a compilar e funcionar da maneira desejada.

Existem vários outros detalhes envolvento o conceito de *borrow* que iremos ver em episódios futuros.