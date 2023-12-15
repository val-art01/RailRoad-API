import mongoose from "mongoose"

const TrainStationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        open_hour: { type: String, required: true, unique: true },
        close_hour: { type: String, required: true },
        img: { type: String, required: true },
        trains: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Train' }]
    },
    { timestamps: true }
)

export default mongoose.model('User', TrainStationSchema)