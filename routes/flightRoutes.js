import express from 'express'

import { createFlight, getAllFlights, getFlightById, getMyFlights } from '../controllers/flightController.js';
import { verifyToken } from '../middleware/authRevition.js';

const router = express.Router();

router.post('/create-flight', verifyToken, createFlight);
router.get('/all-flights', getAllFlights);
router.get('/flight/:id',  getFlightById);
router.get('/my-flights/:userId',  getMyFlights);

export default router;

