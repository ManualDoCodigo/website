---
layout: page
title: "Como Configurar o C/C++ no VIM e NEOVIM em 2022 do ZERO."
date: 2022/01/12
type: video
description: Neste video mostro como configurar o Vim e o Neovim para programação em C/C++. Mostro como instalar um linter e fixer para adicionar várias funcionalidades para programação nessas linguagens.
entry_number: 221
youtube_video_id: UsgZ1V9KiUg
repository: 0221-vim-c-cpp
has_code: false
has_p5: false
tags: [vim, neovim, c, c++, cpp, ale, llvm, clang, clangd]
playlists: [Vim]
permalink: /vim-c-cpp/

related_videos:
  - title: "Configurando o Vim e Neovim do Zero."
    author: Douglas Diniz
    url: "/vim-config/"

reference_links:
  - title: "Instalação do LLVM no Linux"
    url: "https://apt.llvm.org/"
  - title: "Clang-Format Style Options"
    author: Clang
    url: "https://clang.llvm.org/docs/ClangFormatStyleOptions.html"
  - title: "clang-format-configurator"
    url: "https://zed0.co.uk/clang-format-configurator/"
  - title: "Getting started with Clang-Format Style Options"
    author: clangpowertools
    url: "https://www.clangpowertools.com/blog/getting-started-with-clang-format-style-options.html"
  - title: "ALE C Integration"
    url: "https://github.com/dense-analysis/ale/blob/master/doc/ale-c.txt"
  - title: "Using VIM as Cpp IDE"
    url: "https://xuechendi.github.io/2019/11/11/VIM-CPP-IDE-2019-111-11-VIM_CPP_IDE"
  - title: "How can I set .clang-format globally?"
    url: "https://github.com/clangd/coc-clangd/issues/39"

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: SeuNome
    url: "Divulgue seu site"
---

## Introdução

Nesta página vou mostrar como configurar o vim para o *C/C++*.
Esta configuração parte do princípio que você já tem o vim e neovim configurados.
Para isso assista o vídeo que eu fiz sobre como configurar o vim e neovim do zero.
A configuração básica do vim já vai habilitar a sintaxe highlight do C/C++.

O que temos que configurar então é o servidor de linguagem e o fixer.
O servidor de linguagem vai nos dar o auto-complete e todas as informações que um linter dá, o que é extremamente útil durante o desenvolvimento.
O fixer vai formatar o código automaticamente para ficar dentro dos padrões que queremos para o nosso código.

Usaremos as ferramentas do ***Clang*** (LLVM) para isso.
Ao instalar o *Llvm* no Windows e Linux já temos na linha de comandos várias ferramentas, incluindo o *"clangd"*, que é o servidor/linter, e o *"clang-format"* que é o fixer.

## Instalação do Clang

Para instalar o Clang eu já fiz um vídeo explicando como instalar no Windows. Veja o link abaixo:

- [https://youtu.be/3ov8OqSxlXc](https://youtu.be/3ov8OqSxlXc)

Para instalar no Ubuntu, rodamos o seguinte comando:

{% capture _code %}{% highlight plain linenos=table %}
bash -c "$(wget -O - https://apt.llvm.org/llvm.sh)"
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Tem que rodar o comando como sudo pra instalar o llvm no wls com ubuntu 20.04

Para testar rode o comando abaixo:

{% capture _code %}{% highlight plain linenos=table %}
clangd --version
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Se aparecer a versão então está tudo pronto para configurarmos o Vim.

Dependendo do sistema pode ser que o instalador apenas crie os binários com o número da versão, como *clang-13*, *clangd-13* e *clang-format-13*. Nesse caso você terá que criar links manualmente para o *clang*, *clangd*, etc.

No Linux às vezes o *clang-format* não é instalado junto na instalação principal, então nesse caso ele pode ser instalado com o *apt* com o comando abaixo:

{% capture _code %}{% highlight plain linenos=table %}
sudo apt install clang-format-13
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Troque o *-13* pela versão que tiver instalado as outras apliações. Se não colocar o *-13* no final, o *apt* poderá instalar uma versão diferente, o que não é indicado.

## Clangd - Servidor de linguagem e linter.

Para o Clangd vamos usar o *Coc* para fazer a integração. Podemos também usar o ALE, porém com o Coc podemos aproveitar o mapeamento do teclado para termos o "go to definition" e outros.

Para isso temos duas opções, instalar manualmente, adicionando as configurações no arquivo *coc-setting.json* ou usando o plugin ***coc-clangd***, que já faz tudo automático.

### Plugin coc-clangd

Este é o método que eu uso, pois é mais simples e o plugin já tem umas variáveis que podemos usar posteriormente.

Para instalar o plugin é só colocar a string *'coc-clangd'* na variável *coc_global_extensions*, conforme abaixo:

{% capture _code %}{% highlight plain linenos=table %}
let g:coc_global_extensions = ['coc-clangd']
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Na hora que eu falar sobre o *c++20* eu vou citar algumas variáveis deste plugin.

### Instalação manual

Só para referência, caso queira instalar manualmente adicione as linhas abaixo no arquivo de configuração do Coc ***"coc-settings.json"***, dentro do objeto ***"languageserver"***, como abaixo:

{% capture _code %}{% highlight plain linenos=table %}
"languageserver": {
    "clangd": {
        "command": "clangd",
        "rootPatterns": [".git/", "compile_flags.txt", "compile_commands.json"],
        "filetypes": ["c", "cc", "cpp", "c++", "objc", "objcpp"]
    },
},
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Apenas isso já ativa o Clangd nos arquivo C/C++ quando reiniciarmos o vim.
Podemos usar as comandos do Coc pra navegar no código.

## Desabilitar o C/C++ no ALE

O *ALE* já detecta automaticamente se o *clangd* existe no sistema e habilita o seu uso, porém estamos usando o *Coc* para fazer a integração. Desta forma é necessário desabilitar o C/C++ no ALE, caso contrário ele usará o clangd de forma paralela ao Coc, e caso fizermos alguma configuração, como usar o *c++20*, o ALE pode ficar com uma configuração diferente e mostrará erros indevidos. É importante que apenas um servidor fique ativo.

Então para desabilitar o C e C++ no ALE é só deixar essas configurações vazias na variável *ale_linters*, como abaixo:

{% capture _code %}{% highlight plain linenos=table %}
let g:ale_linters = {
\   'cpp': [],
\   'c': [],
\}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Isso faz com que o ALE não use nenhum linter para o C/C++. Apenas o Coc vai usar o Clangd.

Note que isso é relativo apenas ao linter. Continuaremos a usar o ALE na parte de fixer, que é o que falo na próxima seção.

## Clang-Format

Para o *clang-format* usaremos o *ALE*. Eu prefiro usar o ALE para os fixer pois é muito simples e podemos facilmente inserir as configurações para o clang-format.
Para instalar, basta adicionar o clang-format para as linguagens "c" e "cpp" na variável *ale_fixers*, que já está presente no arquivo do Vim, conforme exemplo abaixo:

{% capture _code %}{% highlight plain linenos=table %}
let g:ale_fixers = {
\   '*': ['trim_whitespace'],
\   'cpp': ['clang-format'],
\   'c': ['clang-format'],
\}
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Isso vai chamar o fixer toda vez que salvarmos um arquivo relativo a c e c++, incluindo headers.

Na sequência vamos adicionar as configurações para o *clang-format*, uma vez que existem uma infinidade de opções de formatar os códigos e isso vai do gosto.
Criamos uma seção de C/C++ no arquivo do vim e adicionamos a seguinte configuração:

{% capture _code %}{% highlight plain linenos=table %}
" C/C++ """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:ale_c_clangformat_options = '"-style={
\ BasedOnStyle: google,
\ IndentWidth: 4,
\ ColumnLimit: 100,
\ AllowShortBlocksOnASingleLine: Always,
\ AllowShortFunctionsOnASingleLine: Inline,
\ FixNamespaceComments: true,
\ ReflowComments: false,
\ }"'
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

