<h1 align="center">
    <img alt="Happy" title="Happy" src=".github/logo.svg" />
</h1>

<p align="center">
  <a href="#computer-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wrench-instalação">Instalação e configuração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#exclamation-progresso">Progresso (updates & issues)</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=15C3D6">
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/aadelgrossi/nlw3-happy?color=15C3D6">
  <img alt="Top language" src="https://img.shields.io/github/languages/top/aadelgrossi/nlw3-happy?color=15C3D6">
  <img alt="Issues" src="https://img.shields.io/github/issues/aadelgrossi/nlw3-happy?color=15C3D6">
</p>

<br>

<p align="center">
  <img alt="Happy" src=".github/happy.png" width="100%">
</p>

## :computer: Projeto

O Happy é uma aplicação que conecta pessoas à casas de acolhimento institucional para fazer o dia de muitas crianças mais feliz. A proposta do projeto foi envisionada e criada pelo time [Rocketseat](https://rocketseat.com.br/); a aplicação teve suas funcionalidades e requisitos iniciais implementados durante o período de uma semana no evento online [Next Level Week](https://nextlevelweek.com/) #3 promovido pela empresa.

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [Next.JS](https://nextjs.org/)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)
- [TypeScript](https://www.typescriptlang.org/)


## :wrench: Instalação

O projeto consiste em um monorepo reunindo a API (rotas e banco de dados), cliente web (front-end com React + NextJS) e cliente mobile (React Native usando Expo). Para replicar e rodar o projeto em sua máquina local:

### 1. Clone o repositório 

```bash
git clone https://github.com/aadelgrossi/nlw3-happy.git
```

### 2. Instale as dependências

```bash
yarn
```

Obs.: no Windows, é necessário rodar `yarn` com privilégios de administrador para que o comando *postinstall* complete com sucesso.

### 3. Verifique e atualize as configurações do banco de dados em /packages/api/orm.config.json

Para rodar o projeto você deve possuir uma instância do Postgres em sua máquina e um banco de dados criado (por padrão *nlw3-happy*, caso deseje renomear para outro altere na linha database pelo nome escolhido)

```json
  ...
  "host": "localhost", // troque pelo IP/endereço da sua instância Postgres
  "port": 5432, // porta (padrão 5432)
  "username": "postgres", // login da sua instância Postgres
  "password": "postgres", // senha da sua instância Postgres
  "database": "nlw3-happy", // nome do banco de dados
  ...
```

### 4. Execute as migrations e popule o banco com dados

```bash
yarn db:migrate && yarn db:seed
```

### 5. Iniciar os servidores

Para executar o servidor da API:
```bash
yarn run:api
```

Para rodar o cliente web:
```bash
yarn run:web
```

Para rodar o cliente mobile:
```bash
yarn run:mobile
```

## :exclamation: Progresso

O projeto segue sob atualização para a versão 2.0 com o objetivo de atingir as especificações e novas funcionalidades descritas no documento [Desafio 2.0](https://www.notion.so/Vers-o-2-0-do-Happy-c754db7a4d41469e8c2d00fcf75392c4), fornecido pela equipe da Rocketseat como uma forma de levar a aplicação ao próximo nível. 

As features e issues remanescentes para implementação e bugs para correção encontram-se listadas e catalogadas na aba [Issues](https://github.com/aadelgrossi/nlw3-happy/issues) deste repositório e o projeto encontra-se aberto para contribuições e melhorias (comentários, sugestões de fixes ou refatorações e pull requests são mais que bem-vindos :smile: )

## :memo: Licença

Esse projeto está sob a licença [MIT](https://github.com/aadelgrossi/nlw3-happy/blob/master/LICENSE)