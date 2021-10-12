---
layout: page
title: "Windows Terminal para PROGRAMAÇÃO. Seja mais PRODUTIVO."
date: 2021/10/12
type: video
description: Neste vídeo mostro como instalar e configurar o Windows Terminal. O Windows Terminal é uma das melhores escolhas de terminal no Windows, se não for a melhor. Com ele é possível criar várias abas e várias janelas (panes) dentro de uma aba.
entry_number: 216
youtube_video_id: kfQcJOJeyQg
repository: 0216-windows-terminal
has_code: false
has_p5: false
tags: [windows terminal, terminal, shell, nerdfont, hack font, vim, neovim]
playlists: [Vim]
permalink: /windows-terminal/

reference_links:
  - title: "5 tips for an awesome Windows Terminal experience"
    url: "https://endjin.com/blog/2020/05/5-tips-for-an-awesome-windows-terminal-experience"
  - title: "Adding Reaction Gifs for your Build System and the Windows Terminal"
    url: "https://www.hanselman.com/blog/adding-reaction-gifs-for-your-build-system-and-the-windows-terminal"
  - title: "Custom actions in Windows Terminal"
    url: "https://docs.microsoft.com/pt-br/windows/terminal/customize-settings/actions"
  - title: "Nerd Fonts"
    url: "https://www.nerdfonts.com/"
  - title: "Nerd Fonts - Hack"
    url: "https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/Hack"

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

## Introdução

Neste artigo mostrarei como instalar e configurar o Windows Terminal.
O Windows Terminal é uma das melhores escolhas de terminal no Windows, se não for a melhor.
Com ele é possível criar várias abas e várias janelas (panes) dentro de uma aba. E com o mapeamento do teclado fica muito fácil alternar entre as abas e janelas.
O resultado final fica semelhante a um tmux (mais básico).
Pra mim é a melhor opção pra usar o Vim pois tudo fica bonito e responsivo. Para usar o Wsl também pra mim é a melhor opção.

## Instalação

A instalação do Windows Terminal é feita pela loja da Microsoft. No Windows 10 você pode buscar por "store" na busca do Windows para encontrar a loja.
Dentro da loja é só pesquisar por Windows Terminal, conforme foto abaixo:

<img src="/pages_data/{{page.repository}}/store.jpg" style="opacity:0.9;" alt="Microsoft Store"/>

Na foto acima o Windows Terminal é a primeira opção da esquerda.
Para instalar o Windows Terminal pela Microsoft Store é necessário ter um conta na Microsoft.
Ao entrar na página do Windows Terminal é só clicar em ***Install***. Na figura abaixo o botão está com ***Launch*** pois eu já instalei o Windows Terminal.

<img src="/pages_data/{{page.repository}}/store2.jpg" style="opacity:0.9;" alt="Microsoft Terminal"/>

Depois da instalação é só abrir normalmente. Aconselhe deixar um link na barra de tarefas para ficar fácil o acesso, umas vez que nós programadores usamos bastante o terminal.

## Nerd Font

Antes de começar a configurar o Windows Terminal, é necessário instalar uma Nerd Font. As Nerd Fonts são fonts preparadas para o pessoal de programação que quer ter fontes legais nos terminais com muitos ícones para serem usados pelas aplicações. 
Notavelmente o Vim e o Neovim usam as Nerdfonts em vários plugins para mostrar ícones na tela e assim deixar a parte visual bem mais legal.
Existem várias fontes, as quais podem ser vistas no site oficial abaixo:

