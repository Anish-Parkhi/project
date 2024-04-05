import express from 'express';
import db from '../../../db.js';

const bookTicketRouter = express();

bookTicketRouter.post('/bookticket', async (req, res) => {
  const { userId, eventId, ticketType } = req.body;
  if (!userId || !eventId || !ticketType) {
    return res.json({ msg: 'Missing parameters' });
  }
  try {
    db.query(
      `insert into ticket(user_id, event_id, type)
        values(?, ?, ?)`,
      [userId, eventId, ticketType],
      (err, result) => {
        if (err) {
          return res.status(500).json({ msg: 'Error purchasing ticket' });
        } else {
          db.query(
            `insert into registrations(user_id, event_id, ticket_id)
                  values(?, ?, ?)
              `,
            [userId, eventId, result.insertId],
            (err, result) => {
              if (err) {
                return res.status(500).json({ msg: 'Registraion failed' });
              } else {
                res.json({
                  msg: 'Ticket booked successfully',
                  ticketId: result.ticketId,
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    db.rollback();
    res.status(500).json({ msg: 'Unable to book ticket' });
  }
});

export default bookTicketRouter;
