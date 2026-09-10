# HOSSOMII OS — Estado do projeto e guia de manutenção

Este documento explica o que o projeto já faz, a função de cada arquivo e onde realizar futuras alterações.

> O status abaixo corresponde à versão documentada. Recursos marcados como planejados ainda não devem ser considerados funcionais.

## 1. O que é o projeto

O HOSSOMII OS é um portfólio interativo que simula um sistema operacional inspirado no Windows XP.

O visitante explora uma área de trabalho com janelas, pastas e aplicativos para conhecer Anthony e seus projetos.

- **Interface:** português do Brasil.
- **Código:** nomes de arquivos, variáveis, funções e tipos em inglês.
- **Visual:** anos 2000, com detalhes investigativos e interferências inspiradas em Watch Dogs.
- **Objetivo futuro:** incluir exploração de arquivos, terminal, desafios e um jogo dentro do sistema.

## 2. Resumo do estado atual

| Parte | Situação |
|---|---|
| Login e sequência de autenticação fictícia | Implementados |
| Tela de boas-vindas | Implementada |
| Área de trabalho, ícones e Menu Iniciar | Implementados |
| Barra de tarefas e relógio | Implementados |
| Abrir, mover, minimizar, maximizar, restaurar e fechar janelas | Implementados |
| Meu Computador | Abre, mas os itens internos ainda são estáticos |
| Meus Projetos, Meus Documentos e Terminal | Ainda sem aplicações funcionais |
| Lixeira | Ícone disponível; exclusão e recuperação ainda não implementadas |
| Responsividade e redução de movimento | Suporte inicial |
| Build | Registrado como passando nesta versão |
| Próxima etapa | Criar o sistema de arquivos virtual |

**Atenção:** um botão ou ícone aparecer na tela não significa que sua função já foi implementada.

## 3. Como executar

Execute os comandos no terminal, dentro da pasta do projeto.

| Objetivo | Comando |
|---|---|
| Instalar as dependências | `npm install` |
| Iniciar o ambiente de desenvolvimento | `npm run dev` |
| Verificar e gerar a versão de produção | `npm run build` |

Após `npm run dev`, abra o endereço informado pelo terminal.

Antes de concluir uma alteração, teste o comportamento afetado e execute `npm run build`. O build deve terminar sem erros.

## 4. Conceitos para entender os arquivos

| Termo | Significado neste projeto |
|---|---|
| Componente | Parte da interface, como um ícone, menu ou janela. |
| Estado | Informação que pode mudar, como a janela ativa ou a fase atual do sistema. |
| Store | Local que guarda informações e ações compartilhadas entre componentes. |
| Tipo | Definição TypeScript que descreve os valores e campos aceitos. |
| Asset | Arquivo visual, como uma imagem ou ícone. |
| Build | Processo que verifica e prepara o projeto para publicação. |
| Sistema de arquivos virtual | Dados que simulam pastas e arquivos dentro do portfólio. Não são os arquivos reais do computador do visitante. |

### Tecnologias

| Tecnologia | Para que serve |
|---|---|
| React | Montar a interface com componentes. |
| TypeScript | Verificar tipos e ajudar a detectar inconsistências no código. |
| Vite | Executar o projeto durante o desenvolvimento e gerar o build. |
| Zustand | Compartilhar estados por meio das stores. |
| GSAP | Criar animações avançadas. Está instalado, mas ainda não é central no funcionamento atual. |

### Extensões de arquivos

- `.tsx`: componentes React, geralmente com interface e comportamento.
- `.ts`: lógica, dados ou definições de tipos.
- `.css`: aparência e organização visual.
- `.webp`: imagens.

## 5. Como o sistema funciona

### Entrada no desktop

1. O visitante vê a tela de acesso remoto ao computador `HOSSOMII-01`.
2. Digita qualquer senha não vazia.
3. Pressiona Enter ou clica em **ENTRAR**.
4. O sistema simula uma falha de autenticação.
5. A narrativa informa que uma sessão remota foi recuperada e autorizada.
6. A tela **Bem-vindo** aparece.
7. O desktop é exibido.

A senha não é comparada com uma senha real nem armazenada como credencial. A falha faz parte da experiência.

### Fases principais

A fase atual fica em `src/stores/systemStore.ts`. O arquivo `src/App.tsx` consulta essa informação e escolhe a tela.

