# API Proffy

## Execução do Projeto
Este projeto utiliza [Yarn](https://yarnpkg.com/getting-started/install) por padrão, sinta-se livre para usar o [npm](https://www.npmjs.com/)

`yarn` - Instalação de dependências
`yarn start` - Execução do servidor [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

## Migrations
O banco de dados é manipulado através do [knex](http://knexjs.org/),
entretanto ainda não há um suporte completo do projeto para typescript,
portanto para executar os comandos do knex é necessário adicionar
`knex --knexfile knexfile.ts`(e podem ser necessárias modificações no arquivo
`knexfile.ts`) antes do comando propriamente dito.
Você pode listar todos os comandos utilizando `yarn knex` (ou `npx knex`)
para facilitar dois comandos podem ser executado via script, são eles:

`yarn knex:migrate` - Criar as tabelas do banco de dados

`yarn knex:migrate:rollback` - Resetar as tabelas do banco de dados

## Urls
 - Produção: `TODO`,
 - Desenvolvimento: `http://localhost:3333`,

## Rotas

### Listar Aulas Disponíveis

Busca as aulas disponíveis, filtrada por matéria, dia da semana e horário.

**URL** : `/classes`

**Método** : `GET`

**Parâmetros de Consulta** :
| Parâmetro        | Observação                               |
| ---------------- | ---------------------------------------- |
| week_day         | Número entre 0-6 (0: Domingo, 6: Sábado) |
| subject          | Matéria a ser buscada                    |
| time             | Horário desejado                         |

**Exemplo de Requisição**: `curl --request GET \
  --url 'http://localhost:3333/classes?week_day=1&subject=Matem%C3%A1tica&time=8%3A00'`

**Resposta**:
```json
[
  {
    "id": 1,
    "subject": "Matemática",
    "cost": 80,
    "user_id": 1,
    "name": "Nome do Professor",
    "avatar": "https://picsum.photos/200/300",
    "whatsapp": "85112233445",
    "bio": "Lorem ipsum dolor sit amet"
  }
]
```

 ### Criar aula disponível

 Endpoint para cadastro de disponibilidade do professor

 **URL** : `/classes`

**Método** : `POST`

**Cabeçalho** :
| Chave       |            Valor |
| ----------- | ---------------- |
|Content-Type | application/json |

**Corpo da Requisição** :
```json
{
	"name": "Nome do Professor",
	"avatar": "https://picsum.photos/200/300",
	"whatsapp": "85112233445",
	"bio": "Lorem ipsum dolor sit amet",
	"subject": "Matemática",
	"cost": 80,
	"schedule": [
		{
			"week_day": 1,
			"from": "8:00",
			"to": "12:00"
		},
		{
			"week_day": 3,
			"from": "10:00",
			"to": "18:00"
		},
		{
			"week_day": 4,
			"from": "8:00",
			"to": "12:00"
		}
	]
}
```

**Exemplo de Requisição**: ```curl --request POST \
  --url http://localhost:3333/classes \
  --header 'content-type: application/json' \
  --data '{
	"name": "Nome do Professor",
	"avatar": "https://picsum.photos/200/300",
	"whatsapp": "85112233445",
	"bio": "Lorem ipsum dolor sit amet",
	"subject": "Matemática",
	"cost": 80,
	"schedule": [
		{
			"week_day": 1,
			"from": "8:00",
			"to": "12:00"
		},
		{
			"week_day": 3,
			"from": "10:00",
			"to": "18:00"
		},
		{
			"week_day": 4,
			"from": "8:00",
			"to": "12:00"
		}
	]
}'```

**Resposta**: `status: 201 - Created`

### Listar Conexões

Lista a quantidade total de alunos que já interagiram com professores através do whatsapp

**URL** : `/connections`

**Método** : `GET`

**Exemplo de Requisição**: `curl --request GET \
  --url http://localhost:3333/connections`

**Resposta**:
```json
{
  "total": 10
}
```

### Criar nova conexão

 Criar nova interação com o professor associado à matéria

 **URL** : `/connections`

**Método** : `POST`

**Cabeçalho** :
| Chave       |            Valor |
| ----------- | ---------------- |
|Content-Type | application/json |

**Corpo da Requisição** :
```json
{
	"user_id": 1
}
```

**Exemplo de Requisição**: ```curl --request POST \
  --url http://localhost:3333/connections \
  --header 'content-type: application/json' \
  --data '{
	"user_id": 1
}'```

**Resposta**: `status: 201 - Created`
