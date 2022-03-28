
import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

interface userInstance extends Model {
    id: number;
    name: string;
    age: number;
}

const user = {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,

    },
    name: {
        type:  DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.STRING,
        allowNull: false
    }

}
const options = {
    freezeTableName: true,
    tableName: 'users',
    timeStamps: true,
    createdAt: 'Criado_Em',
    updatedAt: 'Atualizado_Em'
}

const definir =  sequelize.define<userInstance>("users", user, options);

definir.sync( { alter: true } ).then( ()=> console.log('alterado com sucesso')).catch((error: any) => console.log(`ERRO FOI: ${error.message}`))

export default definir;