| Valor de `phase` | Tela exibida |
|---|---|
| `login` | `LoginScreen` |
| `authenticating` | `AuthenticatingScreen` |
| `booting` | `BootScreen` |
| `desktop` | `Desktop` |

As mensagens da autenticação são etapas internas de `AuthenticatingScreen`, não novas fases globais.

## 6. Mapa dos arquivos atuais

Os caminhos abaixo são relativos à pasta principal do projeto.

### Entrada da aplicação

| Arquivo | Responsabilidade |
|---|---|
| `src/main.tsx` | Inicia o React, carrega o CSS global e coloca `App` no elemento `#root` da página. |
| `src/App.tsx` | Escolhe a tela exibida de acordo com a fase atual do sistema. |

### Fases e telas iniciais

| Arquivo | Responsabilidade |
|---|---|
| `src/types/system.ts` | Define as fases válidas: `login`, `authenticating`, `booting` e `desktop`. |
| `src/stores/systemStore.ts` | Guarda e altera a fase atual. Permite voltar ao login ao reiniciar. |
| `src/system/auth/LoginScreen.tsx` | Exibe o acesso remoto, avatar, usuário e campo de senha. Trata Enter e o botão ENTRAR; não aceita senha vazia. |
| `src/system/auth/AuthenticatingScreen.tsx` | Exibe as mensagens temporizadas de verificação, falha, recuperação e autorização da sessão. |
| `src/system/boot/BootScreen.tsx` | Exibe avatar, usuário, “Bem-vindo” e carregamento. Depois avança automaticamente para o desktop. |

### Desktop e seus componentes

| Arquivo | Responsabilidade |
|---|---|
| `src/desktop/Desktop.tsx` | Reúne ícones, Menu Iniciar, barra de tarefas e janelas. Coordena seleção, abertura de aplicativos, foco, ações da barra de tarefas e reinicialização. |
| `src/desktop/components/DesktopIcon.tsx` | Representa um ícone. Clique simples seleciona; duplo clique solicita abertura. O destino da abertura é decidido pelo Desktop. |
| `src/desktop/components/StartMenu.tsx` | Exibe o Menu Iniciar e suas opções. Meu Computador e Reiniciar funcionam; as demais funções ainda serão conectadas. |
| `src/desktop/components/Taskbar.tsx` | Exibe botão Iniciar, janelas abertas, relógio e status. Permite minimizar a janela ativa, restaurar uma minimizada ou trazer uma janela para frente. |
| `src/desktop/components/WindowFrame.tsx` | Define a moldura e os controles das janelas: arrastar, focar, minimizar, maximizar, restaurar e fechar. Duplo clique no título maximiza ou restaura. |

O desktop mostra **Meu Computador**, **Meus Projetos**, **Meus Documentos**, **Terminal** e **Lixeira**. Somente **Meu Computador** possui uma aplicação funcional nesta etapa.

`WindowFrame.tsx` usa Pointer Events para tratar a interação com o ponteiro. Isso permite futura adaptação para toque, mas não significa que o suporte mobile esteja concluído.

### Gerenciamento de janelas

| Arquivo | Responsabilidade |
|---|---|
| `src/types/window.ts` | Define as informações que uma janela deve ter. |
| `src/stores/windowStore.ts` | Guarda as janelas abertas e oferece as ações para manipulá-las. Também controla qual fica na frente. |

#### Dados de uma janela

| Campo | Significado |
|---|---|
| `id` | Identificador da janela. |
| `appId` | Identificador do aplicativo associado. |
| `title` | Título exibido. |
| `icon` | Ícone associado. |
| `x`, `y` | Posição na tela. |
| `width`, `height` | Largura e altura. |
| `minimized` | Indica se está minimizada. |
| `maximized` | Indica se está maximizada. |
| `zIndex` | Ordem de sobreposição: valores maiores ficam na frente. |
| `restoreBounds` | Guarda posição e tamanho anteriores à maximização, para restaurá-los depois. |

#### Ações de `windowStore.ts`

| Ação | O que faz |
|---|---|
| `openWindow` | Abre uma janela. |
| `closeWindow` | Fecha uma janela. |
| `minimizeWindow` | Minimiza uma janela. |
| `restoreWindow` | Restaura uma janela minimizada. |
| `toggleMaximizeWindow` | Alterna entre maximizada e tamanho anterior. |
| `focusWindow` | Traz uma janela para frente. |
| `moveWindow` | Atualiza a posição. |
| `resetWindows` | Limpa o estado das janelas. |

