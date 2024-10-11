import express from 'express'

import { createAerline, createDeleteReserve, createFlight, deleteFlightById, getAerlines, getAllFlights, getExistReserve, getFlightById, getMyFlights, getMyReserves, showFlightById, updateFlight } from '../controllers/flightController.js';
import { verifyToken } from '../middleware/authRevition.js';

const router = express.Router();

router.post('/create-flight', verifyToken, createFlight);
router.get('/all-flights', getAllFlights);
router.get('/flight/:id', verifyToken,  getFlightById);
router.get('/show-flight/:id',  showFlightById);
router.get('/my-flights', verifyToken,  getMyFlights);
router.put('/update/:id', verifyToken,  updateFlight);
router.delete('/delete/:id', verifyToken,  deleteFlightById);

router.get('/exist-reserve/:id', verifyToken,  getExistReserve);
router.post('/create-delete/reserve/:id', verifyToken,  createDeleteReserve);
router.get('/my-reserves', verifyToken,  getMyReserves);

/**Aerolínea */
router.post('/create-aerline', verifyToken, createAerline);
router.get('/get-aerlines', getAerlines);




export default router;

