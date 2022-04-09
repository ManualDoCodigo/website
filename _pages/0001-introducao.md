---
layout: page
title: "Introdução ao Canal!"
date: 2020-01-29
type: video
description: Este é o primeiro vídeo do canal. Neste vídeo eu me apresento e falo um pouco do canal e do site.
entry_number: 1
youtube_video_id: G_MFwREMnmM
repository: 0001-Introducao
thumb: thumb.jpg
has_code: false
has_p5: false
tags: [Canal]
playlists: [Youtube]
permalink: /introducao/
---

### Apresentação

Sejam bem-vindos ao Manual do Código. Meu nome é Douglas Diniz e eu sou o criador deste site e do canal do Youtube.
Meu objetivo com o canal no Youtube é falar o máximo possível sobre programação, nos mais diversos assuntos.


Eu sou formado em Engenharia de Computação e programar é tanto o meu trabalho como o meu hobbie. Quero passar um pouco do que sei e aprender mais com cada vídeo que fazer. Espero que possa ajudar outras pessoas.  

### Cenário

Como pode ser visto nos vídeos e na foto abaixo, eu gravo os vídeos no meu próprio lugar de trabalho. Dá pra ver que eu gosto muito de video-games antigos e os games foram uma das principais paixões que me levaram a seguir pra área de programação.

![Foto Doug](/assets/img/doug.jpg "Programando")

### Website

Este site foi todo feito em Jekyll, e o todo o [conteúdo está no Github do canal](https://github.com/ManualDoCodigo/website).

Para quem não sabe o Github permite que qualquer repositório seja um servidor Web, bastando fazer algumas configurações muito simples.

Então se o seu repositório possui uma página Web, você pode configurar para que o Github sirva a página no endereço *"seu_login.github.io/nome_repositório"*.

Desta forma você não precisa se preocupar com hospedagem de site ou coisas do tipo. E se tiver um domínio pode fazer o Github rotear pro repositório escolhido.  

Só que ainda é melhor que isso. O Jekyll é um gerador de sites estáticos, onde é muito fácil criar um site onde é extremamente fácil adicionar novos conteúdos.

O Jekyll foi criado por um dos fundadores do Github, então tem compatibilidade total com a plataforma. Isso que dizer que basta fazer um *push* das modificações do site e o próprio Github *"compila"* o site pra você.  

Como todo o conteúdo do site é público, dá pra ver direto no código como a coisa é feita.
Pretendo fazer um vídeo no futuro dedicado a esse assunto, pois muita gente não sabe o poder do Github.  

### Conteúdo do Site - Artigos e Códigos

Aqui no site pretendo colocar todas as coisas extras que não são possíveis de colocar em vídeo. Além de ter todos os links para os vídeos e códigos, pretendo colocar mais informações em forma de texto para complementar os vídeos, quando necessário.  

Então cada vídeo tem uma página dedicada onde colocarei todos os links, artigos e todas as referência usadas no vídeo.  
Tentei deixar tudo o mais simples possível, então é meio auto-explicativo.  

Tentarei colocar o máximo possível de códigos neste site para complementar o que está no vídeo e para servir de referência para quem estiver estudando o assunto.  

O formato dos blocos de código são como mostrado abaixo:

{% capture _code %}{% highlight ruby linenos %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Douglas')
#=> prints 'Hi, Douglas' to STDOUT.
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

### Inspirações para a Criação do Canal

Eu me inspirei em vários canais para a criação do meu próprio canal. São dezenas, pra não dizer centenas de canais que eu gosto e que serviram de inspiração para a criação deste canal. No futuro pretendo fazer um lista com os principais canais que eu gosto.

### Acompanhe nas Redes Sociais

É importante se inscrever no canal do YouTube para que os algoritmos possam indicar os vídeos fazendo o canal crescer. O Manual do Código também está em outras redes sociais.  

Se inscreva no canal do YouTube clicando no botão abaixo:

<div class="home_wrapper">
    <div class="welcome-block">
        <div class="presentation">
            <div class="social-medias-links">
                <div><a href="{{ site.links.youtube }}?sub_confirmation=1" target="_blank" class="button-base youtube">Inscreva-se no YouTube</a></div> 
            </div>
        </div>
    </div>
</div>

<p>Acesse as redes sociais do Manual do Código através dos links abaixo.</p>

<div class="home_wrapper">
    <div class="welcome-block">
        <div class="presentation">                
            <div class="social-medias-links">
                <div><a href="{{site.links.youtube}}" target="_blank" class="button-base youtube-small">YouTube</a></div>
                <div><a href="{{site.links.github}}" target="_blank" class="button-base github">Github</a></div>
                <div><a href="{{site.links.twitter}}" target="_blank" class="button-base twiter">Twitter</a></div>
                <div><a href="{{site.links.facebook}}" target="_blank" class="button-base facebook">Facebook</a></div>
                <div><a href="{{site.links.instagram}}" target="_blank" class="button-base instagram">Instagram</a></div>
            </div>
        </div>
    </div>
</div>