**Divisão importante:** `WindowFrame.tsx` cuida da moldura e das interações; `windowStore.ts` mantém os dados e executa as mudanças de estado.

### Aplicativos

| Arquivo | Responsabilidade |
|---|---|
| `src/applications/computer/ComputerApp.tsx` | Exibe o conteúdo de Meu Computador: barra de endereço, ferramentas, tarefas do sistema e itens como Documentos, Projetos e Disco local (C:). |

Os itens dentro de Meu Computador ainda são estáticos. A navegação por pastas será conectada ao sistema de arquivos virtual.

### Estilos

| Arquivo | O que altera |
|---|---|
| `src/styles/global.css` | Configurações gerais, reset básico e dimensões do documento. |
| `src/styles/auth.css` | Aparência do login, autenticação e tela de boas-vindas. |
| `src/styles/desktop.css` | Aparência do desktop, papel de parede, ícones, menus, barra de tarefas, janelas e Meu Computador. Também contém regras de responsividade. |

### Imagens

| Arquivo | Uso |
|---|---|
| `src/assets/profile-avatar.webp` | Avatar no login, autenticação, boas-vindas e Menu Iniciar. |
| `src/assets/wallpaper.webp` | Papel de parede do desktop. |
| `src/assets/icons/computer.webp` | Ícone de Meu Computador. |
| `src/assets/icons/projects.webp` | Ícone de Meus Projetos. |
| `src/assets/icons/documents.webp` | Ícone de Meus Documentos. |
| `src/assets/icons/terminal.webp` | Ícone do Terminal. |
| `src/assets/icons/empty-trash.webp` | Lixeira vazia; imagem utilizada atualmente. |
| `src/assets/icons/default-trash.webp` | Lixeira com arquivos; imagem reservada para uso futuro. |

### Pastas reservadas

| Pasta | Situação |
|---|---|
| `src/system/filesystem/` | Reservada para a implementação do sistema de arquivos virtual. |
| `src/system/windows/` | Presente na estrutura documentada, sem responsabilidade atual detalhada. O gerenciamento de janelas está em `windowStore.ts`. |

## 7. Quero mudar algo: por onde começo?

| Alteração desejada | Arquivo ou local inicial |
|---|---|
| Trocar o avatar | `src/assets/profile-avatar.webp` |
| Trocar o papel de parede | `src/assets/wallpaper.webp` |
| Trocar a imagem de um ícone | Arquivo correspondente em `src/assets/icons/` |
| Alterar textos ou campos do login | `src/system/auth/LoginScreen.tsx` |
| Alterar mensagens ou duração da autenticação | `src/system/auth/AuthenticatingScreen.tsx` |
| Alterar a tela “Bem-vindo” | `src/system/boot/BootScreen.tsx` |
| Alterar a aparência das telas iniciais | `src/styles/auth.css` |
| Alterar ícones ou ações do desktop | `src/desktop/Desktop.tsx` |
| Alterar seleção ou duplo clique de um ícone | `src/desktop/components/DesktopIcon.tsx` |
| Alterar opções do Menu Iniciar | `src/desktop/components/StartMenu.tsx` |
| Alterar relógio ou botões da barra de tarefas | `src/desktop/components/Taskbar.tsx` |
| Alterar moldura, título ou controles das janelas | `src/desktop/components/WindowFrame.tsx` |
| Corrigir posição, foco ou estado das janelas | `src/stores/windowStore.ts` |
| Alterar o conteúdo de Meu Computador | `src/applications/computer/ComputerApp.tsx` |
| Alterar cores, espaçamentos ou tamanhos do desktop | `src/styles/desktop.css` |
| Adicionar uma nova fase principal | `src/types/system.ts`, `src/stores/systemStore.ts` e `src/App.tsx` |

### Cuidados ao modificar

1. Identifique se a mudança é de **aparência**, **conteúdo** ou **comportamento**.
2. Consulte a tabela acima para encontrar o ponto inicial.
3. Leia o componente e seus imports para localizar dependências.
4. Faça uma alteração pequena por vez.
5. Teste no navegador.
6. Execute `npm run build`.
7. Atualize este documento se a responsabilidade ou o status de algum recurso mudou.

