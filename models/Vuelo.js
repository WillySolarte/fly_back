import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Vuelo = db.define('vuelo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    origin: {
        type: DataTypes.TEXT,
        allowNull: false

    },
    destination: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    
    leave: {
        type: DataTypes.DATE,
        allowNull: false

    },
    arrive: {
        type: DataTypes.DATE,
        allowNull: false

    },
    

});

export default Vuelo;