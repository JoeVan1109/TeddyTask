import { Model, DataTypes } from "sequelize";
import { client } from "./client.js";

export class Card extends Model {}

Card.init({
    title:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: client,
    tableName: 'card',
});