A variável ***"ale_c_clangformat_options"*** do ALE serve justamente para enviarmos os parâmetros para o clang-format.
Então, seguindo a documentação do clang-format, enviamos as configurações num objeto chamado ***"style"***, conforme código acima.
Existem muitas opções, que podem ser visualizadas no site abaixo:

- [https://clang.llvm.org/docs/ClangFormatStyleOptions.html](https://clang.llvm.org/docs/ClangFormatStyleOptions.html)

Fique a vontade pra escolher o que prefere.
Abaixo existe um site que mostra como fica os vários tipos de estilos já previamente inseridos no clang-format e as alterações de cada uma das opções:

- [https://zed0.co.uk/clang-format-configurator/](https://zed0.co.uk/clang-format-configurator/)

No caso estou usando o estilo do google e adicionando algumas mudanças, como identação de 4 espaços, limite de coluna de 100, etc.

Também é possível usar um arquivo de configuração para o clang-format na raiz do projeto, o que em projetos maiores é mais recomendado. Quem tiver interesse dê uma pesquisada na documentação do Clang.

Com essas configurações temos o servidor de linguagem e o fixer prontos. Agora é só codificar. Ao salvar o código já é reformatado automaticamente.

## C++20 e outras configurações

O *Clang* suporta a linguagem C++20, que é a versão mais recente do C++ e também muitas outras opções.

É comum adicionarmos várias flags de compilação em um projeto, e seria interessante que o servidor de linguagem usasse essas mesmas flags para que as mensagens de erro ou warning fiquem corretas de acordo com as configurações que estamos usando.

Por exemplo, o padrão do Clang é o *c++14* em algumas versões, mas se estivermos usando novas funcionalidades do *c++20* por exemplo, o servidor de linguagem vai mostrar erro em todas as linhas que tiverem coisas relativas ao c++20, pois por padrão ele é configurado com c++14.

O *clangd* tem suporte a isso, e podemos conseguir esse comportamento de algumas formas, descritas nas sub-seções abaixo.

### Arquivo compile_flags.txt

Se adicionarmos um arquivo chamado *compile_flags.txt* na raiz do projeto, o *clangd* vai ler esses flags e usar em todas as compilações.

Esse arquivo deve conter uma flag de compilação por linha, como por exemplo:

{% capture _code %}{% highlight plain linenos=table %}
-xc++
-std=c++20
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

O *clangd* vai detectar esse arquivo e vai usar essas flags na hora de compilar o código para gerar as mensagens de diagnóstico. O que ele faz é mais ou menos isso:

{% capture _code %}{% highlight plain linenos=table %}
clang $FLAGS some_file.cc
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

No caso esse método é útil quando o projeto é simples e todos os arquivos vão usar as mesmas flags.

Mais detalhes no site abaixo:

[https://clangd.llvm.org/installation.html](https://clangd.llvm.org/installation.html)


### Arquivo .clangd

O *clangd* também detecta um arquivo chamado ***.clangd*** na raiz do projeto, e usa essas configurações para compilar o código.

Com esse arquivo é possível colocar vários tipos de configuração. Para habilitar o suporte ao *c++20* é necessário adicionar a flag ***-std=c++20***, conforme exemplo abaixo:

{% capture _code %}{% highlight plain linenos=table %}
CompileFlags:
  Add: [-std=c++20]
{% endhighlight %}{% endcapture %}{% include tools/fixlinenos.html %}
{{ _code }}

Mais detalhes sobre esse tipo de arquivo no site abaixo:

[https://clangd.llvm.org/config](https://clangd.llvm.org/config)


### Arquivo compile_commands.json

O arquivo ***compile_commands.json*** é o tipo de arquivo mais completo que o clangd detecta, e com ele é possível especificar configurações diferentes para cada arquivo.

Fica como lição de casa pesquisar sobre esse arquivo pois foge muito do assunto do vídeo.



