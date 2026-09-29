# HOSSOMII OS — System Overview

HOSSOMII OS é um portfólio interativo apresentado como um sistema
operacional fictício executado diretamente no navegador.

Em vez de navegar apenas por uma página tradicional com seções como
"Sobre", "Projetos" e "Contato", o visitante recebe acesso a uma
estação de trabalho virtual e pode descobrir as informações explorando
o próprio sistema.

A experiência utiliza principalmente referências visuais dos computadores
do início dos anos 2000, especialmente da era Windows XP, combinadas com
interfaces diegéticas, sites pessoais antigos e elementos narrativos.

---

## Experiência principal

A máquina fictícia é identificada como:

```text
HOSSOMII-01
```

O fluxo principal atual é:

```text
Acesso remoto
      ↓
Autenticação
      ↓
Inicialização
      ↓
Desktop
      ↓
Aplicações
      ↓
Sistema de arquivos virtual
```

Também existem fluxos próprios para:

- reinicialização;
- desligamento;
- falha crítica;
- recuperação.

O objetivo é fazer com que as diferentes partes de um portfólio pareçam
elementos pertencentes ao mesmo computador.

---

## Arquitetura geral

HOSSOMII OS não é um sistema operacional real.

Ele é uma aplicação web construída com:

- React;
- TypeScript;
- Vite;
- Zustand;
- Vitest;
- GSAP.

A aplicação simula conceitos encontrados em ambientes desktop, incluindo:

- Desktop;
- Window Manager;
- aplicações;
- sistema de arquivos virtual;
- associações de arquivos;
- terminal;
- lixeira;
- preferências do sistema;
- estados de inicialização e desligamento;
- recuperação;
- conquistas.

O estado compartilhado é organizado principalmente através de stores
Zustand.

---

## Window Manager

As aplicações são apresentadas através de um gerenciador de janelas
desenvolvido especificamente para o HOSSOMII OS.

As janelas suportam:

- abertura;
- foco;
- z-index;
- movimento;
- redimensionamento;
- minimização;
- maximização;
- restauração;
- fechamento;
- múltiplas instâncias quando necessário.

As dimensões são limitadas ao espaço disponível do Desktop para evitar
que janelas fiquem permanentemente inacessíveis fora da viewport.

---

## Desktop

O Desktop funciona como a principal área de exploração do sistema.

Atualmente possui atalhos para:

- Quick View;
- Meu Computador;
- Meus Projetos;
- Meus Documentos;
- HOSSOMII Web;
- Terminal;
- Lixeira.

Também possui:

- Menu Iniciar;
- barra de tarefas;
- relógio;
- quick launch do navegador;
- wallpapers;
- temas.

---

## Quick View

Quick View foi criado para permitir que alguém compreenda o perfil
profissional rapidamente sem precisar explorar todo o sistema.

Ele apresenta:

- resumo profissional;
- áreas de interesse;
- projetos em destaque;
- tecnologias principais dos projetos;
- currículo;
- documentos;
- GitHub;
- LinkedIn.

O Quick View não mantém uma cópia independente dos projetos.

Ele utiliza diretamente o catálogo estruturado do portfólio.

Ao selecionar um projeto, o visitante pode abrir o mesmo Project Viewer
utilizado pelo restante do sistema.

---

## Sistema de arquivos virtual

O HOSSOMII OS possui um sistema de arquivos próprio mantido em memória.

A estrutura principal inclui:

```text
C:\

├── Usuários\
│   └── Anthony\
│       ├── Área de Trabalho\
│       ├── Documentos\
│       └── Projetos\
│
├── Sistema\
└── Programas\
```

Os itens podem representar:

- arquivos;
- diretórios;
- aplicações;
- atalhos.

Cada item também pode possuir propriedades relacionadas a:

- visibilidade;
- exclusão;
- proteção;
- criticidade;
- restauração;
- estado da Lixeira.

---

## Estado compartilhado

Explorer, Terminal, Lixeira e outras aplicações utilizam o mesmo estado
do sistema de arquivos.

Por exemplo:

```text
Explorer
   ↓
Excluir arquivo
   ↓
filesystemStore
   ↓
Arquivo deixa o diretório original
   ↓
Arquivo aparece na Lixeira
```

O Terminal observa exatamente a mesma alteração.

