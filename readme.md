# Vulcano — Ficha de Herói — Parte 2

Projeto acadêmico desenvolvido com HTML, CSS e JavaScript.
Continuação da ficha de RPG criada na Parte 1, preservando
o personagem Vulcano e sua identidade visual.

## Sobre o personagem

Vulcano é um Guerreiro-Arquiteto Digital de Ostrogard.
Sua história envolve a reconstrução das defesas do reino
e a recuperação de uma antiga forja sob a montanha.

A ficha descreve a Regeneração de Construção como uma
habilidade que exige nível 60 e o Martelo de Ostrogard.

No nível 70, o personagem recebe o título Mestre das Forjas,
uma nova aparência e um troféu no inventário.

## Tecnologias utilizadas

- HTML: estrutura e conteúdo.
- CSS: aparência, responsividade e estados visuais.
- JavaScript: interações, validação e atualização da página.
- Google Fonts: fonte Rajdhani.
- localStorage: armazenamento local do nível e da experiência.

## Organização dos arquivos

- index.html
- style.css
- script.js
- readme.md
- imagens/
  - vulcano-nordico.png
  - vulcano-fundo.png
  - vulcano-mestre-das-forjas.png

## Como abrir

1. Extraia a pasta do projeto.
2. Mantenha os arquivos e a pasta imagens juntos.
3. Abra o index.html no navegador.

Também é possível abrir a pasta no VS Code e usar Live Server.
Para testar o salvamento, use sempre o mesmo navegador
e o mesmo endereço do projeto.

A fonte Rajdhani e o acesso ao Gmail precisam de internet.

## Funcionalidades de JavaScript

### Menu responsivo

Em telas pequenas, o botão abre e fecha o menu.
O ícone alterna entre ☰ e ✕.
O menu também fecha ao escolher uma seção ou pressionar Escape.
Em telas largas, os links ficam visíveis.

### Inventário dinâmico

Um array de objetos contém cinco itens iniciais,
com nome, tipo, raridade e descrição.

Os cartões são criados com createElement e forEach.
Os filtros usam filter para selecionar os itens por tipo.
O contador informa o total conquistado e quantos estão visíveis.

### Experiência e evolução

Cada missão concede 25 XP.
Ao completar 100 XP, Vulcano sobe um nível e começa
a acumular experiência para o próximo.

A barra, o nível e as mensagens são atualizados na página.

### Conquista do nível 70

Ao alcançar o nível 70, a imagem do personagem muda,
o título Mestre das Forjas aparece e um troféu é
adicionado ao inventário sem duplicação.

### História expansível

Um botão mostra ou esconde a história completa.
O texto alterna entre “Ver história completa” e “Ver menos”
com o operador ternário.

### Formulário de contato

O JavaScript usa preventDefault para controlar o formulário.
Nome, e-mail e mensagem são obrigatórios.
O formato básico do e-mail é verificado, e a mensagem
tem limite de 2.000 caracteres.

Os erros aparecem na página, e o foco vai para
o campo que precisa de correção.

Após a validação, o Gmail abre com a mensagem preenchida.
O visitante precisa confirmar o envio no Gmail.
O site não envia mensagens automaticamente.

### Modo noturno

Um botão alterna uma classe no body.
O modo noturno escurece o cenário sem retirar a imagem de fundo.
Outro clique restaura o visual original.

### Saudação por horário

Uma mensagem de bom dia, boa tarde ou boa noite
é escolhida conforme o horário local do visitante.

## Pesquisa complementar: localStorage

O projeto utiliza localStorage para guardar o nível
e a experiência no navegador.

JSON.stringify transforma os dados em texto para salvar.
JSON.parse recupera os dados, que são verificados antes do uso.

O tratamento com try/catch permite continuar jogando
caso o armazenamento esteja indisponível.

Somente nível e XP são salvos.
Os campos do formulário não são armazenados.

O progresso não é compartilhado entre dispositivos
e pode ser apagado ao limpar os dados do site.

## Decisões de UI/UX

### Continuidade visual

Foram mantidos o cenário, as cores e os cartões da Parte 1.
Os novos controles seguem o mesmo padrão visual.

### Visibilidade do estado

O ícone do menu informa se ele está aberto ou fechado.
O filtro selecionado fica destacado.
O nível e a experiência permanecem visíveis.

### Feedback imediato

Ganhar XP, conquistar o título, validar o formulário
e salvar o progresso produzem mensagens na página.

### Prevenção de erros

O formulário informa que os campos são obrigatórios.
Entradas inválidas recebem destaque e orientação textual.

### Controle do usuário

O visitante pode fechar o menu e a história,
voltar ao filtro Todos e restaurar o tema original.

### Acessibilidade

Os campos possuem rótulos.
Os controles indicam foco de teclado.
São usados atributos como aria-expanded, aria-pressed
e aria-invalid, além de regiões de status.

As animações respeitam a preferência por movimento reduzido.

### Navegação

Os links possuem rolagem suave.
O botão de martelo permite voltar ao início da página.

## Roteiro de testes

- Abrir e fechar o menu em uma tela pequena.
- Conferir os links do menu em uma tela larga.
- Mostrar e esconder a história.
- Testar todas as categorias do inventário.
- Completar quatro missões e conferir a subida de nível.
- Atualizar a página e conferir o progresso salvo.
- Conferir a imagem e o troféu no nível 70.
- Enviar o formulário vazio e com e-mail inválido.
- Validar os campos e conferir a mensagem preparada no Gmail.
- Ativar e desativar o modo noturno.
- Conferir a navegação por teclado.
- Verificar se não há conteúdo cortado ou rolagem horizontal
  no computador e no celular.

## Créditos

Personagem e projeto: Tarik.
A imagem da evolução do nível 70 foi criada com auxílio
de inteligência artificial, usando a imagem original como referência.