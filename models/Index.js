import User from "./User.js";
import Vuelo from "./Vuelo.js";
import Reserve from "./Reserve.js";
import Aerline from "./Aerline.js";

Vuelo.belongsTo(User, {foreignKey: 'userId'});
Vuelo.belongsTo(Aerline, {foreignKey: 'aerlineId'})
Reserve.belongsTo(User, {foreignKey: 'userId'});
Reserve.belongsTo(Vuelo, {foreignKey: 'flightId'});



export {
    User,
    Vuelo,
    Reserve,
    Aerline
}