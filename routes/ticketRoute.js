// routes/ticket.js
import express from 'express';
import { bookTicket, validateTicket } from './../controllers/ticketController.js';
import { verifyTokenAndAuthorization } from '../middleware/verify.js';

const router = express.Router();

router.post('/', verifyTokenAndAuthorization, bookTicket);
router.put('/:ticketId/validate', verifyTokenAndAuthorization, validateTicket);

export default router;