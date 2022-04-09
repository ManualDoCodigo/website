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