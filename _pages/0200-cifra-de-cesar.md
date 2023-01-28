---
layout: page
title: "CIFRA DE CÉSAR. Algoritmo de Criptografia. Implementando um Algoritmo."
date: 2021/07/23
type: video
description: Neste vídeo eu explico o que é e como implementar a cifra de César. Este é um algoritmo muito simples para a criptografia de uma mensagem de texto.
entry_number: 200
youtube_video_id: GcxrmnUvl54
repository: 0200-cifra-de-cesar
has_code: false
has_p5: false
tags: []
playlists: [Questões de Entrevista]
permalink: /cifra-de-cesar/
---

## Questão

Neste episódio vamos aprender sobre a cifra de César. Este é um algoritmo muito simples para a criptografia de uma mensagem de texto. Abaixo temos o enunciado do algoritmo que vamos implementar.

<div class="info">
<img src="/assets/img/icons/computer1.gif">
<div style='display: block'>
<h4>Cifra de Cesar</h4>
<p>Dado uma string não vazia de caracteres minúsculos e uma chave numérica com valor maior igual a zero, escreva uma função que retorne uma nova string obtida fazendo o shift de cada letra da string de entrada em <em>k</em> posições no alfabeto, onde <em>k</em> é a chave.</p>
</div>
</div>

Em outras palavras, some o número da chave em cada letra da string de entrada. Por exemplo, se a chave for 3, a letra *a* se torna *d*, a letra *b* se torna *e*, e assim por diante. Você pode assumir que a string de entrada só contém letras minúsculas.

## Dicas

- Não se esqueça de tratar o caso em que a soma da chave com a letra ultrapasse o valor *z*, neste caso você deve voltar para o início do alfabeto, ou seja, *a*.

- Entenda como a codificação de caracteres funciona, como a tabela ASCII.

- O que acontece se o valor da chave for maior que o tamanho do alfabeto? 

- Estude a operação de módulo.

## Solução

{% capture _code %}{% highlight python linenos=table %}
#Time: O(n) - Space O(1)
def cesarCipherEncryption(message, key):
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    encoded = ""

    for i in message:
        encodedLetterIndex = ((ord(i) - ord('a'))+key)%26
        encoded += alphabet[encodedLetterIndex]
    
    return encoded

def cesarCipherDecryption(crypto, key):
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    decryptedMessage = ""

    for i in crypto:
        decodedLetterIndex = ((ord(i) - ord('a'))+26-key)%26
        decryptedMessage += alphabet[decodedLetterIndex]

    return decryptedMessage

message = "douglasdinizmanualdocodigo"
cryptoMessage = cesarCipherEncryption(message, 10)
decryptedMessage = cesarCipherDecryption(cryptoMessage, 10)
print(cryptoMessage)
print(decryptedMessage)
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}