Não existe uma cópia independente do filesystem para cada aplicação.

---

## Catálogo de projetos

Os dados profissionais dos projetos ficam separados do estado mutável do
filesystem.

A arquitetura principal é:

```text
projects.ts
    ↓
projectFileSystem.ts
    ↓
Virtual File System
```

O catálogo contém informações como:

- id;
- slug;
- nome;
- categoria;
- ano;
- status;
- resumo;
- função desempenhada;
- tecnologias;
- destaques;
- desafio;
- solução;
- decisões técnicas;
- aprendizados;
- screenshots;
- GitHub;
- demo.

`projectFileSystem.ts` funciona como um adaptador entre os dados de
portfólio e o sistema de arquivos.

A partir de um projeto ele gera automaticamente elementos como:

```text
Projeto\
├── project.exe
├── sobre-o-projeto.txt
├── tecnologias.txt
├── links.txt
└── screenshots
```

Isso permite adicionar ou remover projetos sem alterar manualmente a
estrutura principal do filesystem.

---

## Projetos atuais

### HOSSOMII OS

O próprio sistema é apresentado como um case do portfólio.

O projeto demonstra, entre outros pontos:

- arquitetura React;
- TypeScript;
- gerenciamento de estado;
- Window Manager;
- filesystem virtual;
- integração entre aplicações;
- regras de sistema;
- experiência interativa;
- testes.

### TNT Basketball

Projeto de jogo arcade desenvolvido com Unity e C#.

O case destaca:

- sistemas de gameplay;
- pontuação;
- combos;
- power-ups;
- controle de estado;
- WebGL;
- integração em equipe.

### Médicos & Dentistas

Aplicação web que começou como projeto front-end e posteriormente foi
expandida para fullstack.

O projeto utiliza:

- React;
- JavaScript;
- Node.js;
- Express;
- PostgreSQL;
- Prisma;
- Zod;
- Axios.

O backend possui separação entre rotas, controllers e services, além de
validação e persistência de dados.

---

## Project Viewer

Cada projeto possui uma aplicação `project.exe`.

Ela abre o Project Viewer utilizando o id do projeto como contexto.

O viewer atual possui:

```text
PROJECT DOSSIER
      │
      ├── identidade do projeto
      ├── imagem principal
      ├── categoria
      ├── ano
      ├── status
      ├── função
      └── stack principal

OVERVIEW
      ├── sobre
      ├── desafio
      └── solução

BUILD LOG
      ├── participação
      ├── atividades
      ├── decisões técnicas
      └── aprendizados

GALLERY
      └── imagens

TECH
      └── informações técnicas
```

O estado de navegação interno do Project Viewer é local ao componente.

O filesystem, janelas e demais estados compartilhados continuam nos
stores globais.

---

## Meu Computador

Meu Computador funciona como o principal Explorer do sistema.

O visitante pode:

- navegar pelo disco;
- entrar em diretórios;
- selecionar itens;
- abrir aplicações;
- abrir arquivos;
- excluir arquivos permitidos;
- acessar projetos e documentos.

---

## Meus Documentos

O diretório de documentos contém atualmente:

```text
leia-me.txt
sobre-mim.txt
currículo.pdf
```

Os textos apresentam o perfil profissional atual.

O currículo é aberto através do visualizador de PDF integrado ao sistema.

---

## Associações de arquivos

A abertura de arquivos utiliza regras compartilhadas.

Atualmente:

```text
TXT
→ Bloco de Notas

PDF
→ Visualizador de PDF

WEBP / PNG / JPG / JPEG
→ Visualizador de Imagens

project.exe
→ Project Viewer

diretório
→ Explorer

atalho
→ item de destino
```

Explorer e Terminal reutilizam essas mesmas regras.

---

## Terminal

O Terminal é conectado ao mesmo filesystem utilizado pela interface
gráfica.

Atualmente suporta:

```text
ajuda
help

dir
ls

cd
pwd

type
cat

open

del

cls
clear

whoami
hostname
ver
```

Também possui:

- histórico de comandos;
- autocomplete com Tab;
- caminhos relativos;
- caminhos absolutos;
- `/` e `\`;
- nomes com espaços;
- resolução sem diferenciação de maiúsculas/minúsculas;
- resolução tolerante a acentos.

O comando `open` utiliza a mesma lógica de associação de arquivos do
Explorer.

---

## Lixeira

Quando um arquivo comum é excluído:

- ele deixa sua localização original;
- o `originalParentId` é preservado;
- o item recebe estado de Lixeira;
- o ícone da Lixeira muda;
- o arquivo pode ser restaurado.

A restauração utiliza a localização original armazenada no item.

Diretórios e componentes protegidos possuem regras próprias.

---

## Componentes críticos

O filesystem diferencia arquivos comuns, itens protegidos e componentes
críticos.

A exclusão normal não consegue remover um arquivo crítico.

Essa regra existe no próprio store, e não apenas no botão visual que
inicia a ação.

Dessa forma, outras interfaces não conseguem ignorar acidentalmente a
proteção.

---

## Critical Failure e Recovery

Existe um fluxo especial relacionado a um componente crítico do sistema.

Esse fluxo inclui:

- múltiplas confirmações;
- falha do ambiente gráfico;
- transição narrativa;
- ambiente de recuperação;
- diagnóstico;
- restauração;
- reinicialização do shell.

O Recovery Environment utiliza o mesmo filesystem virtual.

Os detalhes necessários para descobrir o easter egg não são documentados
publicamente.

---

## HOSSOMII Web

HOSSOMII Web é o navegador interno da máquina.

Ele possui páginas próprias e também permite abrir determinados recursos
externos.

Atualmente inclui:

- página inicial;
- Anthony Online;
- HOSSOMII News;
- links externos.

---

## Anthony Online

Anthony Online é uma interpretação criativa de páginas pessoais e
comunidades da internet dos anos 2000.

A interface inclui:

- perfil;
- projetos;
- tecnologias;
- links;
- widgets;
- stickers;
- guestbook;
- contador visual;
- microinterações.

A página reutiliza os projetos existentes no catálogo do portfólio.

---

## HOSSOMII News

HOSSOMII News apresenta notícias externas em uma interface inspirada em
portais antigos.

A camada de dados inclui:

- normalização;
- cache temporário em memória;
- timeout;
- cancelamento de requisições;
- fallback de imagens;
- lazy loading;
- navegação externa segura.

Nenhuma chave privada é armazenada no frontend.

---

## Painel de Controle

O Painel de Controle gerencia preferências visuais.

Temas atuais:

- HOSSOMII Default;
- HOSSOMII Dark;
- Alto Contraste.

Wallpapers atuais:

- HOSSOMII Hills;
- HOSSOMII Default;
- Red Team Grid;
- Retro Blue Abstract;
- HOSSOMII Arcade;
- Minimal Green.

O wallpaper padrão atual é:

```text
HOSSOMII Default
```

As preferências são persistidas no `localStorage`.

---

## Conquistas

Existe um sistema de conquistas baseado em Zustand.

O store mantém:

- conquistas desbloqueadas;
- fila de notificações;
- prevenção de desbloqueio duplicado durante a sessão.

Atualmente existe uma conquista relacionada ao fluxo de recuperação.

O sistema será expandido posteriormente.

---

## Reinicialização

O sistema possui um estado próprio de reinicialização.

O fluxo é:

```text
Desktop
   ↓
Restart
   ↓
Tela intermediária
   ↓
Login
```

A tela intermediária evita uma troca instantânea de estado e reforça a
sensação de que a máquina está realmente reiniciando.

---

## Desligamento

O desligamento passa por dois estágios antes da máquina ser considerada
desligada:

```text
Desktop
   ↓
Salvando configurações
   ↓
Desligando
   ↓
