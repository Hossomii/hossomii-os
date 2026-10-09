# HOSSOMII OS - System Overview

HOSSOMII OS é um portfólio interativo apresentado como um sistema
operacional fictício executado diretamente no navegador.

Em vez de organizar informações apenas em páginas tradicionais,
o visitante acessa uma estação de trabalho virtual e explora projetos,
documentos e informações profissionais através das próprias interfaces
do sistema.

A experiência combina referências de computadores do início dos anos
2000 com aplicações web modernas, estado compartilhado e elementos
narrativos.

---

## Experiência principal

A máquina fictícia é identificada como:

```text
HOSSOMII-01
```

O fluxo principal atual é:

```text
Powered Off
     ↓
Power On
     ↓
HOSSOMII Startup
     ↓
Remote Access
     ↓
Authentication
     ↓
Boot
     ↓
Desktop
     ↓
Applications
     ↓
Virtual File System
```

Também existem fluxos próprios para:

- restart;
- shutdown;
- recuperação;
- falha crítica;
- conquistas de exploração.

---

## Stack

O projeto é construído com:

```text
React 19
TypeScript 6
Vite 8
Zustand
GSAP
Vitest
ESLint
```

HOSSOMII OS não é um sistema operacional real.

Ele é uma aplicação React que simula conceitos encontrados em ambientes
desktop.

---

## Arquitetura

A aplicação é dividida principalmente entre:

```text
src/

├── applications/
│   └── aplicações executadas dentro do Desktop
│
├── content/
│   └── dados estruturados do portfólio
│
├── desktop/
│   └── Desktop, taskbar, Start Menu e Window Manager
│
├── stores/
│   └── estado compartilhado com Zustand
│
├── system/
│   ├── audio/
│   ├── auth/
│   ├── boot/
│   ├── critical-file/
│   ├── filesystem/
│   ├── navigation/
│   └── power/
│
├── styles/
└── types/
```

Os stores principais controlam conceitos independentes:

```text
filesystemStore
→ sistema de arquivos

windowStore
→ janelas

systemStore
→ estados da máquina

systemPreferencesStore
→ tema, wallpaper e preferências de áudio

achievementStore
→ conquistas

criticalFileStore
→ fluxo de falha crítica
```

Essa separação evita concentrar toda a lógica do sistema nos componentes
visuais.

---

## Window Manager

As aplicações são exibidas através de um Window Manager próprio.

Cada janela possui estado relacionado a:

```text
posição
dimensões
z-index
minimização
maximização
restore bounds
dados da aplicação
```

As janelas suportam:

- abertura;
- foco;
- movimento;
- redimensionamento;
- minimização;
- maximização;
- restauração;
- fechamento;
- múltiplas instâncias.

As dimensões são limitadas à área disponível do Desktop.

Isso impede que uma janela fique permanentemente inacessível fora da
viewport.

### Motion

GSAP controla as principais transições.

Atualmente existem animações para:

- abertura;
- minimização;
- restauração;
- fechamento;
- Start Menu;
- notificações de conquistas.

As animações são propositalmente curtas para não descaracterizar a
experiência de desktop.

Quando uma aplicação é minimizada, seu componente continua montado.

```text
Application
     ↓
minimized = true
     ↓
GSAP transition
     ↓
display: none
```

Ao restaurar:

```text
minimized = false
     ↓
window becomes visible
     ↓
restore transition
```

Isso permite preservar o estado interno da aplicação durante ciclos de
minimização e restauração.

`prefers-reduced-motion` é respeitado pela nova camada de motion.

---

## Sistema de arquivos virtual

O HOSSOMII OS possui um filesystem próprio mantido em memória.

Estrutura simplificada:

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

Cada item pode possuir propriedades relacionadas a:

- parent;
- extensão;
- recurso;
- ícone;
- exclusão;
- proteção;
- criticidade;
- Lixeira;
- localização original.

---

## Estado compartilhado

Explorer, Terminal e Lixeira trabalham sobre o mesmo filesystem.

Exemplo:

```text
Explorer
   ↓
Delete
   ↓
filesystemStore
   ↓
arquivo marcado como trashed
   ↓
Explorer atualizado
   ↓
Recycle Bin atualizado
   ↓
Terminal atualizado
```

Não existe uma cópia independente do filesystem para cada aplicação.

Essa é uma das principais decisões arquiteturais do projeto.

---

## Associações de arquivos

A lógica de abertura é compartilhada entre diferentes interfaces.

```text
TXT
→ Notepad

PDF
→ PDF Viewer

WEBP / PNG / JPG / JPEG
→ Image Viewer

project.exe
→ Project Viewer

directory
→ Explorer

shortcut
→ target item
```