[https://www.nerdfonts.com/](https://www.nerdfonts.com/)

Aqui vou mostrar como instalar no Windows, o que também vai servir para o WSL quando usamos pelo Windows Terminal.
A fonte que eu mais gosto é a ***Hack***, que pode ser baixada no repositório abaixo:

[https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/Hack](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/Hack)

Porém já deixei o link abaixo com o arquivo zipado com todas as fontes:

[https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/Hack.zip](https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/Hack.zip)

Instale todas que tenha o ***"Windows Compatible"*** no nome.

Uma vez instalada a fonte podemos começar a configurar o Windows Terminal.

## Configuração do Windows Terminal

Na barra no topo do Windows Terminal temos que abrir o ***Settings***, que pode ser acessado clicando no ícone com uma flechinha, conforme imagem abaixo:

<img src="/pages_data/{{page.repository}}/wt1.jpg" style="opacity:0.9;" alt="Windows Terminal"/>

## Startup

Na seção **Startup** o mais importante é deixar o **Windows Powershell** como padrão, pois é o melhor pra programação geral, com o Vim por exemplo. Eu deixo para iniciar maximizado e o tamanho deixo 120x30, conforme imagem abaixo:

<img src="/pages_data/{{page.repository}}/wt2.jpg" style="opacity:0.6;" alt="Windows Terminal"/>

## Interaction

Nesta seção deixo tudo como padrão. A parte que vai mais do gosto é a **"Tab switcher interface style"**. Minha configuração é:

<img src="/pages_data/{{page.repository}}/wt3.jpg" style="opacity:0.6;" alt="Windows Terminal"/>

## Appearance

Aqui vai bem do gosto. Eu gosto de deixar o tamanho das tabs o mesmo pra todas as tabs. Minha configuração é:

<img src="/pages_data/{{page.repository}}/wt4.jpg" style="opacity:0.6;" alt="Windows Terminal"/>

## Color schemes

O meu esquema de cores é o ***Campbell***, que acho que é o padrão:

<img src="/pages_data/{{page.repository}}/wt5.jpg" style="opacity:0.6;" alt="Windows Terminal"/>

## Rendering

Aqui deixo as duas opções desabilitadas:

<img src="/pages_data/{{page.repository}}/wt6.jpg" style="opacity:0.6;" alt="Windows Terminal"/>

## Actions

Aqui é onde alteramos os atalhos para as várias funcionalidades que o Windows Terminal disponibiliza. No meu caso eu deixei o padrão, pois acabou que não conflitou com nada sério dos meus atalhos do Vim e Tmux. Mas se no seu caso tiver algum conflito com um atalho que você não quer mudar, é só alterar no *Json* seguindo os passos do site abaixo:

[https://docs.microsoft.com/pt-br/windows/terminal/customize-settings/actions](https://docs.microsoft.com/pt-br/windows/terminal/customize-settings/actions)

Os principais atalhos vou citar em uma seção mais abaixo.

## Profiles - Windows Powershell

Aqui é onde fica as principais configurações da parte visual. Existem 3 abas nesta configuração, a *General*, *Appearance* e *Advanced*. O principal está na Appearance. 
Aqui vou mostrar falar apenas do Windows Powershell, porém para os outros terminals como o *Command Prompt*, *Azure*, etc, é a mesma coisa.

### General

Aqui tem as configurações mais básicas. Uma configuração legal é a *Starting directory* onde podemos colocar a pasta que o terminal começa. Podemos colocar a pasta de um projeto que estamos trabalhando ou uma pasta que mais acessamos. Minhas configurações:

<img src="/pages_data/{{page.repository}}/wt7.jpg" style="opacity:0.6;" alt="Windows Terminal"/>

### Appearance

Aqui é onde fica as principais configurações gráficas, onde setamos a fonte e a imagem de fundo.

No *Font face* escolha a Nerd Font que instalamos. No meu caso é a ***Hack NF***. Essa é uma das configurações mais importantes.

Tamanho eu deixo em 12, mas podemos mudar a qualquer momento com *Ctrl+numpad_add* ou *Ctrl+numpad_minus*.

Em *Background image* é onde você escolhe a imagem de fundo. O *Stretch mode* eu deixo em *Uniform to fill*. *Alignment* no meio. *Opacity* em 25%.
Minhas configurações:

<img src="/pages_data/{{page.repository}}/wt8.jpg" style="opacity:0.6;" alt="Windows Terminal"/>
<img src="/pages_data/{{page.repository}}/wt9.jpg" style="opacity:0.6;" alt="Windows Terminal"/>
<img src="/pages_data/{{page.repository}}/wt10.jpg" style="opacity:0.6;" alt="Windows Terminal"/>
<img src="/pages_data/{{page.repository}}/wt11.jpg" style="opacity:0.6;" alt="Windows Terminal"/>

Para quem quiser essa imagem de fundo que eu uso, vou deixar ela aqui. É só clicar para abrir em outra janela, ou baixar daqui mesmo:

[Imagem de Fundo do Manual do Código](../pages_data/{{page.repository}}/back.png)

### Advanced

Aqui deixo no padrão. Minhas configurações:

<img src="/pages_data/{{page.repository}}/wt12.jpg" style="opacity:0.6;" alt="Windows Terminal"/>

## Principais atalhos do teclado

O Windows Terminal tem vários atalhos para realizar várias tarefas. 
Dentro do Windows Terminal a ***Window*** é a janela do terminal como um todo. Uma ***Tab*** é uma instância do terminal que podemos alterar pela abas no topo. Um ***Pane*** é uma divisão do terminal (um split) dentro de uma aba (tab). Podemos dividir a tela com mais de um terminal na horizontal ou na vertical. Isso é muito útil para ter mais de um terminal acessível na mesma tela. Podemos redimensionar os Panes da forma que desejarmos.

### Criação de Tabs (abas)

Podemos criar uma nova Tab clicando no botão ***+*** na barra no topo da janela, ou usar *Ctrl+Shift+t*.

### Alternar entre as Tabs

Para navegar entre as Tabs usamos o *Ctrl+Tab*.

### Criação de Panes (splits)

Para criar um pane na horizontal, usamos os *Alt+Shift+-*.

Para criar um pane na vertical, usamos os *Alt+Shift+Plus*. 

Para remover um pane usamos o *Ctrl+Shift+w*.

### Navegação entre os Panes

Para navegar entre os panes seguramos o *Alt* e usamos as setinhas.

Para navegar para cima usamos o *Ctrl+Up*.

Para navegar para baixo usamos o *Ctrl+Down*.

Para navegar para a esquerda usamos o *Ctrl+Left*.

Para navegar para a direita usamos o *Ctrl+Right*.

### Redimensionamento dos Panes

Para redimensionar um Pane seguramos os *Alt+Shift* e usamos as setinhas. Note que todos os panes na fila ou coluna são redimensionados.

Para aumentar para cima usamos *Alt+Shift+Up*.

Para aumentar para baixo usamos *Alt+Shift+Down*.

Para aumentar para a esquerda usamos *Alt+Shift+Left*.

Para aumentar para a direita usamos *Alt+Shift+Right*.

### Modo fullscreen

Para deixar o terminal fullscreen é só alternar usando o *F11*.

## Quake Window

O Windows Terminal habilita o que chamamos de ***Quake Window***, que é um terminal que aparece no topo da tela para inserirmos algo rapidamente. 

A Quake Windows é chamada com o comando *Win+`*.