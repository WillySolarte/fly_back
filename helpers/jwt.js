import jwt from 'jsonwebtoken'

export const generateJWT = (id) => jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '1d'
})