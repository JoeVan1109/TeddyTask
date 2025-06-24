import { Model, DataTypes } from "sequelize";
import { client } from "./client.js";

export class List extends Model {}

List.init({
    title:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    position:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: client,
    tableName: 'list',
})