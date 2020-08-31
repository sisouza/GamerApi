# GamerApi
API desenvolvida durante o curso de Formação node.js na Udemy.
## Endpoints
### GET /games
Endpoint responsável por retornar a listagem de todos os games cadastrados no  banco de dados. 
#### Parámetros 
Nenhum
#### Respostas
#### OK! 200
EXEMPLO:

```

[
    {
        "id": 1,
        "title": "BubbleShot",
        "year": 2020,
        "price": 10
    },
    {
        "id": 2,
        "title": "Zelda",
        "year": 2020,
        "price": 30
    },
    {
        "id": 3,
        "title": "Need For Speed",
        "year": 2020,
        "price": 50
    },
    {
        "id": 4,
        "title": "Jazz Jack The Rabbit",
        "year": 2020,
        "price": 30
    }
]

```

##### Falha na autenticação! 401
Caso essa resposta aconteça você  vai receber a listagem de todos os games.
Caso essa resposta aconteça, isso significa que ocorreu alguma falha durante o processo de autenticação. Motivos: Token inválido, token expirado.

EXEMPLO:

```
{
    "err": "Token inválida
}


```

### POST /auth
Endpoint responsavel por retornar o sistema de login.

#### Parámetros

email: E-mail do usuário cadastrado no sistema.
senha: senha do usuário cadastrado no sistema.

EXEMPLO: 

``` 

{
    "email": "victordevtb@guiadoprogramador.com",
    "password": "nodejs"
}

```

#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber o token JWT afim de conseguir acesso aos endpoints. 

EXEMPLO:

```

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2aWN0b3JkZXZ0YkBndWlhZG9wcm9ncmFtYWRvci5jb20iLCJpYXQiOjE1OTg4ODgzMDksImV4cCI6MTU5OTA2MTEwOX0.dM1Q0wlWrLfaIcyeCoF_kgG_OBikajSHErOpqoeAPX0"
}

```

#### Falha na autenticaço! 401
Caso essa resposta aconteça, isso significa que aconteceu uma falha durante a autenticação da requisiçãoão 

EXEMPLO:

```
{err:"Credenciais iválidas"}

```
