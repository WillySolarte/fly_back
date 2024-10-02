import { Sequelize } from "sequelize";
import {Vuelo} from "../models/Index.js";

export const createFlight = async (req, res) => {

    try {
        const {name, origin, destination, price, airline, leave, arrive} = req.body
        
        const newFlight =  Vuelo.create({
            name,
            origin,
            destination,
            price,
            airline,
            leave,
            arrive,
            userId: req.usuario.id
        })
        
        res.send("Vuelo registrado correctamente")
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}

export const getAllFlights = async (req, res) => {

    try {

        const flights = await Vuelo.findAll()
        res.json(flights)
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}

export const getMyFlights = async (req, res) => {

    try {
        const {userId} = req.params

        const flights = await Vuelo.findAll()
        res.json(flights)
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}



export const getFlightById = async (req, res) => {

    try {
        const {id} = req.params
        const flight = await Vuelo.findByPk(id)
        if(!flight){
            const error = new Error("Vuelo no encontrado")
            return res.status(404).json({error: error.message})
            
        }
        res.status(200).json(flight)
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}
