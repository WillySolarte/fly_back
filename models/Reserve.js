import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Reserve = db.define('reserve', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    
});

export default Reserve;