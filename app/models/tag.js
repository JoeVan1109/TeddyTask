import { Model, Datatypes } from "sequelize";
import { client } from "./client.js";

export class Tag extends Model {}

Tag.init({
    name: {
        type: Datatypes.STRING(64),
        allowNull: false,
        unique: true,
    },
    color: {
        type: Datatypes.STRING(7),
        allowNull: false,
        defaultValue: '#000000',
    },
}, {
    sequelize: client,
    tableName: 'tag',
})