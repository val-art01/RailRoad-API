import mongoose from "mongoose"

const TrainSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        start_station: { type: String, required: true, unique: true },
        end_station: { type: String, required: true },
        // start_station: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainStation', required: true },
        // end_station: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainStation', required: true },        
        time_departure: { type: String, required: true },
    },
    { timestamps: true }
)

export default mongoose.model('Train', TrainSchema)