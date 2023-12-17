// Modèle de billet (Ticket)
import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        trainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
        isBooked: { type: Boolean, default: false },
        reservationDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);
export default mongoose.model('Ticket', TicketSchema);
