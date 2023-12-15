import TrainStation from './../model/TrainStation.js';

// Create a new trainstation
export const createTrainStation = async (req, res) => {
    const { name, open_hour, close_hour, img, trains } = req.body;
    const trainStation = new TrainStation({ name, open_hour, close_hour, img, trains });

    try {
        const savedTrainStation = await trainStation.save();
        res.status(200).json(savedTrainStation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: 'Internal server error' });
    }
};

// Get all trainstations
export const getAllTrainStations = async (req, res) => {
    try {
        const trainStations = await TrainStation.find();
        res.status(200).json(trainStations);
    } catch (err) {
        console.error('Error getting train stations', err);
        res.status(500).json({ response: 'Internal server error' });
    }
};

// Get a specific trainstation by ID
export const getTrainStationById = async (req, res) => {
    const { id } = req.params;

    try {
        const trainStation = await TrainStation.findById(id);

        if (!trainStation) {
            return res.status(404).json({ error: 'Train station not found' });
        }

        res.status(200).json(trainStation);
    } catch (err) {
        console.error('Error getting train station', err);
        res.status(500).json({ response: 'Internal server error' });
    }
};

// Update a trainstation
export const updateTrainStation = async (req, res) => {
    const { id } = req.params;
    const { name, open_hour, close_hour, img, trains } = req.body;

    try {
        const updatedTrainStation = await TrainStation.findByIdAndUpdate(
            id,
            { name, open_hour, close_hour, img, trains },
            { new: true }
        );

        if (!updatedTrainStation) {
            return res.status(404).json({ error: 'Train station not found' });
        }

        res.status(200).json(updatedTrainStation);
    } catch (err) {
        console.error('Error updating train station', err);
        res.status(500).json({ response: 'Internal server error' });
    }
};

// Delete a trainstation by id
export const deleteTrainStation = async (req, res) => {
    const { id } = req.params;

    try {
        const trainStation = await TrainStation.findById(id);

        if (trainStation.trains.length !== 0) {
            return res.status(400).json({ error: 'There are still trains scheduled on this station. Please delete them before' });
        }

        const deletedTrainStation = await TrainStation.findByIdAndDelete(id);

        if (!deletedTrainStation) {
            return res.status(404).json({ error: 'Train station not found' });
        }

        res.status(200).json({ message: 'Train station deleted successfully' });
    } catch (err) {
        console.error('Error deleting train station', err);
        res.status(500).json({ response: 'Internal server error' });
    }
};
