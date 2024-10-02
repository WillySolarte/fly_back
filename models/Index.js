import User from "./User.js";
import Vuelo from "./Vuelo.js";

Vuelo.belongsTo(User, {foreignKey: 'userId'});

export {
    User,
    Vuelo
}