---
layout: page
title: "Configurando o PYTHON no VIM e NEOVIM do ZERO."
date: 2023/02/30
type: video
description: Neste video mostro como configurar o Vim e o Neovim para programação em Python. Mostro como instalar um linter e fixer para adicionar várias funcionalidades para programação em Python.
entry_number: 241
youtube_video_id: kfQcJOJeyQg
repository: "0241"
has_code: false
has_p5: false
tags: [python, vim, neovim]
playlists: [Vim]
permalink: /vim-python/

related_videos:
  - title: "Configurando o Vim e Neovim do Zero."
    author: Douglas Diniz - Manual do Código
    url: "/vim-config/"

reference_links:

  - title: "ALE Python Integration - Documentação"
    url: "https://github.com/dense-analysis/ale/blob/master/doc/ale-python.txt"
  - title: "Video sobre Linters e Fixer para Python no Vim"
    url: "https://www.youtube.com/watch?v=4FKPySR6HLk"
  - title: "Jedi Plugin"
    url: "https://github.com/davidhalter/jedi-vim"
  - title: "Jedi Documentation"
    url: "https://buildmedia.readthedocs.org/media/pdf/jedi/latest/jedi.pdf"
  - title: "Jedi Settings"
    url: "https://jedi.readthedocs.io/en/latest/docs/settings.html"
  - title: "Plugin do Flake8"
    url: "https://github.com/nvie/vim-flake8"
  - title: "Plugin do Pyright"
    url: "https://github.com/microsoft/pyright"
  - title: "Pyright Settings"
    url: "https://github.com/microsoft/pyright/blob/main/docs/settings.md"
  - title: "Plugin do Black"
    url: "https://github.com/psf/black"
  - title: "Documentação do Black"
    url: "https://black.readthedocs.io/en/stable/index.html"
  - title: "Black Code Style"
    url: "https://black.readthedocs.io/en/stable/the_black_code_style/current_style.html"
  - title: "Plugin do Isort"
    url: "https://github.com/PyCQA/isort"
  - title: "Config do Isort no Stack Overflow"
    url: "https://stackoverflow.com/questions/64859920/how-to-run-isort-via-ale-in-vim"
  - title: "Try isort from your browser!"
    url: "https://pycqa.github.io/isort/docs/quick_start/0.-try.html"
  - title: "Plugin do YAPF"
    url: "https://github.com/google/yapf"
  - title: "Format Python Code Using YAPF"
    url: "https://leimao.github.io/blog/YAPF-Quick-Tutorial/"
  - title: "Config do Vim com várias variáveis usadas no vídeo"
    url: "https://code.novarumcloud.com/projects/SEG/repos/zsh_dotfiles/raw/.config/nvim/init.vim?at=refs%2Fheads%2Fmaster"


contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
---

## Introdução

Nesta página vou mostrar como configurar o vim para o Python.
Esta configuração parte do princípio que você já tem o vim e neovim configurados.
Para isso assista o vídeo que eu fiz sobre como configurar o vim e neovim do zero.
A configuração básica do vim já vai habilitar a sintaxe highlight do Python.

O que temos que configurar então é o auto-complete, os linters e os fixers.
O fixer vai formatar o código automaticamente para ficar dentro dos padrões que queremos para o nosso código.

Para os Linters usaremos o ***Flake8***, o ***Pyright*** e o ***Bandit***.
Para o auto-complete usaremos o ***Jedi***.
Para os fixers usaremos o ***Black*** e o ***Isort***.

Neste vídeo vou mostrar as configurações que eu uso, mas fique livre para usar a estrutura que vou mostrar aqui para depois escolher outras ferramentas caso preferir.

## Linters

Para os Linters usaremos o ***Flake8***, o ***Pyright*** e o ***Bandit***.

### Flake8

O ***Flake8*** é o principal linter que usaremos para o Python. Ele é que vai gerar as principais mensagens de erro e avisos.

Existem outras opções, como o *Pylint*, porém hoje em dia o meu preferido é o ***Flake8***.

O site do Flake8 é:

