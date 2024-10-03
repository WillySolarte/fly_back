import { Sequelize } from "sequelize";
import {Reserve, Vuelo} from "../models/Index.js";

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
        
        const {id} = req.usuario
        if(id){
            const flights = await Vuelo.findAll({
                where: {
                    userId: id
                }
            }) 
            res.json(flights)
        }
        
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
        if(flight.userId !== req.usuario.id){
            const error = new Error("Acción no válida")
            return res.status(404).json({error: error.message})
        }
        res.status(200).json(flight)
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}
export const updateFlight = async (req, res) => {

    try {
        const {id} = req.params
        const flight = await Vuelo.findByPk(id)
        if(!flight){
            const error = new Error("Vuelo no encontrado")
            return res.status(404).json({error: error.message})
            
        }
        if(flight.userId !== req.usuario.id){
            const error = new Error("Acción no válida")
            return res.status(404).json({error: error.message})
        }
        flight.name = req.body.name
        flight.origin = req.body.origin
        flight.destination = req.body.destination
        flight.price = req.body.price
        flight.airline = req.body.airline
        flight.leave = req.body.leave
        flight.arrive = req.body.arrive
        flight.userId = req.usuario.id
        await flight.save()

        res.send("Vuelo actualizado correctamente")
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}

export const deleteFlightById = async (req, res) => {

    try {
        const {id} = req.params
        const flight = await Vuelo.findByPk(id)
        if(!flight){
            const error = new Error("Vuelo no encontrado")
            return res.status(404).json({error: error.message})
            
        }
        if(flight.userId !== req.usuario.id){
            const error = new Error("Acción no válida")
            return res.status(404).json({error: error.message})
        }
        await Vuelo.destroy({
            where: {
                id: id
            }

        })
        res.send("Vuelo eliminado correctamente")
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}



export const saveReserve = async (req, res) => {

    try {
        const {id} = req.params
        const flight = await Vuelo.findByPk(id)
        if(!flight){
            const error = new Error("Vuelo no encontrado")
            return res.status(404).json({error: error.message})
            
        }
        


        await Reserve.create({
            userId: req.usuario.id,
            flightId: id
        })
        
        res.send("Vuelo reservado correctamente")
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}

export const getAirlinesWithMostReservations = async (req, res) => {
    try {
      const airlinesData = await Reserve.findAll({
        include: [
          {
            model: Vuelo,
            attributes: ['airline'],
          }
        ],
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.col('Vuelo.id')), 'reservationsCount'],
        ],
        group: ['Vuelo.airline'],
        order: [[Sequelize.literal('reservationsCount'), 'DESC']],
      });
  
      res.json(airlinesData);
  
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
};
