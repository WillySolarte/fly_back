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
            const error = new Error("El usuario ya está registrado")
            return res.status(404).json({error: error.message})
        }
        let pass = await hashPassword(password)

        const newUser = await User.create({
            name,
            email,
            password: pass
        })

        res.send("Usuario registrado de forma correcta")
        
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
            const outError = new Error("Usuario no encontrado")
            return res.status(404).json({error: outError.message})
            
        }
        const isPassCorrect = await checkPassword(password, user.password)

        if(!isPassCorrect){
            const outError = new Error("Password incorrecto")
            return res.status(404).json({error: outError.message})
            
        }
        const token = generateJWT(user.id)
        res.send(token)

        
    } catch (error) {
        const outError = new Error("Error en la comunicación con la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}

export const getUser = async (req, res) => {
    res.send(req.usuario)
}