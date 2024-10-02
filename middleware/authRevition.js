import { User } from '../models/Index.js'
import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    const bearer = req.headers.authorization
    if(!bearer){
        const error = new Error('No autorizado')
        return res.status(401).json({error: error.message})
    }
    const [ ,token] = bearer.split(' ')
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByPk(decode.id)
        if(user){
            req.usuario = {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
        
    } catch (error) {
        console.log("ERROR")
    }
  
    
    next()
    
};

