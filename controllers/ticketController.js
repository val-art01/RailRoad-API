import Ticket from "../models/Ticket.js";

// Create a ticket (reservation)
export const bookTicket = async (req, res) => {
    const{userId, trainId} = req.body
    try {
        //Checks whether the ticket already exists for this user and this train
        const existingTicket = await Ticket.findOne({user: userId, train: trainId})
        if (existingTicket) {
            return res.status(400).json({ error: 'Ticket already booked for this user and train' });
        }

        // create ticket
        const ticket = new Ticket({ userId: userId, trainId: trainId });
        const bookedTicket = await ticket.save();
        res.status(200).json(bookedTicket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: 'Internal server error' });
    }

};

// Validate a ticket
export const validateTicket = async (req, res) =>{
    const {ticketId} = req.params;
    console.log(`ticketId ${ticketId}`)
    try {
        const ticket = Ticket.findById(ticketId);
        if(!ticket){
            return res.status(404).json({error: 'Ticket not found'})
        }

        if(ticket.isBooked){
            return res.status(400).json({error: 'Ticket is already validated'})
        }

        // valid ticket
        ticket.isBooked = true
        const validatedTicket = await ticket.save();

        res.status(200).json(validatedTicket);
    } catch (error) {
        console.error('Error during ticket validation :', error);
        res.status(500).json({ response: 'Internal server error' });
    }

}
