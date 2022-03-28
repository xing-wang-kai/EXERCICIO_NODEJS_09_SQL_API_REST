
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
        type: DataTypes.INTEGER

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
    createdAt: 'CriadoEm',
    updatedAt: 'AtualizadoEm',
    version: 'versao'
}

const definir =  sequelize.define<userInstance>("users", user, options);

export default definir;