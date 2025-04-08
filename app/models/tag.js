import { Model, DataTypes } from "sequelize";
import { client } from "./client.js";

export class Tag extends Model {}

Tag.init({
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
    },
    color: {
        type: DataTypes.STRING(7),
        allowNull: false,
        defaultValue: '#000000',
    },
}, {
    sequelize: client,
    tableName: 'tag',
})