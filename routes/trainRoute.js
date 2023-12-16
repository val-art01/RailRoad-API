import express from 'express'
import {createTrain, getAllTrains, getTrainById, updateTrain, deleteTrain} from './../controllers/trianController.js';
import {verifyTokenAndAdmin} from '../middleware/verify.js'

const router = express.Router()

// Create a new train
router.post('/', verifyTokenAndAdmin, createTrain);
// Get all trains
router.get('/', getAllTrains);
// Get a specific train by ID
router.get('/:id', getTrainById);
// Update a train
router.put('/:id', verifyTokenAndAdmin, updateTrain);
// Delete a train by id
router.delete('/:id', verifyTokenAndAdmin, deleteTrain);


export default router
