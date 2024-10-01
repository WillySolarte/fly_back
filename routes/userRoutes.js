import express from 'express'
import { body } from 'express-validator';


import { validateInputs } from '../middleware/validation.js';

import { createUser, login } from '../controllers/userController.js';


const router = express.Router();

router.post('/register',

body('name').notEmpty().withMessage('Debe ingresar un nombre'),

body('password').notEmpty().withMessage('Debe ingresar un password').isLength({min:5}).withMessage('Debe tener mínimo 5 caracteres'),
body('password_confirmation').custom((value, {req}) => {
    if(value !== req.body.password){
        throw new Error('Los password deben ser iguales')
    }
    return true
}),
body('email').isEmail().withMessage('Debe tener un email válido')
    
, validateInputs, createUser);

router.post('/login', body('email').isEmail().withMessage('Debe tener un email válido'),
body('password').notEmpty().withMessage('Debe ingresar un password'),
validateInputs, login)


export default router;
