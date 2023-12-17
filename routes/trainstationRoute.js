import express from 'express'
import {createTrainStation, getAllTrainStations, getTrainStationById, updateTrainStation, deleteTrainStation, getAllTrainStationSortedByName} from './../controllers/trainstationController.js';
import {verifyTokenAndAdmin} from '../middleware/verify.js'

const router = express.Router()

router.post('/', verifyTokenAndAdmin, createTrainStation);
router.get('/', getAllTrainStations);
router.get('/sort', getAllTrainStationSortedByName);
router.get('/:id', getTrainStationById);
router.put('/:id', verifyTokenAndAdmin, updateTrainStation);
router.delete('/:id', verifyTokenAndAdmin, deleteTrainStation);

export default router
