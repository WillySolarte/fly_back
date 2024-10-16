import {Aerline, Reserve, User, Vuelo} from "../models/Index.js";
import { Sequelize } from "sequelize";

export const createFlight = async (req, res) => {

    try {
        const {code, origin, destination, price, leave, arrive, aerlineId} = req.body
        
        const newFlight =  Vuelo.create({
            code,
            origin,
            destination,
            price,
            leave,
            arrive,
            aerlineId,
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

        const flights = await Vuelo.findAll({
            include: {
                model: Aerline,    
                attributes: ['name'],
            },
        })
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
                },
                include: {
                    model: Aerline,    
                    attributes: ['name'],
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
        const flight = await Vuelo.findByPk(id, {
            include: {
                model: Aerline,    
                attributes: ['name'],
            }
        })
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
export const showFlightById = async (req, res) => {

    try {
        const {id} = req.params
        
        const flight = await Vuelo.findByPk(id, {
            include: {
                model: Aerline,    
                attributes: ['name'],
            }
        })
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



export const createAerline = async (req, res) => {

    try {
        const {name} = req.body
        
        const newFlight = await  Aerline.create({
            name
        })
        
        res.send("Aerolínea registrada correctamente")
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}

export const getAerlines = async (req, res) => {

    try {

        const aerlines = await Aerline.findAll()
        res.json(aerlines)
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}

/**Reserves */

export const getExistReserve = async (req, res) => {

    
    try {
        const userId = req.usuario.id;
        const {id} = req.params
        
        const reserve = await Reserve.findOne({
            where: {
                userId,
                flightId: id
            },
            
        })
        if(reserve){
            res.json({msg: "Cancelar Reserva"})
        }
        else{
            res.json({msg: "Reservar"})
        } 
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
}

export const createDeleteReserve = async (req, res) => {

    
    try {
        const userId = req.usuario.id;
        const {id} = req.params
        
        const reserve = await Reserve.findOne({
            where: {
                userId,
                flightId: id
            },
            
        })
        if(reserve){
            await Reserve.destroy({
                where: {
                    userId,
                    flightId: id
                },
            })
            res.send('Reserva Cancelada')
        }
        else{
            await Reserve.create({
                userId,
                flightId: id
            })
            res.send('Reserva Creada')
        } 
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
}

export const getMyReserves = async (req, res) => {

    try {
        const userId = req.usuario.id;
        const reserves = await Reserve.findAll({
            where: {
                userId
            },
            include: {
                model: Vuelo,    
                attributes: ['code', 'origin', 'destination', 'aerlineId'],
                include: {
                    model: Aerline, 
                    attributes: ['name'], 
                }
            },
            
        })
        res.json(reserves)
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
    

}

/**Estadísticas */

export const getImportantData = async (req, res) => {

    try {

        const [flights, users, aerlines] = await Promise.allSettled([Vuelo.count(), User.count(), Aerline.count()])

        const reserves = await Reserve.findAll({
            attributes: ['flightId', [Sequelize.fn('COUNT', Sequelize.col('flightId')), 'reservationsCount']],
            include: {
                model: Vuelo,    
                attributes: ['code', 'origin', 'destination'],
            },
            group: ['flightId']
        });
       

        const data = {
            flights,
            users,
            aerlines,
            reserves
        }
        res.json(data)
        
    } catch (error) {
        const outError = new Error("Error al consultar la BD")
        return res.status(404).json({error: outError.message, msg: error})
    }
}



