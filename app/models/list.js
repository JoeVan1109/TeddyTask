import { Model, Datatypes } from "sequelize";
import { client } from "./client.js";

export class List extends Model {}

List.init({
    title:{
        type: Datatypes.TEXT,
        allowNull: false,
        unique: true,
    },
    position:{
        type: Datatypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }
}, {
    sequelize: client,
    tableName: 'list',
})