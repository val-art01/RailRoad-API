import express from 'express'
import Train from '../model/Train.js'
import Trainstation from '../model/TrainStation.js'
import verifyTokenAndAdmin from '../middleware/verify.js'

const router = express.Router()

// Create a new train
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const { name, start_station , end_station, time_departure } = req.body
    const train = new Train({ name, start_station , end_station,time_departure })


    await Trainstation.findOneAndUpdate(
        { name: start_station },
        { $push: { trains: train.id } },
        { new: true }
    );

    await Trainstation.findOneAndUpdate(
        { name: end_station },
        { $push: { trains: train.id } },
        { new: true }
    );


    train.save()
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err)
            res.status(500).json({ response: 'Internal server error' })
        })
})

// Get all trains
router.get('/', async (req, res) => {
    try {
        const trains = await Train.find()
        res.status(200).json(trains)
    } catch(err) {
        console.error('Error getting trains', err)
        res.status(500).json({ response: 'Internal server error' })
    }
})

// Get a specific train by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const train = await Train.findById(id)

        if (!train) {
            return res.status(404).json({ error: 'train not found' })
        }

        res.status(200).json(train)
    } catch(err) {
        console.error('Error getting train', err)
        res.status(500).json({ response: 'Internal server error' })
    }
})

// Update a train
router.put('/:id',verifyTokenAndAdmin, async (req, res) => {
    const { id }  = req.params
    const {name, start_station , end_station,time_departure } = req.body

    try {
        const updatedtrain = await Train.findByIdAndUpdate(
            id,
            {name, start_station , end_station,time_departure
     },
            { new: true }
        )

        if (!updatedtrain) {
            return res.status(404).json({ error: 'train not found' })
        }

        res.status(200).json(updatedtrain)
    } catch(err) {
        console.error('Error updating train', err)
        res.status(500).json({ response: 'Internal server error' })
    }
})


// Delete a train by id
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    const { id }  = req.params

    try {
        const train = await Train.findById(id)
        if (train.trains != []) {
            return res.status(400).json({error : 'there are still trains schedulled on this station. Plaese delette them before'})
        }
        const deletedtrain = await Train.findByIdAndDelete(id)

        if (!deletedtrain) {
            return res.status(404).json({ error: 'train not found' })
        }

        res.status(200).json({ message: 'train deleted successfully'})
    } catch(err) {
        console.error('Error deleting train', err)
        res.status(500).json({ response: 'Internal server error' })
    }
})

export default router