Ao substituir uma imagem mantendo o mesmo caminho e nome, normalmente não é necessário alterar o import. Se renomear ou mover o arquivo, atualize suas referências.

### Como adicionar um aplicativo futuramente

1. Criar o componente em `src/applications/`.
2. Seguir o padrão de abertura usado por Meu Computador.
3. Conectar a abertura e a exibição do conteúdo em `Desktop.tsx`.
4. Usar `WindowFrame.tsx` para a estrutura da janela.
5. Adicionar o acesso no desktop ou no Menu Iniciar.
6. Testar abertura, foco, minimização, restauração e fechamento.

Consulte os tipos existentes: se houver uma lista restrita de identificadores de aplicativos, ela também precisará ser atualizada.

## 8. Próxima etapa: sistema de arquivos virtual

O sistema de arquivos virtual será uma estrutura compartilhada de pastas e arquivos.

**Meu Computador, Terminal, Desktop e Lixeira devem consultar os mesmos dados.**

Exemplo de comportamento futuro: excluir um arquivo pelo Terminal deve removê-lo da pasta exibida em Meu Computador e atualizar a Lixeira.

Não criar uma lista independente de arquivos para cada interface.

### Primeiros arquivos planejados

Estes arquivos ainda serão implementados.

| Arquivo | Responsabilidade planejada |
|---|---|
| `src/types/filesystem.ts` | Definir os campos e tipos de arquivos e pastas. |
| `src/system/filesystem/initialFileSystem.ts` | Definir as pastas e arquivos iniciais. |
| `src/stores/filesystemStore.ts` | Guardar os dados compartilhados e as ações do sistema de arquivos. |

### Primeiro objetivo

Criar e validar a estrutura de dados sem alterar inicialmente a interface de Meu Computador.

Depois, conectar `ComputerApp.tsx` aos dados para permitir navegação.

### Estrutura virtual planejada

Estes são caminhos simulados dentro do HOSSOMII OS, não caminhos da pasta `src/`.