Powered Off
```

A tela final também oferece acesso a links externos e reinicialização.

Uma experiência de Power mais completa está planejada para a próxima
fase de desenvolvimento.

---

## Responsividade

O Window Manager limita as janelas ao espaço disponível.

Quando a viewport muda, as janelas são reposicionadas ou redimensionadas
quando necessário.

Aplicações específicas também utilizam regras responsivas próprias.

Quick View e Project Viewer possuem layouts adaptáveis ao espaço interno
da janela.

---

## Acessibilidade

O sistema já inclui elementos básicos como:

- navegação por teclado em diferentes controles;
- foco visível;
- textos alternativos;
- labels ARIA em controles relevantes;
- tema de Alto Contraste;
- suporte a `prefers-reduced-motion` em determinadas animações.

Uma revisão de acessibilidade mais ampla está planejada para uma etapa
posterior.

---

## Testes

A lógica principal possui testes automatizados com Vitest.

Atualmente são testados principalmente:

- resolução de caminhos;
- normalização de nomes;
- exclusão;
- proteção de componentes críticos;
- restauração;
- comportamento do filesystem.

As verificações de checkpoint utilizam:

```bash
npm test
npm run build
npm run lint
```

A v0.4 também passou por regressão manual envolvendo:

- login;
- boot;
- Desktop;
- Window Manager;
- Quick View;
- projetos;
- Project Viewer;
- documentos;
- Explorer;
- Terminal;
- Lixeira;
- Critical Flow;
- HOSSOMII Web;
- News;
- Painel de Controle;
- shutdown;
- restart;
- responsividade;
- acessibilidade básica.

---

## Estado atual

```text
v0.3 — Filesystem / Explorer / Desktop Apps
COMPLETE

v0.4 — Portfolio Content
COMPLETE

v0.5 — Visual Polish / Motion
NEXT
```

A v0.4 adicionou principalmente:

- catálogo estruturado de projetos;
- geração automática do filesystem dos projetos;
- HOSSOMII Web;
- Anthony Online;
- HOSSOMII News;
- Project Viewer em formato de case study;
- HOSSOMII OS como projeto;
- cases técnicos expandidos;
- Quick View;
- revisão de conteúdo profissional;
- refinamentos de temas e wallpapers;
- fluxo visual de restart.

---

## Próxima fase — v0.5

A próxima etapa é focada em polish visual e feedback do sistema.

Já estão planejados:

### File assets

- ícone próprio para `.txt`;
- ícone próprio para `.pdf`.

### Power experience

- tela inicial com computador desligado;
- interação para ligar HOSSOMII-01;
- transição para o acesso remoto;
- redesign da tela Powered Off;
- identidade visual mais colorida e próxima da personalidade do projeto.

### Achievements

Novas conquistas planejadas:

- abrir um `.txt` pela primeira vez;
- abrir um PDF pela primeira vez;
- excluir um item pela primeira vez;
- abrir um link externo pela primeira vez.

Também está planejada persistência das conquistas já desbloqueadas.

### External navigation

A abertura de URLs externas deverá ser centralizada para:

- manter comportamento consistente;
- aplicar regras de segurança;
- permitir integração com conquistas.

### Motion

Serão adicionadas microinterações adicionais sem transformar o sistema
em uma interface excessivamente animada.

`prefers-reduced-motion` continuará sendo respeitado.

---

## Etapas posteriores

```text
v0.5 — Visual Polish / Motion

v0.6 — Audio

v0.7 — Narrative / Easter Eggs

v0.8 — Mobile / Accessibility / Performance

v0.9 — Complete OS Experience

v1.0 — Final Major Application + Integration
```

A aplicação final planejada permanecerá como o último grande recurso
antes da versão 1.0.

---

## Filosofia

### Explorar em vez de apenas rolar

Informações importantes podem ser descobertas através da interação.

### Acesso rápido sem remover a exploração

Quick View oferece uma alternativa curta para quem não deseja percorrer o
sistema inteiro.

### Funcionalidade antes de decoração

Interfaces devem funcionar sempre que isso for razoável.

### Estado compartilhado

Aplicações diferentes devem operar sobre os mesmos dados quando
representam o mesmo conceito.

### Fonte única de verdade

Informações estruturadas, principalmente projetos, devem existir em um
local central e ser derivadas para diferentes interfaces.

### Regras protegidas na camada correta

Regras críticas devem existir no estado e na lógica do sistema, não
somente na interface.

### Nostalgia com identidade própria

As referências dos anos 2000 servem como linguagem visual, não como
reprodução literal de um sistema operacional existente.

### Surpresas sem bloquear o visitante

Easter eggs podem alterar a experiência, mas devem permitir recuperação.

---

## Inspirações

A identidade visual e interativa combina referências de:

- interfaces desktop do começo dos anos 2000;
- Windows XP;
- sites pessoais antigos;
- acesso remoto;
- interfaces diegéticas;
- The Operator;
- Watch Dogs;
- experiências digitais interativas.

O objetivo é transformar essas referências em uma identidade própria do
HOSSOMII OS.