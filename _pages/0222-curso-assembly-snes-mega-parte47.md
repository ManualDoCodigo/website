---
layout: page
title: "Ambiente de Programação para SNES e MEGA DRIVE em 2022"
date: 2022/02/10
type: video
description: Neste episódio vou mostrar o ambiente de programação que usaremos em 2022 nesta série de vídeos sobre SNES e MEGA DRIVE. Estou renomeando esta série para Retro Level Programming.
entry_number: 222
youtube_video_id: rgt7bDrmv3o
repository: "0222"
has_code: false
has_p5: false
tags: [Assembly, Snes, Mega Drive, vim, neovim, ide, bass, lsp]
playlists: [Curso de Assembly com Snes e Mega Drive]
permalink: /curso-assembly-snes-mega-parte47/

reference_links:
  - title: "Repositório - Retro Level Programming"
    url: "https://github.com/Dgdiniz/retro-level-programming"
  - title: "Repositório - Bass"
    url: "https://github.com/Dgdiniz/bass"
  - title: "Repositório - Basslsp"
    url: "https://github.com/Dgdiniz/bass-lsp"
  - title: "Repositório - bass-syntax-vim"
    url: "https://github.com/Dgdiniz/bass-syntax-vim"
  - title: "Repositório - Bsnes-Plus"
    url: "https://github.com/Dgdiniz/bsnes-plus"
  - title: "Repositório - Bsnes_v086"
    url: "https://github.com/Dgdiniz/bsnes_v086-source"
  - title: "Repositório - Exodus"
    url: "https://github.com/Dgdiniz/exodus"

contributions:
  - title: "Adicione sua contribuição fazendo um pull request"
    author: "Seu Nome"
    url: "/contribuacomosite/"
---

### Introdução

Neste vídeo vou mostrar o ambiente de programação que iremos usar para a programação de consoles antigos no ano de 2022.

Esse setup será usado pelo menos durante o primeiro semestre, e posteriormente a isso farei um outro vídeo caso alterarmos alguma coisa no ambiente.


## Instalação do Assembler Bass

Nesta série usamos o assembler ***Bass*** como assembler principal para todos os sistemas. Ele suporta Snes, Mega Drive e muitos outros sistemas.

Em 2022 utilizaremos a versão ***v18*** com algumas modificações que eu fiz. As modificações são a inclusão de *LSP (Language Server Protocol)*, para que tenhamos mensagens de diagnósticos no editor, e também adicionei a sintaxe de lista de registradores para a instrução *MOVEM*. Falarei mais sobre essas features em vídeos futuros. Assista o vídeo deste episódio para ver mais detalhes.

Para instalar o *Bass* temos primeiramente que baixar o último release do repositório abaixo:

[https://github.com/Dgdiniz/bass/releases](https://github.com/Dgdiniz/bass/releases)

No momento o último release é o *bass-doug-2022-02-07*, mas baixe o último que encontrar.

Após descomprimir o pacote copie o arquivo *bass.exe*, que se encontra na pasta *bass/out* para uma pasta que seja visível no ***Path*** do sistema. Existem binários para Windows e Linux.

No Windows eu particularmente crio a pasta *C:\bin* e incluo essa pasta no ***Path*** do Windows (veja o vídeo caso não saiba como fazer isso).

No Linux é só copiar para alguma pasta que seja visível no ***Path*** do sistema.

Também é necessário copiar a pasta *bass/data/architectures* para o mesmo diretório onde está o *bass.exe*. Isso é necessário para que o *Bass* reconheça as arquiteturas de cada sistema.

Após isso o comando *bass* já deve funcionar no terminal. Teste para garantir, pois os scripts chamarão o *Bass* para compilar os códigos.

*Caso não queira instalar o release pré-compilado, basta baixar o código fonte do repositório do Bass e compilar seguindo as instruções do repositório:*

[https://github.com/dgdiniz/bass](https://github.com/dgdiniz/bass)


### Estruturas de Pastas

Nesta série vou colocar todos os tutoriais, projetos, debuggers, ferramentas, etc, em uma única pasta, dividida por sistemas.

Já coloquei no Github um repositório para esta pasta, onde já coloquei todos os tutoriais que fiz até o momento. Acesse o link abaixo e faça o clone do repositório:

[https://github.com/Dgdiniz/retro-level-programming](https://github.com/Dgdiniz/retro-level-programming)

Aqui eu clonei em uma pasta chamada *assembly*, então dentro dela ficará a pasta *retro-level-programming* e as pastas de outros projetos relacionadas a esta série de vídeos. Por exemplo, se eu for mexer no código do Bass eu irei clonar dentro desta pasta *assembly*, pois assim todos os repositórios ficam juntos. Mas o que importa neste episódio é a pasta *retro-level-programming*.

Na raíz dessa pasta existe uma pasta por sistema, então terá um pasta chamada *snes*, outra *megadrive*, outra *nes* e assim por diante. Existem também uma pasta chamada *tools* que conterá as ferramentas globais que iremos implementar ao longo do tempo.

Dentro da pasta de cada sistema existe a seguinte estrutura de pastas:

  - ***debuggers***: Esta pasta contém todos os debuggers que iremos usar para o sistema em questão. As pastas devem ter os momes corretos pois os scripts chamarão os binários. Ver seção de Debuggers mais abaixo. Esta página contém um *.gitignore* pois esses debuggers são repositórios separados.
  - ***projects***: Aqui ficarão todos os projetos que iremos fazer para o sistema em questão. O projetos diferem dos tutoriais porque eles são mais complexos e possuem elementos gráficos.
  - ***tools***: Aqui ficarão ferramentas que iremos implementar para cada sistema.
  - ***tutorials***: Aqui ficam os códigos mais simples, que explicam conceitos ensinados nos vídeos. Não é um projeto grande, apenas códigos simples para explicar determinado assunto, instrução, etc.

Nas pastas dos projetos e dos tutoriais existem arquivos *.gitignore* nas pastas onde ficam os binários gerados para que não entrem no repositório. Caso em algum projeto específico queira adicionar algum arquivo que está sendo descartado, é só adicionar a regra no *.gitignore* correspondente.


### Debuggers

Os debuggers continuarão os mesmos que já vínhamos utilizando, sendo o ***Bsnes-v086*** e o ***Bsnes-Plus*** para o *Snes* e o ***Exodus*** para o Mega Drive.

Para o *Bsnes-v086* temos o debugger *bass_v086-source* e o emulador normal *bass_v086-64bit*. Como já foi explicado em outro episódio, o emulador normal *bass_v086-64bit* serve para quando queremos chegar a uma determinada parte do jogo para debugarmos, pois o emulador roda a 60fps, sendo que o debugger é muito mais lento. Como os saves são compatíveis, podemos chegar próximo da parte que queremos debugar com o emulador normal, salvamos e abrimos o save no debugger. Já o *bsnes-plus* não tem essas questões pois ele já roda a 60fps sempre (se tiver um computador razoável).

As últimas versões você consegue baixar nos repositórios do *Github*.

O *Bsnes-v086* você encontrar no link:

[https://github.com/ManualDoCodigo/debugger-snes](https://github.com/ManualDoCodigo/debugger-snes)

O *Bsnes-Plus* você encontrar no link:

[https://github.com/ManualDoCodigo/bsnes-plus](https://github.com/ManualDoCodigo/bsnes-plus)

O *Exodus* você encontrar no link:

[https://github.com/ManualDoCodigo/Exodus](https://github.com/ManualDoCodigo/Exodus)

Após baixar todos os arquivos, descompacte nas pastas *debuggers* de cada sistema. O nome aqui é importante, pois os scripts que fazem os builds acessam já considerando que os caminhos estão corretos. Para tirar a dúvida assista o vídeo do episódio ou acesse os scripts de build em cada pasta tutorial ou projeto para ver o caminho correto. Os arquivos compactados já contém internamente a pasta raiz com o nome correto.

Para referência, no *Snes* a pasta *debuggers* deve conter as seguintes pastas:

- bsnes-plus
- bsnes_v086-source
- bsnes_v086-64bit

Para referência, no *Megadrive* a pasta *debuggers* deve conter as seguintes pastas:

- Exodus

Na primeira vez que abrir o Exodus, vá no menu *Settings/Plataform Settings* e na opção *Load Workspace on Startup* escolha o arquivo na pasta *Workspace/RetroLevelProgramming.xml*. Desta forma o workspace é carregado automaticamente quando o debugger é iniciado.

Todas as pastas *debuggers* contém um arquivo *.gitignore* que exclui os debuggers do repositório, então podemos colocar as pastas sem problemas que não vai interferir no git deste repositório.


## IDE, Sintax Highlight e LSP

Nesta série de vídeos eu utilizo o ***Neovim*** como o meu editor de preferência, e utilizo plugins para habilitar a *sintax highlight* e o *Lsp para os projetos do *Bass* com os vários sistemas que ele suporta.

Eu ainda não portei esses plugins para o *Vscode*, mas em breve também será possível utilizá-lo para programar as aplicações para os consoles antigos.

Se você quer utilizar o *Vim* ou o *Neovim* mas não tem muita experiência com esse editor, eu tenho uma playlist sobre *Vim* e *Neovim* que você pode assistir no link:

[Playlist de Vim e Neovim](https://www.youtube.com/playlist?list=PLLFRf_pkM7b6yumQdi_C6sf6mpludszTf)

Nesta playlist eu começo do zero, para quem é iniciante mesmo no Vim.

Bom, supondo que você irá utilizar o Vim como editor para esta série, é necessário instalar dois plugins que se encontram na minha conta do *Github*:

[https://github.com/dgdiniz/bass-syntax-vim](https://github.com/dgdiniz/bass-syntax-vim)

[https://github.com/dgdiniz/bass-lsp](https://github.com/dgdiniz/bass-lsp)

Os repositórios tem mais informações.

Para instalar no Vim é só inserir os dois plugins conforme mostrado abaixo. Aqui estou usando o *Plug* como gerenciador de plugins.

```
Plug 'dgdiniz/bass-syntax-vim'
Plug 'dgdiniz/bass-lsp', { 'do': 'npm install && npm link --force'  }
```

Depois é só rodar o comando *:PlugInstall* para instalar os plugins. Reinicie após a instalação.

Para que o *Lsp* funcione sempre abra o Vim no diretório raiz do projeto, que contém o arquivo *main.asm*.

Quando o *Lsp* for usado, é gerado um arquivo chamado *tempbasslsp.bin*. Este arquivo pode ser ignorado e não entra na estrutura do Git. É um arquivo temporário que o Lsp usa e em versões futuras provavelmente esse comportamento será modificado.

Outra configuração interessante é fazer um *remap* no vim para rodar o script de build automaticamente, sem precisar abrir outro terminal ou rodar o script *.bat* manualmente. Para isso adiciona as seguintes linhas no seu arquivo de configuração do Vim ou Neovim:

```
" Assembly """""""""""""""""""
nnoremap tb :!build-bsnes-plus
```

Aqui eu mapeei o comando *tb* para o comando *:!build-bsnes-plus*. Desta forma é só digitar *tb* e dar Enter e o script de build será executado automaticamente. Escolha a sequência que preferir, mas aqui estou seguindo o padrão que defini naquela série de Vim que tenho no canal. Se preferir troque o script para iniciar o debugger v086 ao invés do bsnes-plus.

No final o *Vim* e o *Neovim* ficarão como mostra a figura abaixo:

<img src="/pages_data/{{page.repository}}/basslsp.gif" style="opacity:0.7;"/>


## Arquivo main.asm

Nesta série eu estou colocando como recomendado sempre nomear o arquivo principal do projeto como *main.asm* para que o mesmo seja reconhecido pelo *Lsp*.

Nesses projetos em assembly nós sempre compilamos apenas um arquivo (no caso o *main.asm*) e todos os outros arquivos são incluídos no arquivo principal usando diretivas *include*, que veremos melhor em episódios futuros.

Portanto este arquivo principal deve se chamar *main.asm*.

Se quiser usar outro nome terá que mudar os scripts de build, pois eles já supõe que o nome é *main.asm*. Se usar outro nome o *Lsp* não funcionará, pois internamente ele tenta compilar o arquivo chamado *main.asm*.

Desta forma todos os projetos e tutoriais ficam padronizados.

## Extensões de arquivos

O plugin do vim *bass-syntax-vim* detecta várias tipos extensões, e aplica a sintaxe de acordo com o sistema.

Os arquivos ***.asm*** são reconhecidos como o formato *bass*, que é um formato mais genérico que serve pra qualquer tipo de sistema.

Se quiser que o Vim use a sintaxe do *Snes*, com todas cores e palavras chaves, o arquivo tem que ser nomeado com a extensão ***.snes.asm***. Por exemplo *projeto.snes.asm*. A extensão ***.snes.inc*** também pode ser usada.

Para o *Mega Drive* é necessário usar a extensão ***.megadrive.asm*** ou ***.md.asm***. As extensões ***.megadrive.inc*** ou ***.md.inc*** também podem ser usadas.

No repositório do plugin é possível ver todos os detalhes.

Também é possível usar apenas a extensão ***.asm*** e indicar dentro do arquivo qual o sistema que o Vim deve usar. Para isso é necessário colocar a seguinte linha no topo do arquivo:

```
// vim: ft=snes
```
O *ft* é o *filetype* e *snes* é o *syntax* que o Vim deve usar.

Colocando a linha acima no topo do arquivo o Vim configura a extensão do arquivo para o nome indicado. Os valores permitidos na versão atual são *bass*, *snes*, *megadrive* e *nes*.

Essa linha geralmente é colocada no *main.asm*, pra indicar qual o sistema usar. Já para os outros arquivos do projeto o padrão que usarei é sempre usar a extensão correta para o sistema em questão. Por exemplo, para o Snes seria *.snes.asm* para todos os arquivos com excessão do *main.asm*.