| Caminho virtual | Conteúdo planejado |
|---|---|
| `C:\Usuários\Anthony\Área de Trabalho\` | Itens da área de trabalho. |
| `C:\Usuários\Anthony\Documentos\` | `leia-me.txt`, `sobre-mim.txt` e `currículo.pdf`. |
| `C:\Usuários\Anthony\Projetos\` | Pastas de TNT Basketball e Médicos & Dentistas. |
| `C:\Sistema\` | Arquivo crítico fictício `hossomii-shell.sys`. |
| `C:\Programas\` | Terminal. |

**Meus Projetos deve conter inicialmente apenas TNT Basketball e Médicos & Dentistas.**

## 9. Recursos planejados

### Explorador de arquivos

Evoluir Meu Computador para permitir:

- Entrar em pastas e voltar.
- Navegar pelo disco C:, Documentos e Projetos.
- Atualizar a barra de endereço.
- Abrir arquivos.

### Terminal

Usará o mesmo sistema de arquivos das demais interfaces.

| Comando planejado | Finalidade |
|---|---|
| `help` | Mostrar ajuda. |
| `dir` | Listar o conteúdo da pasta. |
| `cd` | Mudar de pasta. |
| `cls` | Limpar a tela. |
| `type` | Exibir o conteúdo de um arquivo de texto. |
| `open` | Abrir um item. |
| `del` | Excluir um arquivo; previsto para uma etapa posterior. |
| `restore` | Recuperar um arquivo; previsto para uma etapa posterior. |

### Lixeira

Nem todos os arquivos poderão ser excluídos.

| Campo planejado | Significado |
|---|---|
| `deletable` | Pode ser excluído. |
| `critical` | É importante para o funcionamento fictício do sistema. |
| `recoverable` | Pode ser recuperado. |
| `trashed` | Está na Lixeira. |
| `hidden` | Está oculto. |

A imagem deve acompanhar o conteúdo:

- Vazia: `empty-trash.webp`.
- Com arquivos: `default-trash.webp`.

## 10. Surpresa planejada: exclusão de arquivo crítico

Um arquivo especial, provisoriamente chamado `hossomii-shell.sys`, poderá ser excluído para iniciar um desafio.

Toda a falha será uma simulação dentro do portfólio.

### Sequência planejada

1. O visitante tenta excluir o arquivo.
2. Aparece uma confirmação.
3. Uma segunda confirmação surge em outra posição.
4. Uma terceira etapa pede uma frase engraçada no campo de texto.
5. O arquivo vai para a Lixeira.
6. O desktop parece continuar funcionando por um momento.
7. Surge uma falha crítica e uma tela azul fictícia.
8. Abre um ambiente de recuperação com um desafio textual.
9. O visitante diagnostica o problema, restaura o arquivo e reinicia a interface.
10. O desktop volta e exibe a conquista **“Eu avisei.”**

A previsão é que o arquivo retorne ao sistema e a Lixeira fique vazia após a recuperação. Quando houver outros arquivos excluídos, será necessário definir como preservar esses itens.

### Organização da lógica

Usar uma sequência de estados: cada estado representa uma etapa e determina qual ação pode acontecer a seguir.

Estados sugeridos, ainda não implementados:

| Estado | Etapa |
|---|---|
| `idle` | Aguardando interação. |
| `firstConfirmation` | Primeira confirmação. |
| `secondConfirmation` | Segunda confirmação. |
| `typedConfirmation` | Confirmação digitada. |
| `deleting` | Exclusão do arquivo. |
| `systemFailure` | Falha fictícia. |
| `recoveryDiagnostic` | Diagnóstico. |
| `recoveryRestore` | Restauração do arquivo. |
| `recoveryRestart` | Reinício da interface. |
| `recovered` | Recuperação concluída. |

Esses estados pertencem ao desafio. A integração com as fases principais do sistema ainda deverá ser definida.

## 11. Ordem de desenvolvimento

Login, autenticação, boas-vindas, desktop e gerenciamento de janelas já estão implementados.

Ordem planejada para continuar:

1. Sistema de arquivos virtual.
2. Navegação em Meu Computador.
3. Documentos e Projetos.
4. Lixeira.
5. Terminal.
6. Desafio do arquivo crítico.
7. Áudio.
8. Notificações inspiradas no Windows XP.
9. Painel de Controle.
10. Ajuda e suporte.
11. Camada visual inspirada em Watch Dogs.
12. Outras surpresas.
13. Animações e acabamento visual.
14. Melhorias para celular.
15. Ampliação da acessibilidade.
16. Otimização de desempenho.
17. Quick View — detalhes ainda não documentados.
18. `game.exe`.
19. Versão `v1.0.0`.

**`game.exe` será a última grande funcionalidade.** Antes disso, o restante da experiência deve estar funcional, visualmente refinado, responsivo e com o áudio ajustado.

## 12. Regras de desenvolvimento e Git

- Textos mostrados ao visitante: português do Brasil.
- Nomes no código e arquivos de implementação: inglês.
- A branch `main` deve permanecer funcional.
- Desenvolver novas funcionalidades em branches próprias, como `feat/filesystem`.
- Testar o recurso alterado e passar no build antes de considerá-lo concluído.
- Manter este documento atualizado.

Os commits seguem o padrão Conventional Commits:

| Prefixo | Uso | Exemplo |
|---|---|---|
| `feat:` | Nova funcionalidade. | `feat: implement virtual filesystem` |
| `fix:` | Correção de problema. | `fix: restore minimized window from taskbar` |
| `style:` | Ajuste visual, conforme o padrão atual do projeto. | `style: refine xp desktop shell` |
| `refactor:` | Reorganização do código sem mudar o comportamento esperado. | `refactor: simplify window state handling` |
| `docs:` | Alteração de documentação. | `docs: update project status` |

## 13. Ponto de retomada

**Próxima branch:** `feat/filesystem`.

**Próxima tarefa:** definir os tipos e os dados iniciais do sistema de arquivos virtual.

Checklist:

- [ ] Criar `src/types/filesystem.ts`.
- [ ] Criar `src/system/filesystem/initialFileSystem.ts`.
- [ ] Criar `src/stores/filesystemStore.ts`.
- [ ] Incluir as pastas e os arquivos planejados.
- [ ] Incluir somente TNT Basketball e Médicos & Dentistas em Projetos.
- [ ] Validar a estrutura de dados antes de alterar a interface.
- [ ] Conectar `ComputerApp.tsx` ao sistema de arquivos.
- [ ] Testar a navegação implementada.
- [ ] Executar `npm run build`.
- [ ] Atualizar este documento.