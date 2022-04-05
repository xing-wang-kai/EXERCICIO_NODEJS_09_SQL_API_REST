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

```javascript
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

```
Para executar um teste de conexão basta somente utilizar o comando do sequelize

```javascript

try{
        await sequelize.authenticate();
        console.log('conexão estabelecida com sucesso!! ')
    }catch{
        console.log('Ocorreu um erro no momento da conexão')
    }

```

Ou então:: 

```javascript

    sequelize.authenticate()
             .then( console.log('conexão ao BD realizada com sucesso!!'));
             .catch((error)=> console.log('ocorreu um erro ao tentar conectar ao bnc dados'))

```
----------------------------------------------------------------------
### CRIANDO TABELAS DO BD EM MODELS COM Typescript
----------------------------------------------------------------------

--> Para criar uma tabela precisamos importar duas principais instancias do sequelize.

```javascript
import { DataTypes, Models } from 'sequelize';
```

--> Após importar estas duas instancias precisamos definir uma interface para definir os 
types que serão aceitos.

```javascript

interface userInstance extends Model {
    id: number;
    name: string;
    age: number;
}

```

--> nesta insterface irá exender os conteúdos e tipos de Models do Sequelize, os campos de criação serão
ID, NAME, AGE;

--> após este processo precisamos então criar a construção do banco de dados da seguinte maneira.
```javascript

const user = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIcrement: true,

    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
}

```

--> Em seguida podemos criar as options da construção do banco de dados.

```javascript
const options = {
    freezeTableName: true,
    tableName: 'users',
    timeStamps: true,
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm',
    version: 'versao'
}

```
--> Dentro da configurações de options termos, freezeTableName que define
que o nome será modificado, tableName define o nome de nossa tablea no banco de dados
a opção timeStamps cria 3 novas colunas no nosso banco que será chamadas de createdAt, updatedAt e version
podemos renomear as colunas como foi realizado acima no código. **Em caso de não querer criar as colunas podemos
então somente colocar 'false' em timeStamps.

---> Agora para definir a criação do banco de dados, será invocado do sequelize ( onde está nossa conexão ) o 
method chamado define ( definir ) este method irá construir a tablela.

```javascript
const definir = sequelize.define<userInstance>('users', user, options)

export default definir;

```

--> Após a palavra define será colocado o type que criamos para o banco de dados, que será o criado acima.
primerio parametro é o nome da tabela, segundo paramentro os dados que serão inseridos na tabela, depois
options são as opiniões que definimos para a tabela.

----------------------------------------------------------------------------------------------------------
###USANDO METHODS PARA PESQUISAR COM OP DO Sequelize
----------------------------------------------------------------------------------------------------------

|grand than Equal | Lower Than Equal | between      | or     | in       | like     |
|-----------------|------------------|--------------|--------|----------|----------|
|[Op.gte]         |   [Op.lte]       | [op.between] |[Op.or] |[Op.in]   | [Op.like]|
|value            |   value          |[value, value]| [value]|[value]   | 'a%'     |


EX.: 
```javascript

    const value = await User.findAll({ 
        where: {
            idade: {
                [Op.gte]: 18,
                [Op.lte]: 20
            }
        }
    })

```

** O código acima retorna os valores de idade que sejam maiores e iguais a 18 e menores que 20...
----------------------------------------------------------------------------------------------------------
###ATRIBUTOS PARA PESQUISAR
----------------------------------------------------------------------------------------------------------

Estes comandos são usandos para filtra alguns valores dentro do banco de dados quando damos retorno nos mesmo
com findAll.

|   | comandos  | informações      | detalhes                           |
|---|-----------|------------------|------------------------------------|
|1) |attributes:| ['name', 'name'] | - quais campos retornaram da pesquisa |
|2) |order:     | ["name", "ASC"]  |- pode ser DESC  - a ordem de retorno dos dados|
|3) |group:     | ['name']         |- como será agrupado os dados|
|4) |having:    |sequelize.literal(count('value') > number) | - contendo count dentro das informações.|
|5) |limit:     | number value     |                        |
|6) |offset:    | number value     | - pula tantos itens para antes de visualizar |

EX.:

```javascript

    const value = await User.findAll({ 
        where: {
            idade: {id: Number.parserInt( id )},
        },
        attributes: ['name', 'idade'],                  // Retorna somente as columms nome e idade.
        offset: 10,                                     // Os valores contados começaram do 10,
        limits: 20,                                     // O resultado só retornará 20 linhas do código.
        order: [["idade", "DESC"]],                     // retorna ordenado por idade decrescendo para ascendente usa ASC
        group: ["name"],                                // Agrupa por name os valores.
        having: sequelize.literal( "count('idade') > 5")// Executa um comando de forma literal do SQL
})

```
------------------------------------------------------------------------------------------------------------

### AUTHENTICATE vs AUTHORIZATION

AUTHENTICATE = Autenticar informações para permitir o acesso.
AUTHORIZATION = Autorizar acesso a determinada funcionabilidade.

------------------------------------------------------------------------------------------------------------

### BCRYPT

------------------------------------------------------------------------------------------------------------

npm install BCRYPT
npm install --save-dev @types/bcrypt 

É uma biblioteca usado para criar HASH e salvar senhas de forma protegidas com chave de cryptografia váriate.
ex.:

```javascript
import bcrypt from "bcrypt";

static criarUsers = async(req: Request, res: Response) => {
        const valores = req.body;
        try{
            valores.password = await bcrypt.hash(valores.password, 12)
            await User.create(valores);
    
            res.redirect('/')
            
        }catch(error: any){
            res.status(404).json({message: `${error.message} --> Ocorreu um erro ao tentar criar o usuário`})
        }       
    };
```

Neste caso usamos a o method async para envocar a criptografia a chave senha quando a mesma é criada.
await bcrypt.hash(valores.password, 12)

Esta cryptografia recebe 2 fotores, o primeiro é a senha que o usuário cria no sistema, e a segunda é a salt força
da cryptografia e o retorno que a mesma vai fornecer.

no caso da senha 123456

o retorno então será: "password": "$2b$12$W3fh5x9PUGsIFGPBRBac3.Dk2c4rju.eMwvE3mzqHAVEIZnqGfzM."

para verificar a senha ao tentar fazer login no sistema usamos outro method chamado compare que recebe
dois attributes sendo o primeiro a senha usada no login e o segundo a senha cryptografada do usuário no BD.

```javascript

try{
    const users = await User.findOne( {where: { email: valores.email} } )
    const password = users?.password;
    if(await bcrypt.compare(valores.password, password )){
        res.status(200).redirect('/')
        console.log({message: "login realizado com sucesso!!"})
    }else{
        res.status(400).json({message: `A Senha informada é inválida`})
    } 
}catch(error: any){
    res.status(400).json({message: `${error.message} - Ocorreu um error ao logar`})
}

```

----------------------------------------------------------------------------------

###Usando o JSONWEBTOKEN..

----------------------------------------------------------------------------------

npm install jsonwebtoken 
npm install --save-dev @types/jsonwebtoken

Para usar o JWT ou jsonwebtoken precisamos criar a cryptografada no momento do login
do usuário, a função JWT irá homologar o ID informado (ou qualquer outra ref ) e com uma
determinada cryptografia irá criar um token. Como terceiro parametro o token recebe um 
prazo de expiração.

´´´javascript

try{
    const users = await User.findOne( {where: { email: valores.email} } )
        const password = users?.password;
        if(await bcrypt.compare(valores.password, password )){
            const Token = await JWT.sign({id: users.id}, process.env.CRYPT as string, { expiresIn: "7d"})
            res.status(200)
            .redirect('/')
            console.log({message: "login realizado com sucesso!!", user: users, token: Token})
        }else{
            res.status(400).json({message: `A Senha informada é inválida`})
        }
}catch(error: any){
    res.status(400).json({message: `${error.message} - Ocorreu um error ao logar`})
}

´´´

No exemplo acima usamos a formula: await JWT.sign({id: users.id}, process.env.CRYPT as string, { expiresIn: "7d"})

JWT.sign( identificação, chave, prazo)

---------------------------------------------------------------------------------------------------

###NODEMAILER

1) configurar o transporter

    configurar o servidor SMTP -- servidor faker mailtrap.io;

```javascript
let transporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
        user: 'youremail@address.com', 
        pass: 'yourPass' 
        } 
    });
```

2) configurar a messagem

```javascript
const mailOptions = {
  from: 'sender@email.com', // sender address
  to: 'to@email.com', // receiver (use array of string for a list)
  subject: 'Subject of your email', // Subject line
  html: '<p>Your html here</p>'// plain text body
};
```
from : o remetente do email

to : o destinatário do email

subject : o assunto do email

html : seu texto do email (em formato HTML)



3) Enviar a messagem;

```javascript
let info = await transporter.sendMail(mailOptions);

              console.log("INFO: ", info)

```

------------------------------------------------------------------

##Usando o Passport

-------------------------------------------------------------------

|--------------------------|-------------------------------------|
|_NPM_ _INSTALL_           |  INSTALL TYPES                      |
|--------------------------|-------------------------------------|
|npm install Passport      |npm --save-dev @types/passport       |
|npm install passport-http |npm --save-dev @types/passport-http  |
|npm install passport-jwt  |npm --save-dev @types/passport-jwt   |
|--------------------------|-------------------------------------|

-----------------------------------------------------------------------------

Para usar o passaport primeiro importamos em nosso arquivo principal o passaport
E então na sequência adicionamos app.use e executamos o init do passport.

```javascript
import passport from 'passport';

server.use(passport.initialize())

```

Criando um arquivo em config para declarar o passaport entao importamos os types
que será o basicStrategic primeiro:

Depois executamos o código conforme abaixo para buscar o email e usuário e done para
autentificar ou rejeitar.

```javascript

import passport from "passport";
import { BasicStrategy } from "passport-http";
import User from '../models/User';
import { Request, Response, NextFunction} from 'express';

passport.use( new BasicStrategy(async ( email, password, done )=>{

    try{
        if(email && password){
            const user = await User.findOne({ where: { email: email, password: password}})

            if(user){
                return done(null, user)
            }
            else{
                return done({status:400, message: "usuário nao localizado"}, false)
            }
            
        }else{
            return done({status: 401, message: 'não autorizado'}, false)
        }
    }catch(error:any){
        return done({message: `${error.code} - Ocorreu Um error`})
    }   
    
    
}));

export default passport;
```

Depois criamos a função que será usada para o passaport no middleware em nosso
processo de autentificar.

```javascript

export const privateRouter = (req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate('basic', (err, user) => {
        return user ? next() : next({message: `${err.code}`})
    }) ( req, res, next );
}


```
------------------------------------------------------------------------------------------
###USANDO PASSPORT COM JWT
-----------------------------------------------------------------------------------------