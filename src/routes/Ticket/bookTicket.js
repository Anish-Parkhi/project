import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../../../db.js';
import userMiddleWare from '../../middlewares/usermiddleware.js';
const jwtKey = '1234';
const bookTicketRouter = express();

bookTicketRouter.post('/bookticket', userMiddleWare, async (req, res) => {
  const token = req.headers.authorization;
  const info = jwt.decode(token, jwtKey);
  const { eventId, ticketType } = req.body;
  if (!eventId || !ticketType) {
    return res.json({ msg: 'Missing parameters' });
  }
  try {
    db.query(
      'SELECT user_id from user where email=?',
      [info.email],
      (err, results) => {
        if (err) {
          return res.status(500).json({ msg: 'Error purchasing ticket' });
        } else {
          const user_id = results[0].user_id;
          console.log(user_id);
          db.query(
            `insert into ticket(user_id, event_id, type)
            values(?, ?, ?)`,
            [user_id, eventId, ticketType],
            (err, result) => {
              if (err) {
                return res.status(500).json({ msg: 'Error purchasing ticket' });
              } else {
                db.query(
                  `insert into registrations(user_id, event_id, ticket_id)
                      values(?, ?, ?)
                  `,
                  [user_id, eventId, result.insertId],
                  (err, result) => {
                    if (err) {
                      return res
                        .status(500)
                        .json({ msg: 'Registraion failed' });
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
