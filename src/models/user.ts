import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

interface UserInstance extends Model{
    id: number;
    data: Date;
    nomeArquivo: string;
    produto: string;
    conteudoArquivo: Text; //ajeitar os tipos//
    titulo: Text;
}

export const User = sequelize.define<UserInstance>("User", {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    data: {
        type: DataTypes.DATE
    },
    nomeArquivo: {
        type: DataTypes.STRING
    },
    produto: {
        type: DataTypes.STRING
    },
    conteudoArquivo: {
        type: DataTypes.TEXT
    },
    titulo: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'dadosfernando',
    timestamps: false
});