# PRD — Painel de despesas

## 1. Visão geral

Aplicação web de página única para registrar despesas e acompanhar, em tempo real, o total gasto e a distribuição dos valores por categoria. O MVP será uma aplicação simples, sem persistência: os registros existem apenas enquanto a página permanece carregada.

## 2. Objetivo

Permitir que uma pessoa registre despesas manualmente e consulte:

- A lista das despesas adicionadas.
- A soma de todas as despesas.
- A soma das despesas em cada categoria.

## 3. Público e contexto de uso

- **Público:** pessoa que deseja acompanhar despesas de forma rápida e individual.
- **Contexto:** uso em navegador, em desktop ou dispositivo móvel.
- **Premissa:** não há conta, sincronização ou armazenamento dos dados entre sessões.

## 4. Escopo do MVP

### Incluído

- Formulário para adicionar uma despesa.
- Lista atualizada com as despesas registradas durante a sessão.
- Resumo geral e resumo por categoria na barra lateral.
- Categorias fixas: alimentação, transporte, saúde, lazer e outros.
- Layout responsivo para desktop e dispositivos móveis.

### Fora de escopo

- Persistência em banco de dados, armazenamento local ou servidor.
- Edição, remoção, importação ou exportação de despesas.
- Cadastro de categorias, relatórios, gráficos ou filtros.
- Autenticação, múltiplos usuários ou sincronização entre dispositivos.
- Integração com serviços financeiros.

## 5. Requisitos funcionais

### RF-01 — Adicionar despesa

- Exibir um card com formulário para cadastrar uma despesa.
- Solicitar título, valor e categoria.
- O campo de categoria deve oferecer somente as cinco categorias fixas definidas neste documento.
- Ao submeter dados válidos, adicionar a despesa à lista e atualizar os totais sem recarregar a página.
- Após o cadastro bem-sucedido, limpar o formulário e permitir um novo lançamento.

### RF-02 — Validar dados

- Título é obrigatório e não pode conter apenas espaços.
- Valor é obrigatório, numérico e maior que zero.
- Categoria é obrigatória e deve corresponder a uma das categorias permitidas.
- Se houver erro, não adicionar a despesa e apresentar uma mensagem associada ao campo inválido.
- A validação deve funcionar tanto na interação normal do formulário quanto no tratamento do evento de submissão.

### RF-03 — Listar despesas

- A estrutura da área de listagem deve estar declarada no HTML, abaixo do formulário.
- Apresentar nessa área todas as despesas adicionadas na sessão.
- Cada item deve exibir, no mínimo, título, categoria e valor.
- Ao iniciar sem despesas, apresentar um estado vazio informativo em vez de uma lista sem contexto.
- Para exibir itens repetidos, usar um `<template>` definido no HTML; o TypeScript pode cloná-lo e preencher seus campos com os dados, sem criar a estrutura dos itens como strings HTML.

### RF-04 — Resumir valores

- Exibir na barra lateral a soma dos valores de todas as despesas.
- Exibir o total de cada categoria fixa, inclusive categorias sem despesas, cujo total será zero.
- Atualizar todos os totais imediatamente após cada cadastro.
- Calcular os resumos a partir dos dados em memória, sem manter totais divergentes da lista.

### RF-05 — Tratar dados apenas em memória

- Manter despesas somente no estado da aplicação durante a sessão atual.
- Não persistir dados em localStorage, sessionStorage, cookies, banco de dados ou API.
- Ao recarregar ou fechar a página, os dados cadastrados são perdidos.

## 6. Requisitos técnicos

- Criar a aplicação com **Vite** e **TypeScript vanilla**, sem framework de interface.
- Utilizar HTML semântico, CSS e TypeScript simples, priorizando legibilidade e manutenção.
- Centralizar todas as definições de tipos em `src/types.ts`.
- Modelar uma despesa com:
  - `id: string`
  - `titulo: string`
  - `valor: number`
  - `categoria: Categoria`
