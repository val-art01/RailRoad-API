import mongoose from "mongoose"

const TrainStationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        open_hour: { type: String, required: true },
        close_hour: { type: String, required: true },
        img: { type: String, required: true },
        // img: { data: Buffer, contentType: String },
        trains: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Train' }]
    },
    { timestamps: true }
)

export default mongoose.model('TrainStation', TrainStationSchema)