Explorer e Terminal reutilizam essas regras.

---

## Terminal

O Terminal opera sobre o mesmo filesystem utilizado pela interface
gráfica.

Comandos atuais incluem:

```text
ajuda / help

dir / ls

cd
pwd

type / cat

open

del

cls / clear

whoami
hostname
ver
```

Também suporta:

- histórico;
- autocomplete com Tab;
- caminhos relativos;
- caminhos absolutos;
- `/` e `\`;
- nomes com espaços;
- resolução case-insensitive;
- resolução tolerante a acentos.

O comando `open` utiliza as mesmas associações de arquivos do Explorer.

---

## Lixeira

Arquivos comuns não são removidos imediatamente.

```text
arquivo
   ↓
trashItem()
   ↓
trashed = true
   ↓
originalParentId preservado
   ↓
Recycle Bin
```

Ao restaurar, o arquivo retorna ao diretório original.

Itens protegidos e componentes críticos possuem regras diferentes.

---

## Segurança interna do filesystem

Algumas regras importantes são aplicadas diretamente no store.

Isso significa que a proteção não depende apenas do botão ou da interface
que iniciou uma ação.

Um componente crítico, por exemplo, não pode ser removido através da
operação normal de exclusão.

Essa regra continua válida mesmo que outra interface tente utilizar a
mesma operação.

---

## Critical Failure e Recovery

Existe um fluxo narrativo relacionado a um componente crítico do
filesystem.

A sequência pode envolver:

```text
Desktop
   ↓
critical interaction
   ↓
system failure
   ↓
Recovery Environment
   ↓
diagnostic
   ↓
filesystem repair
   ↓
restart
```

O ambiente de recuperação utiliza o mesmo filesystem virtual.

O gatilho específico não é documentado publicamente porque a descoberta
faz parte da experiência.

---

## Dados do portfólio

Os projetos profissionais são armazenados separadamente do filesystem.

```text
projects.ts
    ↓
projectFileSystem.ts
    ↓
Virtual File System
```

`projects.ts` funciona como fonte principal de dados.

Pode conter:

- nome;
- categoria;
- status;
- resumo;
- função;
- tecnologias;
- desafio;
- solução;
- decisões técnicas;
- aprendizados;
- screenshots;
- GitHub;
- demo.

`projectFileSystem.ts` adapta esses dados para a representação dentro do
sistema operacional.

Exemplo:

```text
Projeto\

├── project.exe
├── sobre-o-projeto.txt
├── tecnologias.txt
├── links.txt
└── screenshots
```

Isso evita duplicar manualmente os mesmos dados em Quick View, Explorer
e Project Viewer.

---

## Aplicações principais

### Quick View

Resumo profissional para visitantes que querem encontrar rapidamente:

- perfil;
- projetos;
- currículo;
- documentos;
- GitHub;
- LinkedIn.

### Meu Computador

Interface principal de navegação pelo filesystem.

### Project Viewer

`project.exe` abre um case study estruturado em:

```text
Overview
Build Log
Gallery
Tech
```

### HOSSOMII Web

Navegador interno com:

- página inicial;
- Anthony Online;
- HOSSOMII News;
- navegação externa.

### Anthony Online

Página pessoal inspirada na web dos anos 2000.

Reutiliza informações já existentes no catálogo de projetos.

### HOSSOMII News

Interface de notícias externas.

A camada de dados inclui:

- normalização;
- cache temporário;
- timeout;
- cancelamento;
- lazy loading;
- fallback de imagens;
- navegação externa segura.

### Notepad

Visualizador para arquivos `.txt`.

### PDF Viewer

Visualizador integrado para documentos PDF.

### Image Viewer

Visualizador para imagens suportadas pelo filesystem.

### Recycle Bin

Gerencia arquivos excluídos e restauração.

### Control Panel

Gerencia temas e wallpapers.

---

## Navegação externa

Links externos utilizam uma camada centralizada.

A navegação aceita apenas:

```text
http:
https:
```

A URL é resolvida antes da abertura.

Links externos podem ser registrados pelo sistema de conquistas e são
abertos em nova aba utilizando:

```text
noopener
noreferrer
```

Recursos locais da própria aplicação não contam como navegação externa.

---

## Conquistas

O sistema de conquistas utiliza Zustand com persistência.

Conquistas atuais:

```text
Leitura obrigatória
→ abrir um TXT

Papelada digital
→ abrir um PDF

Sem apego
→ mover o primeiro arquivo para a Lixeira

Saindo da rede
→ abrir um link externo

Eu avisei.
→ recuperar o sistema após o incidente crítico
```

As conquistas desbloqueadas são persistidas em:

```text
hossomii-os-achievements
```

Somente os ids desbloqueados são persistidos.

A fila de notificações não é salva.

Consequentemente:

```text
achievement unlocked
      ↓
