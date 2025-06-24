import { Model, DataTypes } from "sequelize";
import { client } from "./client.js";

export class Card extends Model {}

Card.init({
    title:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize: client,
    tableName: 'card',
});