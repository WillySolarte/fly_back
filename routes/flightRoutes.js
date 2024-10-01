import express from 'express'

import { createFlight, getAllFlights, getFlightById } from '../controllers/flightController.js';


const router = express.Router();

router.post('/', createFlight);
router.get('/', getAllFlights);
router.get('/flight/:id',  getFlightById);

export default router;