localStorage
      ↓
refresh
      ↓
continua desbloqueado
      ↓
toast antigo não reaparece
```

As notificações são exibidas sequencialmente e possuem animações de
entrada e saída.

---

## Power System

O estado da máquina é controlado pelo `systemStore`.

Fluxo de inicialização:

```text
power
   ↓
powering-on
   ↓
login
   ↓
authentication
   ↓
boot
   ↓
desktop
```

Fluxo de restart:

```text
Desktop
   ↓
Restarting
   ↓
Remote Access
```

O restart retorna diretamente ao acesso remoto.

Fluxo de desligamento:

```text
Desktop
   ↓
Shutting Down
   ↓
Powered Off
```

Da tela Powered Off é possível ligar novamente a máquina:

```text
Powered Off
     ↓
Ligar novamente
     ↓
Power On
     ↓
Remote Access
```

---

## Sistema de áudio

A v0.6 introduziu uma camada centralizada de áudio para eventos do
sistema e feedback da interface.

A arquitetura principal é:

```text
React Components
       ↓
audioService
       ↓
AudioManager
       ↓
audioRegistry
       ↓
HTMLAudioElement
```

Os componentes não acessam diretamente a implementação do
`AudioManager`.

Em vez disso, utilizam uma pequena API pública:

```text
playSound()
preloadAudioGroup()
stopAllSounds()
```

Isso reduz o acoplamento entre a interface e a implementação de
reprodução.

### Audio Registry

`audioRegistry.ts` funciona como catálogo central dos sons.

Cada cue pode definir:

```text
id
channel
source
volume
playback mode
voice limit
```

Os canais atuais são:

```text
ui
system
```

Os principais sons do sistema incluem:

```text
system-startup
system-login
system-shutdown
system-glitch
system-recovery
```

Os principais sons de interface incluem:

```text
ui-keypress
ui-error
ui-folder-open
ui-notification
```

### Políticas de reprodução

Cada som pode definir uma estratégia de concorrência.

```text
overlap
→ permite reprodução simultânea

restart
→ interrompe a instância anterior e reinicia o som

ignore
→ ignora uma nova solicitação enquanto o mesmo cue estiver ativo
```

Sons rápidos como `ui-keypress` utilizam `overlap`, mas possuem um
limite de vozes simultâneas.

Isso impede que digitação muito rápida gere dezenas de elementos de
áudio concorrentes.

Sons de navegação e notificação utilizam `restart`, enquanto eventos
importantes do sistema, como startup e recovery, utilizam `ignore`.

### Audio Manager

`AudioManager` é responsável por:

```text
preload
playback
volume
mute
active voices
concurrency
cleanup
playback rate
```

Templates de áudio são mantidos em cache e clonados quando uma nova
instância precisa ser reproduzida.

Instâncias encerradas ou com erro são removidas da coleção de áudios
ativos.

Quando:

```text
mute = true
```

ou:

```text
master volume = 0
```

uma nova reprodução não é criada.

Isso evita trabalho desnecessário no navegador.

### Preload

Os sons principais da sessão são agrupados em um preload centralizado.

```text
Power interaction
      ↓
preloadAudioGroup("session")
      ↓
main session sounds cached
```

O preload ocorre após interação explícita do usuário com o botão de
energia.

O som de startup também é iniciado a partir dessa interação.

Isso ajuda a trabalhar de forma compatível com as restrições de autoplay
dos navegadores.

### Preferências de áudio

O `systemPreferencesStore` permanece como fonte de verdade para:

```text
audioMuted
audioVolume
```

O store não conhece diretamente o `AudioManager`.

A sincronização é realizada separadamente:

```text
systemPreferencesStore
         ↓
audioPreferencesSync
         ↓
AudioManager
```

`audioPreferencesSync` observa alterações nas preferências e atualiza a
camada de reprodução.

Essa separação evita manter lógica de áudio dentro do store de
preferências.

### Feedback audiovisual

Alguns eventos combinam feedback visual e sonoro.

Na autenticação:

```text
authentication status = error
          ↓
ui-error
          +
