import express from 'express'

import { createFlight, deleteFlightById, getAirlinesWithMostReservations, getAllFlights, getFlightById, getMyFlights, saveReserve, updateFlight } from '../controllers/flightController.js';
import { verifyToken } from '../middleware/authRevition.js';

const router = express.Router();

router.post('/create-flight', verifyToken, createFlight);
router.get('/all-flights', getAllFlights);
router.get('/flight/:id', verifyToken,  getFlightById);
router.get('/my-flights', verifyToken,  getMyFlights);
router.put('/update/:id', verifyToken,  updateFlight);
router.post('/reserve/:id', verifyToken, verifyToken,  saveReserve);
router.delete('/delete/:id', verifyToken,  deleteFlightById);

router.get('/data/aerlines', getAirlinesWithMostReservations);


export default router;

