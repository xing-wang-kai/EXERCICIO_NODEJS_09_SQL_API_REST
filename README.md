Arquivos do módulo inicial de Node + Typescript, da estrutura MVC aplicada.

### Pré-requisitos globais:
`npm i -g nodemon typescript ts-node`

### Instalação
`npm install`

### Para rodar o projeto
`npm run start-dev`

----------------------------------------------------------------------
ORM = OBJECT RELATIONAL MAPPER 

cria uma cópia do bnc dado no código, descrevendo todas informações.
para que o código para se relacionar ao banco de dados.

desta forma o código saberá como lidar com as informações no banco de
dados.

----------------------------------------------------------------------
Sequelize --

biblioteca Promise-based funciona para NODE sendo uma ORM funciona
para diversos bancos de dados.

-------------------------------------------------------------------------
PARA CONEXAO COM Sequelize

instalar 
    [  npm install myql2  ]

PARA INSTALAR CONEXAO DEVEMOS ENTÃO INSTACIAR A PORT DO MYSQL E DOS dados

###CRIAR CONEXÃO

            ~~~
            import { Sequelize } from 'sequelize';
            import 'dotenv/config';


            export const sequelize = new Sequelize( 
                process.env.MYSQL_DB as string,
                process.env.MYSQL_USER as string,
                process.env.MYSQL_PASSWORD as string,
                {
                    host: process.env.MYSQL_HOST as string,
                    port: Number.parseInt(process.env.MYSQL_PORT as string),
                    dialect: 'mysql'
                }
            )

            ~~~

    