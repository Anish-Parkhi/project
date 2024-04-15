import express from 'express';
import userMiddleWare from '../../middlewares/usermiddleware.js';
import db from '../../../db.js';

const cancelTicketRotuer = express();

cancelTicketRotuer.delete('/cancelticket', userMiddleWare,(req, res) => {
  try {
    const { userId, ticketId } = req.body;
    if (!userId || !ticketId) {
      return res.json({ msg: 'paramters missing' });
    }
    db.query(
      `delete from ticket where user_id = ? and ticket_id = ?`,
      [userId, ticketId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ msg: 'Not able to cancel the ticket' });
        } else {
          db.query(
            `delete from registrations where user_id = ? and ticket_id = ?`,
            [userId, ticketId],
            (err, result) => {
              if (err) {
                return res.status(500).json({ msg: 'Not able to unregister' });
              } else {
                return res.json({ msg: 'Ticket cancelled successfully' });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

export default cancelTicketRotuer;
