import { DataTypes } from "sequelize";
import db from "../config/db.js";

const User = db.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false


    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    
    

});

export default User;