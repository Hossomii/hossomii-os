# HOSSOMII OS

HOSSOMII OS é um portfólio interativo apresentado como um sistema
operacional fictício executado diretamente no navegador.

Em vez de navegar por uma página tradicional com seções como
"Sobre", "Projetos" e "Contato", o visitante recebe acesso a um
computador virtual e descobre essas informações explorando o próprio
sistema.

A experiência é inspirada principalmente pela estética dos computadores
do início dos anos 2000, especialmente Windows XP, combinada com uma
camada narrativa mais moderna e elementos de interfaces diegéticas de
jogos.

---

## A experiência

Ao acessar o projeto, o visitante não encontra imediatamente o portfólio.

Ele primeiro precisa acessar remotamente uma máquina chamada:

HOSSOMII-01

A partir daí, o sistema passa por uma sequência de autenticação,
recuperação de sessão e inicialização até chegar à Área de Trabalho.

A ideia é transformar diferentes partes de um portfólio tradicional em
elementos que façam sentido dentro de um computador.

---

## Arquitetura geral

HOSSOMII OS não é um sistema operacional real.

Ele é uma aplicação web construída com React, TypeScript e Vite que
simula vários conceitos encontrados em sistemas operacionais.

Entre eles estão:

- desktop;
- gerenciamento de janelas;
- aplicações;
- sistema de arquivos virtual;
- associações de arquivos;
- terminal;
- lixeira;
- preferências do sistema;
- estados de inicialização e desligamento;
- fluxos de falha e recuperação.

O estado principal da aplicação é organizado através de stores com
Zustand.

Diferentes aplicações compartilham os mesmos dados.

Por exemplo, o Explorer, a Lixeira e o Terminal interagem com o mesmo
sistema de arquivos virtual.

---

## Desktop

O Desktop funciona como a principal área de exploração.

Atualmente possui atalhos para:

- Meu Computador;
- Meus Projetos;
- Meus Documentos;
- Terminal;
- Lixeira.

Também existe um Menu Iniciar com acesso às principais aplicações e
ações do sistema.

As janelas podem ser:

- abertas;
- arrastadas;
- minimizadas;
- maximizadas;
- restauradas;
- redimensionadas;
- fechadas.

A barra de tarefas acompanha as aplicações abertas e permite alternar
entre elas.

---

## Sistema de arquivos virtual

O HOSSOMII OS possui um sistema de arquivos próprio mantido em memória.

A estrutura principal inclui diretórios semelhantes a:

C:\Usuários\Anthony

C:\Usuários\Anthony\Documentos

C:\Usuários\Anthony\Projetos

C:\Sistema

C:\Programas

Os itens podem representar:

- arquivos;
- diretórios;
- aplicações;
- atalhos.

Cada item possui propriedades que determinam, entre outras coisas, se
pode ser excluído, restaurado ou tratado como parte crítica do sistema.

---

## Meu Computador

Meu Computador funciona como o principal Explorer do sistema.

O visitante pode navegar pelo Disco Local, entrar em diretórios,
selecionar arquivos, abrir aplicações e explorar diferentes áreas da
máquina.

A interface compartilha o mesmo sistema de arquivos utilizado por outras
partes do HOSSOMII OS.

---

## Meus Documentos

Meus Documentos reúne informações que normalmente estariam espalhadas
por diferentes seções de um portfólio tradicional.

Atualmente inclui arquivos como:

- apresentação;
- informações sobre o desenvolvedor;
- currículo.

Arquivos de texto são abertos em uma aplicação semelhante a um bloco de
notas.

Arquivos PDF possuem um visualizador próprio.

---

## Meus Projetos

Meus Projetos apresenta trabalhos do portfólio como diretórios dentro do
computador.

Cada projeto possui identidade visual própria e pode conter:

- descrição;
- tecnologias utilizadas;
- links;
- imagens;
- uma aplicação `project.exe`.

Atualmente estão disponíveis:

### TNT Basketball

Projeto desenvolvido em Unity e C#.

O diretório possui documentação, imagens e uma aplicação própria para
visualização do projeto.

### Médicos & Dentistas

Projeto web desenvolvido com foco em interface, organização de conteúdo
e experiência do usuário.

Assim como os demais projetos, possui arquivos e uma aplicação própria
de apresentação.

---

## Project Viewer

Projetos podem disponibilizar um arquivo chamado:

