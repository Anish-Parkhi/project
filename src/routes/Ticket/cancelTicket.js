import express from 'express';
import userMiddleware from '../../middlewares/usermiddleware.js';
import db from '../../../db.js';

const cancelTicketRouter = express();

cancelTicketRouter.delete('/cancelticket', userMiddleware, (req, res) => {
  const email = req.email;
  const { ticketId } = req.body;

  db.query('SELECT user_id FROM user WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error getting user" });
    } else {
      const user_id = results[0].user_id;

      db.query(
        `DELETE FROM registrations WHERE user_id = ? AND ticket_id = ?`,
        [user_id, ticketId],
        (err, result) => {
          if (err) {
            return res.status(500).json({ msg: 'Error canceling ticket' });
          } else {
            db.query(
              `DELETE FROM ticket WHERE user_id = ? AND ticket_id = ?`,
              [user_id, ticketId],
              (err, result) => {
                if (err) {
                  return res.status(500).json({ msg: 'Error canceling ticket' });
                } else {
                  return res.json({ msg: 'Ticket canceled successfully' });
                }
              }
            );
          }
        }
      );
    }
  });
});

export default cancelTicketRouter;
