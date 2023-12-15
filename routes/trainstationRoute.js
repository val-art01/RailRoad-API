import express from 'express'
import * as trainStation from './../controllers/trainstationController.js';
import verifyTokenAndAdmin from '../middleware/verify.js';

const router = express.Router()

router.post('/', verifyTokenAndAdmin, trainStation.createTrainStation);

router.get('/', trainStation.getAllTrainStations);

router.get('/:id', trainStation.getTrainStationById);

router.put('/:id', verifyTokenAndAdmin, trainStation.updateTrainStation);

router.delete('/:id', verifyTokenAndAdmin, trainStation.deleteTrainStation);


export default router