project.exe

Ao executar esse arquivo, o sistema abre uma aplicação dedicada à
apresentação do projeto.

A janela possui identidade visual associada ao projeto e permite
apresentar informações de forma mais rica do que um arquivo de texto
tradicional.

---

## Visualizador de imagens

Arquivos de imagem suportados podem ser abertos diretamente pelo
Explorer.

Atualmente o sistema reconhece formatos como:

- WebP;
- PNG;
- JPG;
- JPEG.

Dentro dos diretórios, imagens também podem aparecer como pequenas
miniaturas.

---

## Terminal

O Terminal é uma aplicação funcional conectada ao mesmo sistema de
arquivos virtual utilizado pelo Explorer.

Ele não é apenas uma animação.

Atualmente suporta comandos básicos de navegação e interação, incluindo:

- ajuda;
- dir;
- ls;
- cd;
- pwd;
- type;
- cat;
- open;
- del;
- cls;
- clear;
- whoami;
- hostname;
- ver.

O Terminal também possui:

- histórico utilizando as setas do teclado;
- autocomplete com Tab;
- suporte a caminhos relativos;
- suporte a caminhos absolutos;
- suporte a `/` e `\`;
- suporte a nomes com espaços;
- resolução tolerante a diferenças de maiúsculas, minúsculas e acentos.

O comando `open` utiliza as mesmas associações de arquivos usadas pelo
Explorer.

O comando `del` interage com o mesmo sistema de exclusão utilizado pelas
demais aplicações.

---

## Associações de arquivos

O sistema possui associações internas entre determinados tipos de
arquivo e aplicações.

Entre elas:

- TXT → Bloco de Notas;
- PDF → Visualizador de PDF;
- imagens → Visualizador de Imagens;
- aplicações → aplicação correspondente;
- project.exe → Project Viewer.

Essas associações podem ser utilizadas tanto pelo Explorer quanto pelo
Terminal.

---

## Lixeira

A Lixeira possui comportamento funcional.

Quando um arquivo comum é excluído:

- ele desaparece da localização original;
- sua localização anterior é preservada;
- ele passa a aparecer na Lixeira;
- o ícone da Lixeira muda de estado;
- o arquivo pode ser restaurado.

Ao restaurar um item, ele retorna ao diretório em que estava
originalmente.

Nem todos os elementos do sistema podem ser excluídos.

---

## Arquivos protegidos e componentes críticos

O sistema diferencia arquivos comuns, itens protegidos e componentes
críticos.

Operações comuns não conseguem remover componentes críticos diretamente.

Isso é aplicado também na camada do sistema de arquivos, evitando que
novas aplicações ou comandos ignorem acidentalmente as regras de
proteção.

Existe ainda um fluxo especial relacionado a determinados componentes do
sistema.

Os detalhes não são documentados aqui para preservar a experiência de
exploração.

---

## Recovery Environment

O HOSSOMII OS possui um ambiente próprio de recuperação.

Ele faz parte de um dos fluxos interativos do sistema e utiliza uma
interface inspirada em consoles de recuperação antigos.

Esse ambiente possui estados próprios, comandos e interação com o sistema
de arquivos virtual.

O objetivo é permitir que determinadas ações tenham consequências
perceptíveis sem deixar o visitante permanentemente preso.

---

## Conquistas

O sistema possui suporte a conquistas de sessão.

Elas podem ser desbloqueadas através da exploração ou de determinadas
interações.

Nem todas as condições são documentadas publicamente.

---

## Painel de Controle

O Painel de Controle permite personalizar a aparência do HOSSOMII OS.

Atualmente existem três modos visuais:

- padrão;
- escuro;
- alto contraste.

Também existem diferentes wallpapers disponíveis.

As preferências são armazenadas no navegador e permanecem após recarregar
a página.

É possível restaurar as configurações visuais padrão.

---

## Desligamento

O sistema possui um fluxo próprio de desligamento.

A ação passa por estados semelhantes a:

- salvando configurações;
- desligando;
- sistema desligado.

Na tela final, o visitante pode acessar links externos ou reiniciar o
HOSSOMII OS.

---

## Responsividade

As janelas utilizam limites definidos pelo espaço disponível do Desktop.

O Window Manager ajusta posições e dimensões quando necessário para
evitar que aplicações fiquem inacessíveis fora da área visível.

A interface também possui adaptações para diferentes tamanhos de tela.

Mais melhorias específicas para dispositivos móveis ainda estão
planejadas.

---

## Testes

Parte da lógica central já possui testes automatizados utilizando Vitest.

Atualmente são testados principalmente:

- resolução de caminhos;
- navegação no sistema de arquivos;
- normalização de nomes;
- exclusão de arquivos;
- proteção de componentes críticos;
- restauração de arquivos.

Além dos testes automatizados, as principais etapas são validadas com:

npm test

npm run build

npm run lint

---

## Segredos do sistema

HOSSOMII OS foi projetado para recompensar curiosidade.

Algumas ações podem produzir comportamentos inesperados.

Existem arquivos que parecem estranhos.

Existem partes do sistema que talvez não estejam ali apenas por estética.

E algumas decisões aparentemente inocentes podem produzir consequências
maiores do que o visitante esperava.

Nenhum guia oficial revelará todas elas.

---

## Narrativa

Existe uma pequena narrativa por trás do computador.

A sessão de acesso remoto, mensagens técnicas, arquivos do sistema,
falhas e outros detalhes não são apenas elementos decorativos.

A intenção é fazer o visitante sentir que está explorando uma máquina que
já existia antes de ele chegar.

---

## Inspirações

A identidade do projeto combina referências de diferentes experiências:

- sistemas operacionais do começo dos anos 2000;
- Windows XP;
- interfaces de acesso remoto;
- jogos com sistemas diegéticos;
- Watch Dogs;
- The Operator;
- experiências digitais interativas.

Essas referências funcionam como direção visual e conceitual.

O objetivo não é reproduzir nenhuma delas literalmente, mas construir uma
identidade própria para o HOSSOMII OS.

---

## Filosofia do projeto

### Explorar em vez de apenas rolar

Informações importantes devem poder ser descobertas através da interação.

### Funcionalidade antes de decoração

Sempre que possível, uma interface deve realmente funcionar.

Se existe um Explorer, ele deve navegar.

Se existe uma Lixeira, ela deve armazenar itens.

Se existe um Terminal, ele deve entender comandos.

### Estado compartilhado

Aplicações diferentes devem trabalhar sobre os mesmos dados quando isso
fizer sentido.

Explorer, Terminal e Lixeira não possuem versões independentes dos mesmos
arquivos.

### Segurança das regras internas

Operações sensíveis devem ser protegidas na camada responsável pelos
dados, e não apenas pela interface que inicia a operação.

### Surpresas sem prejudicar usabilidade

Easter eggs fazem parte da experiência, mas o visitante não deve ficar
permanentemente preso ou depender de conhecimento técnico avançado para
continuar.

### Nostalgia com identidade própria

A interface pode lembrar computadores antigos sem simplesmente copiar um
sistema operacional existente.

---

## Estado atual

Atualmente estão funcionais:

- acesso remoto;
- autenticação narrativa;
- boot;
- desktop;
- Menu Iniciar;
- barra de tarefas;
- gerenciamento e redimensionamento de janelas;
- Meu Computador;
- Meus Documentos;
- Meus Projetos;
- sistema de arquivos virtual;
- navegação entre diretórios;
- associações de arquivos;
- Bloco de Notas;
- Visualizador de PDF;
- Visualizador de Imagens;
- Project Viewer;
- Lixeira;
- Terminal;
- exclusão e restauração de arquivos;
- proteção de arquivos críticos;
- ambiente de recuperação;
- conquistas;
- Painel de Controle;
- temas;
- wallpapers;
- desligamento do sistema;
- testes automatizados para partes da lógica central.

---

## Próximas etapas

Com a infraestrutura principal do sistema concluída, o foco passa a ser
o conteúdo real do portfólio.

As próximas etapas incluem:

- ampliar e melhorar a apresentação dos projetos;
- adicionar mais conteúdo profissional;
- melhorar a descoberta rápida de informações importantes;
- adicionar Quick View;
- refinamento visual;
- microinterações e motion;
- áudio;
- novos elementos narrativos;
- novos segredos e easter eggs;
- acessibilidade;
- otimização de performance;
- melhorias mobile;
- revisão final da experiência.

Existe também uma aplicação maior planejada para o sistema.

Ela será desenvolvida apenas quando o restante do HOSSOMII OS estiver
próximo de sua forma final.

Algumas coisas são melhores descobertas executando o arquivo certo.