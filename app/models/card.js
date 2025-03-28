import { Model, Datatypes } from "sequelize";
import { client } from "./client.js";

export class Card extends Model {}

Card.init({
    title:{
        type: Datatypes.TEXT,
        allowNull: false,
    },
    description:{
        type: Datatypes.TEXT,
        allowNull: false,
    },
    date:{
        type: Datatypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: client,
    tableName: 'card',
});