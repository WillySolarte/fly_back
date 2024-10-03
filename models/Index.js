import User from "./User.js";
import Vuelo from "./Vuelo.js";
import Reserve from "./Reserve.js";

Vuelo.belongsTo(User, {foreignKey: 'userId'});
Reserve.belongsTo(User, {foreignKey: 'userId'});
Reserve.belongsTo(Vuelo, {foreignKey: 'flightId'});

export {
    User,
    Vuelo,
    Reserve
}