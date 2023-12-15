import express from 'express'
import * as trainController from './../controllers/trianController.js';
import verifyTokenAndAdmin from '../middleware/verify.js'

const router = express.Router()

// Create a new train
router.post('/', verifyTokenAndAdmin, trainController.createTrain);

// Get all trains
router.get('/', trainController.getAllTrains);

// Get a specific train by ID
router.get('/:id', trainController.getTrainById);

// Update a train
router.put('/:id', verifyTokenAndAdmin, trainController.updateTrain);

// Delete a train by id
router.delete('/:id', verifyTokenAndAdmin, trainController.deleteTrain);


export default router
