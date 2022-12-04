# :shorts: Shortly Back

# Índice

- [Sobre](#Sobre)
- [Rotas](#Rotas)
  - [Rotas não autenticadas:](#Rotas-não-autenticadas)
    - [Cadastro](#Cadastro)
    - [Login](#Login)
    - [Listar URLs](#Listar-URLs)
    - [Buscar uma URL pelo id](#Buscar-uma-URL-pelo-id)
    - [Abrir URL encurtada](#Abrir-URL-encurtada)
    - [Listar ranking](#Listar-ranking)
  - [*Rotas autenticadas*:](#Rotas-autenticadas)
    - [Encurtar URL](#Encurtar-URL)
    - [Listar URLs do usuário](#Listar-URLs-do-usuário)
    - [Apagar URL](#Apagar-URL)
    - [Logout](#Logout)
- [Como rodar em desenvolvimento](#Como-rodar-em-desenvolvimento)

<br/>

# Sobre
Shorty Back é a API do [Shortly](https://github.com/AnaLTFernandes/shortly), um site encurtador de URLs.

<br/>

# Rotas

## Rotas não autenticadas

## Cadastro
- Rota: `/signup`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "name": "João",
    "email": "joao@mail.com.br",
    "password": "joao",
    "confirmPassword": "joao"
  }
  ```

- Possíveis erros:
	- Campos ausentes, vazios ou com tipos diferente de string
	- Campo *email* com email no formato inválido
	- Campo *password* e *confirmPassword* devem ser iguais
	- Já existe um usuário com os dados informados

## Login
- Rota: `/signin`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "email": "joao@mail.com.br",
    "password": "joao",
  }
  ```
- Exemplo de Resposta:

  ```json
  {
    "token": "oldjnbkashdfucoslk.fasjihfaio.ashuifjhabicih",
  }
  ```
- Possíveis erros:
	- Campos ausentes, vazios ou com tipos diferente de string
	- Campo *email* com email no formato inválido
	- Não existe usuário com os dados informados

## Listar URLs
- Rota: `/urls`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 2,
      "url": "https://google.com"
    },
    {
      "id": 1,
      "url": "https://youtube.com"
    }
  ]
  ```

## Buscar uma URL pelo id
- Rota: `/urls/:id`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  {
    "id": 1,
    "shortUrl": "bd8235a0",
    "url": "https://google.com"
  }
  ```
- Possíveis erros:
	- Não existe URL com o id informado

## Abrir URL encurtada
- Rota: `/urls/open/:shortUrl`
- Método: `GET`
- Possíveis erros:
	- Não existe URL encurtada

## Listar ranking
- Rota: `/ranking`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 2,
      "name": "Maria",
      "linksCount": 5,
      "visitCount": 100000
    },
    {
      "id": 1,
      "name": "João",
      "linksCount": 2,
      "visitCount": 7
    }
  ]
  ```

<br/>

## Rotas autenticadas
- Enviar Header Authorization no formato: `Bearer {token}`
- Possíveis erros:
	- Header Authorization ausente
	- Token inválido

## Encurtar URL
- Rota: `/urls/shorten`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "url": "https://youtube.com",
  }
  ```
- Exemplo de Resposta:

  ```json
  {
    "shortUrl": "a8745bcf",
  }
  ```
- Possíveis erros:
	- Campo *url* ausente, vazio ou com tipo diferente de string
	- Campo *url* com url inválida

## Listar URLs do usuário
- Rota: `/users/me`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  {
    "id": 1,
    "name": "João",
    "visitCount": 7,
    "shortenedUrls": [
      {
        "id": 1,
        "shortUrl": "a8745bcf",
        "url": "https://youtube.com",
        "visitCount": 5
      },
      {
        "id": 2,
        "shortUrl": "bd8235a0",
        "url": "https://google.com",
        "visitCount": 2
      }
    ]
  }
  ```
- Possíveis erros:
	- Usuário não existe

## Apagar URL
- Rota: `/urls/:id`
- Método: `DELETE`
- Possíveis erros:
	- Não existe URL com o id informado
	- A URL não pertence ao solicitante da requisição

## Logout
- Rota: `/logout`
- Método: `POST`

<br/>

# Como rodar em desenvolvimento

**Atenção:** para rodar o projeto é preciso ter o [PostgreSQL](https://www.postgresql.org/download/) instalado em sua máquina.

1. Clone esse repositório:
>```bash
> git clone https://github.com/AnaLTFernandes/shortly-back.git
>```

2. Instale as dependências:
>```bash
>$ npm install
>```

3. Crie um banco de dados PostgreSQL com o nome que desejar

4. Rode o comando na raiz do projeto para criar as tabelas:
>```bash
>#troque nome_do_banco pelo nome do banco de dados criado no passo anterior
>$ sudo su -c "psql -d nome_do_banco -f dump.sql" postgres
>```

5. Configure o arquivo `.env` usando como base o arquivo `.env.example`

6. Inicie o projeto:
>```bash
>$ npm run dev
>```

7. Instale e configure o frontend em https://github.com/AnaLTFernandes/shortly

8. Divirta-se nas rotas usando de URL base: `http://localhost:{ENV_PORT}`
