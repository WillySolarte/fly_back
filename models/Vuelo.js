import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Vuelo = db.define('vuelo', {
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
    
    airline: {
        type: DataTypes.STRING,
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