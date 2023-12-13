import express from 'express'
import Trainstation from '../model/TrainStation.js'

const router = express.Router()

// Create a new trainstation
router.post('/', (req, res) => {
    const { name, open_hour, close_hour, img, trains } = req.body
    const trainstation = new trainstation({ name, open_hour, close_hour, img, trains })

    trainstation.save()
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err)
            res.status(500).json({ response: 'Internal server error' })
        })
})

// Get all trainstations
router.get('/', async (req, res) => {
    try {
        const trainstations = await Trainstation.find()
        res.status(200).json(trainstations)
    } catch(err) {
        console.error('Error getting trainstations', err)
        res.status(500).json({ response: 'Internal server error' })
    }
})

// Get a specific trainstation by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const trainstation = await Trainstation.findById(id)

        if (!trainstation) {
            return res.status(404).json({ error: 'trainstation not found' })
        }

        res.status(200).json(trainstation)
    } catch(err) {
        console.error('Error getting trainstation', err)
        res.status(500).json({ response: 'Internal server error' })
    }
})

// Update a trainstation
router.put('/:id', async (req, res) => {
    const { id }  = req.params
    const {name, open_hour, close_hour, img, trains } = req.body

    try {
        const updatedtrainstation = await Trainstation.findByIdAndUpdate(
            id,
            {name, open_hour, close_hour, img, trains },
            { new: true }
        )

        if (!updatedtrainstation) {
            return res.status(404).json({ error: 'trainstation not found' })
        }

        res.status(200).json(updatedtrainstation)
    } catch(err) {
        console.error('Error updating trainstation', err)
        res.status(500).json({ response: 'Internal server error' })
    }
})


// Delete a trainstation by id
router.delete('/:id', async (req, res) => {
    const { id }  = req.params

    try {
        const trainstation = await Trainstation.findById(id)
        if (trainstation.trains != []) {
            return res.status(400).json({error : 'there are still trains schedulled on this station. Plaese delette them before'})
        }
        const deletedtrainstation = await Trainstation.findByIdAndDelete(id)

        if (!deletedtrainstation) {
            return res.status(404).json({ error: 'trainstation not found' })
        }

        res.status(200).json({ message: 'trainstation deleted successfully'})
    } catch(err) {
        console.error('Error deleting trainstation', err)
        res.status(500).json({ response: 'Internal server error' })
    }
})

export default router
