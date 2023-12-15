import mongoose from "mongoose"

const TrainSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        start_station: { type: String, required: true, unique: true },
        end_station: { type: String, required: true },
        time_departure: { type: String, required: true },
    },
    { timestamps: true }
)

export default mongoose.model('User', TrainSchema)