visual error state
```

A mensagem de falha recebe destaque vermelho e uma animação curta.

Ambos os efeitos são derivados do mesmo estado de autenticação, evitando
timers independentes apenas para sincronização.

O movimento respeita:

```text
prefers-reduced-motion
```

O feedback visual permanece disponível mesmo quando a animação é
reduzida.

---

## Preferências

O Painel de Controle permite alterar:

- tema;
- wallpaper;
- áudio ativado/desativado;
- volume geral.

As preferências são armazenadas no `localStorage`.

Temas atuais:

```text
HOSSOMII Default
HOSSOMII Dark
High Contrast
```

As preferências de áudio são mantidas separadas da implementação de
reprodução e sincronizadas com o `AudioManager` através da camada de
`audioPreferencesSync`.

---

## Responsividade e acessibilidade

O sistema já possui suporte para diferentes dimensões de viewport.

O Window Manager reajusta janelas quando necessário.

Também existem:

- labels ARIA;
- textos alternativos;
- foco visível;
- tema de alto contraste;
- `prefers-reduced-motion`;
- layouts adaptáveis em aplicações específicas.

Uma revisão mais profunda de acessibilidade, mobile e performance está
reservada para a v0.8.

---

## Testes

Vitest é utilizado para validar principalmente a lógica independente da
interface.

Entre os comportamentos cobertos estão:

- resolução de caminhos;
- normalização;
- exclusão;
- proteção de arquivos;
- comportamento de componentes críticos;
- restauração;
- filesystem.

Os checkpoints também utilizam:

```bash
npm test
npm run lint
npm run build
```

Além dos testes automatizados, cada fase passa por regressão manual dos
principais fluxos do sistema.

A camada de áudio também possui testes próprios para validar:

```text
mute
master volume zero
restart playback mode
ignore playback mode
voice limits
cleanup após término
```

O navegador é substituído por uma implementação controlada de áudio nos
testes, permitindo validar a lógica do `AudioManager` sem reproduzir sons
reais.

---

## Estado atual

```text
v0.3 — Filesystem / Explorer / Desktop Apps
COMPLETE

v0.4 — Portfolio Content
COMPLETE

v0.5 — Visual Polish / Motion
COMPLETE

v0.6 — Audio
COMPLETE

v0.7 — Narrative / Easter Eggs
NEXT

v0.8 — Mobile / Accessibility / Performance
PLANNED

v0.9 — Complete OS Experience
PLANNED

v1.0 — game.exe + Final Integration
PLANNED
```

---

## v0.5 — Visual Polish / Motion

A v0.5 adicionou principalmente:

- ícones próprios para TXT e PDF;
- tela inicial de Power;
- splash HOSSOMII;
- redesign do Remote Access;
- redesign do Powered Off;
- novas conquistas;
- persistência de conquistas;
- navegação externa centralizada;
- animações de janelas;
- animação do Start Menu;
- animações das notificações;
- suporte a reduced motion.

O objetivo foi melhorar feedback e coesão sem transformar o sistema em uma
interface excessivamente animada.

---

## v0.6 — Audio

A v0.6 adicionou:

- arquitetura centralizada de áudio;
- sons de sistema e interface;
- preferências persistentes de mute e volume;
- preload centralizado;
- políticas de concorrência;
- limite de vozes para sons rápidos;
- testes automatizados do AudioManager;
- feedback sonoro para navegação e conquistas;
- feedback audiovisual durante falha de autenticação.

O objetivo foi adicionar identidade sonora ao HOSSOMII OS sem espalhar
lógica de reprodução pelos componentes da aplicação.

---

## Próxima fase — v0.7 Narrative / Easter Eggs

A v0.7 aprofundará a identidade do sistema através de elementos
narrativos discretos.

A intenção é introduzir:

```text
arquivos incomuns
mensagens de sistema
respostas raras do Terminal
referências à HOSSOMII SYSTEMS
anomalias condicionais
environmental storytelling
novas recompensas por exploração
```

O fluxo existente de falha crítica e Recovery continuará sendo o maior
evento escondido do sistema.

As anomalias devem permanecer sutis e coerentes com a estética do
HOSSOMII OS, evitando transformar a experiência em uma interface
genérica de glitch ou cyberpunk.

---

## Roadmap

```text
v0.6
Audio

v0.7
Narrative / Easter Eggs

v0.8
Mobile / Accessibility / Performance

v0.9
Complete OS Experience / Freeze / QA

v1.0
game.exe + Final Integration
```

`game.exe` continuará sendo o último grande recurso antes da versão 1.0.

---

## Princípios

### Funcionalidade antes de decoração

Interfaces devem funcionar sempre que isso fizer sentido.

### Estado compartilhado

Interfaces que representam o mesmo conceito devem utilizar os mesmos
dados.

### Fonte única de verdade

Dados estruturados devem ser centralizados e derivados para diferentes
interfaces.

### Regras na camada correta

Proteções importantes pertencem à lógica do sistema, não apenas à UI.

### Exploração

O portfólio deve recompensar curiosidade sem impedir acesso rápido às
informações profissionais.

### Nostalgia com identidade própria

As referências dos anos 2000 são utilizadas como linguagem visual, não
como reprodução literal de outro sistema operacional.