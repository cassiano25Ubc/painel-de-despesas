# 💰 Painel de Despesas

Aplicação web para gerenciamento e acompanhamento de despesas pessoais, desenvolvida com **TypeScript, HTML e CSS**, utilizando **Vite** como ferramenta de desenvolvimento.

O projeto permite cadastrar despesas, classificá-las por categoria e acompanhar automaticamente o valor total e os gastos separados por categoria.

## 🚀 Demonstração

> **Executar projeto :** (https://painel-de-despesas.vercel.app/)

⚠️ O endereço acima funciona quando o projeto está sendo executado localmente através do Vite. Para disponibilizar uma demonstração pública, o projeto precisa ser hospedado em um serviço como Vercel, Netlify ou GitHub Pages.

## ✨ Funcionalidades

* Adicionar novas despesas
* Definir título e valor da despesa
* Classificar despesas por categoria
* Cálculo automático do total de despesas
* Resumo dos gastos por categoria
* Formatação dos valores em Real brasileiro (R$)
* Validação dos campos do formulário
* Mensagens de erro para dados inválidos
* Geração de identificador único para cada despesa
* Interface responsiva para diferentes tamanhos de tela

### 📂 Categorias disponíveis

* 🍔 Alimentação
* 🚗 Transporte
* ❤️ Saúde
* 🎮 Lazer
* 📦 Outros

## 🛠️ Tecnologias utilizadas

### TypeScript

Responsável pela lógica da aplicação, tipagem dos dados, validações, cálculos e atualização da interface.

### HTML

Utilizado para estruturar o painel, formulário de cadastro, resumo financeiro e lista de despesas.

### CSS

Responsável pelo layout, estilização, responsividade, estados dos elementos e identidade visual da aplicação.

### Vite

Utilizado como ambiente de desenvolvimento e ferramenta de build do projeto.

## 🧠 Conceitos aplicados

Durante o desenvolvimento foram utilizados conceitos importantes de desenvolvimento front-end, como:

* Tipagem com TypeScript
* Interfaces e tipos
* Arrays
* Funções
* Manipulação do DOM
* Eventos de formulário
* Validação de dados
* `reduce()`
* `forEach()`
* `Intl.NumberFormat`
* Template HTML
* CSS Grid
* Flexbox
* CSS Variables
* Design responsivo

## 📁 Estrutura do projeto

```text
painel-de-despesas/
│
├── src/
│   ├── main.ts
│   ├── types.ts
│   └── style.css
│
├── index.html
├── package.json
├── package-lock.json
└── vite.config.ts
```

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/cassiano25Ubc/painel-de-despesas.git
```

### 2. Entre na pasta

```bash
cd painel-de-despesas
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 5. Acesse no navegador

```text
http://localhost:5173/
```

## 📊 Funcionamento

O usuário informa:

* Nome da despesa
* Valor
* Categoria

Após adicionar uma despesa, o sistema atualiza automaticamente o resumo financeiro e a lista de despesas.

Os valores são armazenados em memória durante a execução da aplicação e os totais são calculados dinamicamente a partir das despesas cadastradas.

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de praticar e consolidar conhecimentos de **desenvolvimento front-end**, principalmente na utilização de **TypeScript**, manipulação do DOM, tipagem de dados, validação de formulários e organização de uma aplicação utilizando Vite.

## 👨‍💻 Autor

**Cassiano Maia**

Estudante de Ciência da Computação e desenvolvedor em formação, com foco em desenvolvimento web.

---

⭐ Se este projeto foi útil ou interessante para você, considere deixar uma estrela no repositório.
