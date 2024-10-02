import { checkPassword, hashPassword } from "../helpers/auth.js";
import { generateJWT } from "../helpers/jwt.js";
import {User} from "../models/Index.js";

export const createUser = async (req, res) => {

    try {

        const {name, email, password} = req.body;

        const userExist = await User.findOne({
            where: {
                email: email
            }
        })
        if(userExist){
            const error = 'El usuario ya está registrado'
            return res.json({error: error, data: null, success: ""})
        }
        let pass = await hashPassword(password)

        const newUser = await User.create({
            name,
            email,
            password: pass
        })

        res.json({error: null, data: {msg: "Usuario registrado de forma correcta", data: null}, success: true})
        
    } catch (error) {
        const outError = new Error("Error en la comunicación con la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}

export const login = async (req, res) => {

    try {

        const {email, password} = req.body

        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(!user){
            const outError = "Usuario no encontrado"
            return res.json({error: outError, data: null, success: ""})
            
        }
        const isPassCorrect = await checkPassword(password, user.password)

        if(!isPassCorrect){
            const outError = "Password incorrecto"
            return res.json({error: outError, data: null, success: ""})
            
        }
        const token = generateJWT(user.id)

        res.json({error: null, data: {msg: "Usuario logeado", data: token}, success: true})

        
    } catch (error) {
        const outError = new Error("Error en la comunicación con la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}