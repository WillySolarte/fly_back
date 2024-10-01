import { Sequelize } from "sequelize";
import Vuelo from "../models/Vuelo.js";

export const createFlight = async (req, res) => {

    try {

        const newFlight = await Vuelo.create(req.body)
        res.send('Vuelo creado correctamente')
        
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
