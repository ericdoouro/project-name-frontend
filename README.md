# News Explorer — Front-end

Aplicação web desenvolvida com React que permite pesquisar notícias por palavras-chave, visualizar artigos recentes e salvar conteúdos favoritos em uma área pessoal.

O projeto foi desenvolvido como parte do Projeto Final da formação Web Development da TripleTen, com foco na construção de uma aplicação front-end integrada a uma API de notícias e a um back-end próprio.

## Demonstração

**Aplicação publicada:** https://project-name-frontend-sepia.vercel.app

**Repositório:** https://github.com/ericdoouro/project-name-frontend

## Funcionalidades

- Pesquisa de notícias por palavras-chave.
- Exibição de resultados com título, descrição, imagem, data e fonte.
- Cadastro de usuários.
- Login e autenticação com token JWT.
- Persistência da sessão do usuário.
- Salvamento de artigos favoritos.
- Página exclusiva para visualizar artigos salvos.
- Remoção de artigos da lista de favoritos.
- Identificação das palavras-chave dos artigos salvos.
- Navegação entre páginas com rotas protegidas.
- Interface responsiva para diferentes tamanhos de tela.

## Tecnologias utilizadas

- **React 19:** construção da interface com componentes.
- **JavaScript (ES6+):** lógica e funcionalidades da aplicação.
- **React Router DOM 5:** gerenciamento de rotas e navegação.
- **Vite 8:** ferramenta de desenvolvimento e build.
- **HTML5:** estrutura da aplicação.
- **CSS3:** estilização e responsividade.
- **Fetch API:** comunicação com serviços externos e back-end.
- **LocalStorage:** armazenamento do token JWT e dos dados da última pesquisa.
- **Oxlint:** análise estática do código.

## Integrações

A aplicação utiliza dois serviços externos:

**API de notícias**

Integração com a News API por meio de um proxy para realizar pesquisas de notícias publicadas nos últimos sete dias.

**Back-end próprio**

Comunicação com uma API desenvolvida em Node.js e Express, responsável pelo cadastro, autenticação de usuários e gerenciamento dos artigos salvos.

## Como executar o projeto localmente

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Git instalado.

### 1. Clonar o repositório

```bash
git clone https://github.com/ericdoouro/project-name-frontend.git
```

### 2. Acessar a pasta do projeto

```bash
cd project-name-frontend
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar a variável de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_NEWS_API_KEY=sua_chave_da_news_api
```

Substitua `sua_chave_da_news_api` pela chave necessária para utilizar a API de notícias.

**Importante:** variáveis com prefixo `VITE_` são incorporadas ao código disponibilizado no navegador. Não utilize esse mecanismo para armazenar credenciais privadas.

### 5. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação, geralmente:

```text
http://localhost:5173
```

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o ambiente de desenvolvimento. |
| `npm run build` | Gera a versão de produção. |
| `npm run preview` | Executa uma prévia da versão de produção. |
| `npm run lint` | Executa a análise estática com Oxlint. |

## Back-end

O front-end consome o seguinte serviço:

https://project-name-backend.vercel.app

Para conhecer a implementação do servidor, consulte o repositório:

https://github.com/ericdoouro/project-name-backend

## Deploy

A aplicação está publicada na Vercel:

https://project-name-frontend-sepia.vercel.app

As atualizações da branch `main` são utilizadas no fluxo de publicação do projeto.

## Autor

Desenvolvido por **Eric Samuel do Ouro** como Projeto Final da formação Web Development da TripleTen.

[GitHub](https://github.com/ericdoouro) | [LinkedIn](https://www.linkedin.com/in/ericdoouro/)