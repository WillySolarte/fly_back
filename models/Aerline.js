import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Aerline = db.define('aerline', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    
});

export default Aerline;