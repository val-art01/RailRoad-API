import Train from '../models/Train.js';
// import Trainstation from '../model/TrainStation.js';

// Create a new train
export const createTrain = async (req, res) => {
    const { name, start_station, end_station, time_departure } = req.body;
    const train = new Train({ name, start_station, end_station, time_departure });

    // await Trainstation.findOneAndUpdate(
    //     { name: start_station },
    //     { $push: { trains: train.id } },
    //     { new: true }
    // );

    // await Trainstation.findOneAndUpdate(
    //     { name: end_station },
    //     { $push: { trains: train.id } },
    //     { new: true }
    // );

    train.save()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ response: 'Internal server error' });
        });
};

// Get all trains
export const getAllTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.status(200).json(trains);
    } catch (err) {
        console.error('Error getting trains', err);
        res.status(500).json({ response: 'Internal server error' });
    }
};

// Get a specific train by ID
export const getTrainById = async (req, res) => {
    const { id } = req.params;

    try {
        const train = await Train.findById(id);

        if (!train) {
            return res.status(404).json({ error: 'Train not found' });
        }

        res.status(200).json(train);
    } catch (err) {
        console.error('Error getting train', err);
        res.status(500).json({ response: 'Internal server error' });
    }
};

// Update a train
export const updateTrain = async (req, res) => {
    const { id } = req.params;
    const { name, start_station, end_station, time_departure } = req.body;

    try {
        const updatedTrain = await Train.findByIdAndUpdate(
            id,
            { name, start_station, end_station, time_departure },
            { new: true }
        );

        if (!updatedTrain) {
            return res.status(404).json({ error: 'Train not found' });
        }

        res.status(200).json(updatedTrain);
    } catch (err) {
        console.error('Error updating train', err);
        res.status(500).json({ response: 'Internal server error' });
    }
};

// Delete a train by id
export const deleteTrain = async (req, res) => {
    const { id } = req.params;

    try {
        const train = await Train.findById(id);
        
        if (!train) {
            return res.status(400).json({ error: 'There are still trains scheduled on this station. Please delete them before' });
        }

        const deletedTrain = await Train.findByIdAndDelete(id);

        if (!deletedTrain) {
            return res.status(404).json({ error: 'Train not found' });
        }

        res.status(200).json({ message: 'Train deleted successfully' });
    } catch (err) {
        console.error('Error deleting train', err);
        res.status(500).json({ response: 'Internal server error' });
    }
};