- Modelar `Categoria` como um tipo restrito às opções fixas: `alimentação`, `transporte`, `saúde`, `lazer` e `outros`.
- Gerar um identificador único para cada despesa no momento do cadastro.
- Registrar eventos e interações no TypeScript; não usar atributos de evento inline no HTML.
- Declarar diretamente no HTML toda a estrutura semântica da interface, incluindo a barra lateral, o formulário, a área de resumo, a lista, o estado vazio e o template de cada despesa. O HTML deve conter essa estrutura dentro do elemento raiz da aplicação (por exemplo, `#app`).
- Restringir o TypeScript à lógica de dados e à interação com a estrutura HTML existente: ler e validar os campos, atualizar o estado em memória, preencher os elementos de resumo, alternar o estado vazio e a lista, e clonar/preencher o template HTML para cada despesa.
- Não montar a estrutura da interface no TypeScript: não inserir strings de marcação com `innerHTML`, nem criar programaticamente a estrutura visual da aplicação ou dos itens. A responsabilidade pela marcação permanece no HTML; o TypeScript apenas a associa aos dados e atualiza seu conteúdo.
- Manter uma única fonte de verdade em memória para despesas e derivar dela a lista e os resumos.
- Não adicionar dependências de runtime ou infraestrutura que não sejam necessárias ao MVP.
- Exibir valores monetários em formato consistente para a localidade pt-BR e a moeda Real (BRL).

## 7. Requisitos visuais e de interação

- A interface principal deve organizar:
  1. Uma barra lateral à esquerda com o total geral e os totais por categoria.
  2. Na área de conteúdo, o card de cadastro acima da lista de despesas.
- Em telas estreitas, reorganizar a barra lateral e o conteúdo em uma coluna, preservando a ordem e a leitura dos totais e da lista.
- Diferenciar visualmente formulário, resumo e itens da lista por meio de cards ou áreas claramente delimitadas.
- Destacar os valores monetários e manter títulos e categorias fáceis de localizar.
- Manter espaçamento, alinhamento, contraste e hierarquia tipográfica consistentes.
- Os campos devem ter rótulos visíveis; erros e estado vazio devem ser compreensíveis sem depender apenas de cor.
- Botões e campos devem ser utilizáveis por teclado e apresentar foco visível.
- Usar textos de interface em português.

## 8. Modelo de dados

```ts
type Categoria =
  | "alimentação"
  | "transporte"
  | "saúde"
  | "lazer"
  | "outros";

type Despesa = {
  id: string;
  titulo: string;
  valor: number;
  categoria: Categoria;
};
```

O modelo acima é conceitual: as declarações efetivas devem ficar em `src/types.ts`, conforme a organização do projeto.

## 9. Critérios de aceite

1. A aplicação inicia por meio do fluxo de desenvolvimento do Vite e renderiza sem erro no navegador.
2. É possível cadastrar uma despesa informando título, valor válido e uma categoria permitida.
3. Após o cadastro, o formulário é limpo, a despesa aparece na lista e o total geral e o total da categoria correspondente são atualizados.
4. Os totais das demais categorias permanecem corretos, e categorias sem lançamentos mostram zero.
5. Título vazio, valor ausente, não numérico ou menor/igual a zero impedem o cadastro e produzem feedback visível.
6. Uma sessão sem despesas apresenta um estado vazio e totais iguais a zero.
7. Recarregar a página remove as despesas da sessão anterior.
8. A interface permanece compreensível e utilizável em telas largas e estreitas, com navegação por teclado e foco visível.
9. A estrutura semântica da interface está declarada no HTML dentro do elemento raiz da aplicação; o TypeScript apenas atualiza dados/conteúdo e clona o template HTML para exibir despesas, sem montar marcação HTML.
10. Nenhum evento é declarado inline no HTML e os tipos do domínio estão em `src/types.ts`.

## 10. Decisões e pontos não especificados

- A remoção e a edição de despesas não foram descritas no brain dump e, portanto, não fazem parte do MVP.
- Não foi definida uma identidade visual específica (paleta, marca, ícones ou tipografia); a implementação deve usar uma apresentação limpa, consistente e legível, sem introduzir requisitos de marca.
- O formato monetário deve ser BRL por coerência com a interface em português; caso o produto precise representar outra moeda, essa decisão deverá ser revista antes da implementação.