[https://github.com/nvie/vim-flake8](https://github.com/nvie/vim-flake8)

É necessário que o Flake8 esteja instalado no seu sistema. Para isso basta instalar usando o pip, como no comando abaixo:

{% capture _code %}{% highlight plain linenos=table %}
pip install flake8
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Após a instalação reinicie o terminal e verifique se o *flake8* está acessível no seu PATH.

Para usarmos o *flake8* usaremos o ***ALE***, que já mostrei como instalar no vídeo de configurações básicas do Vim. Temos então que adicionar a linguagem Python nos Linters do ALE.

{% capture _code %}{% highlight plain linenos=table %}
let g:ale_linters = {
\   'python': ['flake8'],
\}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Adicionando o Python nos Linters do ALE, agora podemos usar o *flake8* no nosso código. Após reiniciar o Vim/Neovim já teremos os diagnósticos do *flake8* no nosso código.

O próximo passo é configurarmos o *flake8* para adaptarmos as mensagens para o nosso gosto ou para a configuração de algum projeto que estamos fazendo.

Como o flake8 é uma aplicação na linha de comando, temos que passar as configurações como parâmetro na hora que rodamos a aplicação. Convenientemente o *ALE* já possue uma variável própria específica para as configurações do flake8, chamada ***ale_python_flake8_options***.

Abaixo então está a configuração que eu uso para o *flake8*.


{% capture _code %}{% highlight plain linenos=table %}
" Python """"""""""""""""""""""""""""""""""""""""""""""
let g:ale_python_flake8_options = '--max-line-length=100 --extend-ignore=E203'
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

O que eu fiz então foi o seguinte, primeiro criei uma seção para o Python no arquivo de configuração, conforme faço no vídeo de configurações básicas do Vim.

A variável ***ale_python_flake8_options*** espera uma string com as configurações que queremos para o *flake8*. Você pode ver mais configurações no site do flake8 que mostrei mais acima.

A configuração *--max-line-length=100* configura o flake8 para considerar as linhas de código com tamanho de 100 caracteres. No vídeo de configurações básicas do Vim eu citei que uso 100 colunas nas linhas, então os linters tem que refletir essa escolha. Cada Linter pode ter um tamanho diferente como padrão, então no geral essa é uma configuração que sempre aparece nos Linters.

A configuração *--extend-ignore=E203* configura o flake8 para ignorar espaços vazios entre o *":"* em um range, pois os fixers geralmente colocam um espaço e o flake8 reclama disso.

Essa é a estrutura de configuração para o *flake8*. Agora é só adicionar outras configurações caso precise.

### Pyright

O *Pyright* é um linter faz a checagem de tipos no código Python. O Python possui suporte para anotarmos os tipos das variáveis, então o *Pyright* vai checar se as variáveis estão com os tipos corretos.

O site do Pyright é:

[https://github.com/microsoft/pyright](https://github.com/microsoft/pyright)

Essa anotação de tipos no Python serve apenas para documentação e leitura do código, e não é usada pelo interpretador para forçar os tipos, pois o Python tem tipagem dinâmica. Porém com o *Pyright* podemos encontrar possíveis erros no código pois ele faz essa checagem de tipo. Então se, por exemplo, anotarmos uma variável como sendo string, e posteriormente colocarmos um número nela, o Pyright vai acusar um erro. Isso pode ser muito útil para encontrarmos bugs chatos de achar.

O Pyright precisa ser instalado no *PATH* do sistema, e temos que instalar com o npm:

{% capture _code %}{% highlight plain linenos=table %}
npm install -g pyright
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Após reiniciar o terminal, verifique se o *pyright* está acessível no seu PATH.

O próximo passo é adicionarmos o *pyright* no *ALE* como fizemos com o *flake8*.

{% capture _code %}{% highlight plain linenos=table %}
let g:ale_linters = {
\   'python': ['flake8', 'pyright'],
\}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Eu não utilizo nenhuma configuração específica para o *Pyright* no *ALE*, mas você pode adicionar as configurações que quiser. É só dar um procurada nas variáveis do *ALE* e adicionar as configurações.

### Bandit

O ***Bandit*** é um linter para Python que faz a checagem de vulnerabilidades de segurança. Ele verifica se o código está vulnerável a algum tipo de ataque, coisas relacionadas com senhas, etc.

O site do ***Bandit*** é:

[https://github.com/PyCQA/bandit](https://github.com/PyCQA/bandit)

Para instalarmos o *bandit* é só instalarmos através do *pip*:

{% capture _code %}{% highlight plain linenos=table %}
pip install bandit
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Após a instalação, devemos adicionar o *bandit* no *ALE* como fizemos com o *flake8*.

{% capture _code %}{% highlight plain linenos=table %}
let g:ale_linters = {
\   'python': ['flake8', 'pyright', 'bandit'],
\}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Também não utilizo nenhuma configuração específica para o *bandit* no *ALE*, mas você pode adicionar as configurações que quiser. É só dar um procurada nas variáveis do *ALE* e adicionar as configurações caso for necessário para você.

## Auto-Complete

Para o auto-complete vamos usar o ***jedi-vim***. Não usaremos o *Coc* aqui, pois o *jedi-vim* já faz toda a parte de auto-complete sozinho.

O site do jedi é:

[https://github.com/davidhalter/jedi-vim](https://github.com/davidhalter/jedi-vim)

A instalação é apenas pelo plugin do *jedi-vim*, que pode ser instalado com a linha abaixo:

{% capture _code %}{% highlight plain linenos=table %}
Plug 'davidhalter/jedi-vim'
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Apenas a instalação do plugin já faz o auto-complete funcionar. Não é preciso configurar nada.

## Fixers

Para os fixers vamos usar o ***black*** e o ***isort***.

### Black

O ***black*** é o fixer mais usado no momento e que pra mim traz o melhor resultado. Toda vez que salvarmos o código, o ***black*** vai fazer a formatação do código automaticamente.

O site do black é:

[https://github.com/psf/black](https://github.com/psf/black)

Primeiramente é preciso instalar o *black* usando o *pip*:

{% capture _code %}{% highlight plain linenos=table %}
pip install black
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Com isso o *black* fica disponível no *PATH* do sistema.

O próximo passo é adicionar o *black* no *ALE*, na seção de fixers, como abaixo:

{% capture _code %}{% highlight plain linenos=table %}
let g:ale_fixers = {
\   '*': ['trim_whitespace'],
\   'python': ['black'],
\}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Adicionamos então a linguagem Python e colocamos o *black*.

Após reiniciar o Vim, é só salvar um arquivo Python para que o *black* faça a formatação.

O *black* possui uma configuração padrão, porém vamos mudar algumas coisas.
O *ALE* possui a variável *ale_python_black_options*, onde podemos adicionar as opções do black que desejarmos. O site abaixo possui a documentação do *black*:

{https://black.readthedocs.io/en/stable/the_black_code_style/current_style.html}(https://black.readthedocs.io/en/stable/the_black_code_style/current_style.html)

Então colocamos na seção do Python que criamos anteriormente a configuração do *black*:

{% capture _code %}{% highlight plain linenos=table %}
  let g:ale_python_black_options = '--line-length 100'
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

No caso alterei apenas o tamanho da linha para 100 caracteres, mas você pode adicionar mais opções se precisar.

## Isort

O ***isort*** é um fixer que organiza os imports do código, deixando tudo padronizado. O site abaixo mostra os detalhes do *isort*:

[https://github.com/PyCQA/isort](https://github.com/PyCQA/isort)

É necessário instalar o *isort* usando o *pip*:

{% capture _code %}{% highlight plain linenos=table %}
pip install isort
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Isso irá instalar o *isort* no *PATH* do sistema.

Em seguida devemos adicionar o *isort* no *ALE*, na seção de fixers, como abaixo:

{% capture _code %}{% highlight plain linenos=table %}
let g:ale_fixers = {
\   '*': ['trim_whitespace'],
\   'python': ['black', 'isort'],
\}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Para finalizar devemos adicionar a configuração do *isort* no ALE, onde já existe uma variável chamada ***ale_python_isort_options***, que pode ser adicionada como abaixo:

{% capture _code %}{% highlight plain linenos=table %}
let g:ale_python_isort_options = '--profile black -l 100'
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Adicione esta linha na seção do Python que criamos anteriormente, junto com as outras configurações.

Nesta configuração informamos ao *isort* que estamos usando o *black* para fazer a formatação do código e que o tamanho da linha é 100 caracteres.

Com isso o *isort* está pronto para ser usado.

### Remaps

Para os remaps vou adicionar apenas um comando que eu uso que serve para rodar o script atual automaticamente.

Então ao invés de rodar o script manualmente, eu uso apenas a sequência ***tp*** para rodar o arquivo no qual o cursor se encontra no momento.

Para isso colocamos a linha abaixo na seção do Python no arquivo de configuração:

{% capture _code %}{% highlight plain linenos=table %}
nnoremap tp :!python %<cr>
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Desta forma, ao rodar a sequência ***tp***, o arquivo que o cursor está no momento será executado.
