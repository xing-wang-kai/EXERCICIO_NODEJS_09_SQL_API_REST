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